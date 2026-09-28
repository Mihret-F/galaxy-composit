import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import { createServer as createViteServer } from 'vite';
import type { GalleryItem, Product } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Server-side Environment & Secrets
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || (process.env.VERCEL ? '' : bcrypt.hashSync('galaxy2026', 10));
const SESSION_SECRET = process.env.SESSION_SECRET || (process.env.VERCEL ? '' : 'galaxy_composite_secret_key_2026');

// Local persistent inquiry store
type Inquiry = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  product: string;
  message: string;
  status: 'NEW' | 'READ' | 'REPLIED';
  createdAt: string;
  replies?: Array<{ message: string; date: string }>;
};

const inquiriesFile = path.join(process.cwd(), 'data', 'inquiries.json');

function loadInquiries(): Inquiry[] {
  try {
    if (fs.existsSync(inquiriesFile)) {
      const stored = JSON.parse(fs.readFileSync(inquiriesFile, 'utf8'));
      return Array.isArray(stored) ? stored : [];
    }
  } catch (err) {
    console.error('Failed to load saved inquiries:', err);
  }
  return [];
}

function saveInquiriesToFile(inquiries: Inquiry[]) {
  try {
    fs.mkdirSync(path.dirname(inquiriesFile), { recursive: true });
    fs.writeFileSync(inquiriesFile, JSON.stringify(inquiries, null, 2));
  } catch (err) {
    console.error('Failed to save inquiries:', err);
  }
}

let inquiriesStore: Inquiry[] = loadInquiries();

const productsFile = path.join(process.cwd(), 'data', 'products.json');
const galleryFile = path.join(process.cwd(), 'data', 'gallery.json');

function loadJsonFile<T>(file: string, fallback: T): T {
  try {
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
  } catch (err) {
    console.error(`Failed to load ${file}:`, err);
  }
  return fallback;
}

function saveJsonFile<T>(file: string, value: T) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2));
}

let productsStore: Product[] = loadJsonFile(productsFile, []);
let galleryStore: GalleryItem[] = loadJsonFile(galleryFile, []);

const mysqlPool = process.env.MYSQL_HOST
  ? mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10
    })
  : null;

async function persistInquiries() {
  if (!mysqlPool) {
    saveInquiriesToFile(inquiriesStore);
    return;
  }

  await mysqlPool.query('DELETE FROM inquiries');
  for (const inquiry of inquiriesStore) {
    await mysqlPool.query(
      `INSERT INTO inquiries
        (id, first_name, last_name, email, phone, subject, product, message, status, created_at, replies)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        inquiry.id,
        inquiry.firstName,
        inquiry.lastName,
        inquiry.email,
        inquiry.phone,
        inquiry.subject,
        inquiry.product,
        inquiry.message,
        inquiry.status,
        new Date(inquiry.createdAt),
        JSON.stringify(inquiry.replies || [])
      ]
    );
  }
}

async function insertInquiry(inquiry: Inquiry) {
  if (!mysqlPool) {
    saveInquiriesToFile(inquiriesStore);
    return;
  }

  await mysqlPool.query(
    `INSERT INTO inquiries
      (id, first_name, last_name, email, phone, subject, product, message, status, created_at, replies)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      inquiry.id,
      inquiry.firstName,
      inquiry.lastName,
      inquiry.email,
      inquiry.phone,
      inquiry.subject,
      inquiry.product,
      inquiry.message,
      inquiry.status,
      new Date(inquiry.createdAt),
      JSON.stringify(inquiry.replies || [])
    ]
  );
}

async function updateInquiry(inquiry: Inquiry) {
  if (!mysqlPool) {
    saveInquiriesToFile(inquiriesStore);
    return;
  }

  await mysqlPool.query(
    `UPDATE inquiries
     SET first_name = ?, last_name = ?, email = ?, phone = ?, subject = ?, product = ?,
         message = ?, status = ?, created_at = ?, replies = ?
     WHERE id = ?`,
    [
      inquiry.firstName,
      inquiry.lastName,
      inquiry.email,
      inquiry.phone,
      inquiry.subject,
      inquiry.product,
      inquiry.message,
      inquiry.status,
      new Date(inquiry.createdAt),
      JSON.stringify(inquiry.replies || []),
      inquiry.id
    ]
  );
}

async function deleteInquiry(id: string) {
  if (!mysqlPool) {
    saveInquiriesToFile(inquiriesStore);
    return;
  }
  await mysqlPool.query('DELETE FROM inquiries WHERE id = ?', [id]);
}

async function persistContent() {
  if (!mysqlPool) {
    saveJsonFile(productsFile, productsStore);
    saveJsonFile(galleryFile, galleryStore);
    return;
  }

  const connection = await mysqlPool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query('DELETE FROM products');
    for (const product of productsStore) {
      await connection.query('INSERT INTO products (id, data) VALUES (?, ?)', [product.id, JSON.stringify(product)]);
    }
    await connection.query('DELETE FROM gallery_items');
    for (const item of galleryStore) {
      await connection.query('INSERT INTO gallery_items (id, data) VALUES (?, ?)', [item.id, JSON.stringify(item)]);
    }
    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

async function initializeInquiryStorage() {
  if (!mysqlPool) {
    console.log('MySQL is not configured. Using local inquiry storage.');
    return;
  }

  await mysqlPool.query(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id VARCHAR(64) PRIMARY KEY,
      first_name VARCHAR(120) NOT NULL,
      last_name VARCHAR(120) NOT NULL DEFAULT '',
      email VARCHAR(255) NOT NULL DEFAULT '',
      phone VARCHAR(80) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      product VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      status ENUM('NEW', 'READ', 'REPLIED') NOT NULL DEFAULT 'NEW',
      created_at DATETIME NOT NULL,
      replies LONGTEXT NULL
    )
  `);

  await mysqlPool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(120) PRIMARY KEY,
      data LONGTEXT NOT NULL
    )
  `);
  await mysqlPool.query(`
    CREATE TABLE IF NOT EXISTS gallery_items (
      id VARCHAR(120) PRIMARY KEY,
      data LONGTEXT NOT NULL
    )
  `);

  const [rows] = await mysqlPool.query<mysql.RowDataPacket[]>(
    'SELECT id, first_name, last_name, email, phone, subject, product, message, status, created_at, replies FROM inquiries ORDER BY created_at DESC'
  );

  if (rows.length > 0) {
    inquiriesStore = rows.map((row) => ({
      id: String(row.id),
      firstName: String(row.first_name),
      lastName: String(row.last_name || ''),
      email: String(row.email || ''),
      phone: String(row.phone),
      subject: String(row.subject),
      product: String(row.product),
      message: String(row.message),
      status: row.status,
      createdAt: new Date(row.created_at).toISOString(),
      replies: typeof row.replies === 'string' ? JSON.parse(row.replies) : (row.replies || [])
    }));
  } else if (inquiriesStore.length > 0) {
    await persistInquiries();
  }

  const [productRows] = await mysqlPool.query<mysql.RowDataPacket[]>('SELECT data FROM products');
  const [galleryRows] = await mysqlPool.query<mysql.RowDataPacket[]>('SELECT data FROM gallery_items');
  if (productRows.length > 0) {
    productsStore = productRows.map((row) => typeof row.data === 'string' ? JSON.parse(row.data) : row.data);
  } else if (productsStore.length > 0) {
    await persistContent();
  }
  if (galleryRows.length > 0) {
    galleryStore = galleryRows.map((row) => typeof row.data === 'string' ? JSON.parse(row.data) : row.data);
  } else if (galleryStore.length > 0) {
    await persistContent();
  }

  console.log(`MySQL inquiry storage enabled: ${inquiriesStore.length} request(s) loaded.`);
}

app.get('/api/content', (req: Request, res: Response) => {
  res.json({ products: productsStore, gallery: galleryStore });
});

app.put('/api/admin/products', requireAdmin, async (req: Request, res: Response) => {
  if (!Array.isArray(req.body.products)) {
    res.status(400).json({ error: 'Products must be an array.' });
    return;
  }
  productsStore = req.body.products;
  try {
    await persistContent();
    res.json({ success: true, products: productsStore });
  } catch {
    res.status(500).json({ error: 'Failed to save products.' });
  }
});

app.put('/api/admin/gallery', requireAdmin, async (req: Request, res: Response) => {
  if (!Array.isArray(req.body.gallery)) {
    res.status(400).json({ error: 'Gallery must be an array.' });
    return;
  }
  galleryStore = req.body.gallery;
  try {
    await persistContent();
    res.json({ success: true, gallery: galleryStore });
  } catch {
    res.status(500).json({ error: 'Failed to save gallery.' });
  }
});

let companySettingsStore = {
  companyName: 'GALAXY COMPOSITE MANUFACTURING',
  shortName: 'GALAXY COMPOSITE',
  phone: '+251 92 010 4692',
  whatsapp: '+251 92 010 4692',
  email: 'Djgoodluck2015@gmail.com',
  address: '2P6J+2H Supreme Court, Addis Ababa',
  googleMapsLocation: '2P6J+2H Supreme Court, Addis Ababa'
};

// Helper: Authentication Middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const sessionToken = req.cookies?.galaxy_admin_session;
  if (!sessionToken || sessionToken !== `session_${SESSION_SECRET}_valid`) {
    res.status(401).json({ error: 'Unauthorized. Admin session required.' });
    return;
  }
  next();
}

// Helper: Email Sender (Resend API or Server Log)
async function sendEmailNotification(to: string, subject: string, htmlContent: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Galaxy Composite <onboarding@resend.dev>',
          to: [to],
          subject: subject,
          html: htmlContent
        })
      });
      const data = await response.json();
      console.log('Resend email result:', data);
    } catch (err) {
      console.error('Failed to send email via Resend API:', err);
    }
  } else {
    console.log(`[SIMULATED EMAIL SENT to ${to}] Subject: "${subject}"\n${htmlContent}`);
  }
}

// ================= API ROUTES =================

// 1. Submit Contact Form Inquiry
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, subject, product, message } = req.body;

    if (!firstName || !phone || !message) {
      res.status(400).json({ error: 'First Name, Phone Number, and Message are required.' });
      return;
    }

    const newInquiry = {
      id: `inq-${crypto.randomUUID()}`,
      firstName: String(firstName).trim(),
      lastName: String(lastName || '').trim(),
      email: String(email || '').trim(),
      phone: String(phone).trim(),
      subject: String(subject || 'General Inquiry').trim(),
      product: String(product || 'General').trim(),
      message: String(message).trim(),
      status: 'NEW' as const,
      createdAt: new Date().toISOString()
    };

    inquiriesStore.unshift(newInquiry);
    await insertInquiry(newInquiry);

    // Email Notification to Admin
    const adminEmailContent = `
      <h2>New Customer Inquiry - Galaxy Composite Manufacturing</h2>
      <p><strong>Customer Name:</strong> ${newInquiry.firstName} ${newInquiry.lastName}</p>
      <p><strong>Email:</strong> ${newInquiry.email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${newInquiry.phone}</p>
      <p><strong>Subject:</strong> ${newInquiry.subject}</p>
      <p><strong>Selected Product:</strong> ${newInquiry.product}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f1f5f9; padding: 12px; border-left: 4px solid #ea580c;">${newInquiry.message}</blockquote>
      <p><strong>Date/Time:</strong> ${new Date(newInquiry.createdAt).toLocaleString()}</p>
    `;
    await sendEmailNotification('Djgoodluck2015@gmail.com', 'New Customer Inquiry - Galaxy Composite Manufacturing', adminEmailContent);

    // Confirmation Email to Customer (if email provided)
    if (newInquiry.email) {
      const customerEmailContent = `
        <h3>Thank you for contacting Galaxy Composite Manufacturing!</h3>
        <p>Dear ${newInquiry.firstName},</p>
        <p>We have received your message regarding <strong>${newInquiry.product}</strong> and will get back to you as soon as possible.</p>
        <hr/>
        <p><strong>Galaxy Composite Manufacturing</strong><br/>
        Phone: +251 92 010 4692<br/>
        Email: Djgoodluck2015@gmail.com<br/>
        Address: 2P6J+2H Supreme Court, Addis Ababa</p>
      `;
      await sendEmailNotification(newInquiry.email, 'Thank you for contacting Galaxy Composite Manufacturing', customerEmailContent);
    }

    res.json({ success: true, message: 'Message sent successfully.', inquiry: newInquiry });
  } catch (err) {
    console.error('Error submitting contact form:', err);
    res.status(500).json({ error: 'Server error processing inquiry.' });
  }
});

// 2. Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  if (process.env.VERCEL && ((!ADMIN_PASSWORD_HASH && !ADMIN_PASSWORD) || !SESSION_SECRET)) {
    res.status(503).json({ error: 'Admin authentication is not configured for this deployment.' });
    return;
  }

  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required.' });
    return;
  }

  const isUserValid = username === ADMIN_USERNAME;
  const submittedPassword = Buffer.from(String(password));
  const configuredPassword = Buffer.from(ADMIN_PASSWORD);
  const isPassValid = ADMIN_PASSWORD_HASH
    ? bcrypt.compareSync(String(password), ADMIN_PASSWORD_HASH)
    : Boolean(ADMIN_PASSWORD) && submittedPassword.length === configuredPassword.length &&
      crypto.timingSafeEqual(submittedPassword, configuredPassword);

  if (isUserValid && isPassValid) {
    // Set secure HttpOnly session cookie
    const token = `session_${SESSION_SECRET}_valid`;
    res.cookie('galaxy_admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 3600 * 1000 // 7 days
    });

    res.json({ success: true, message: 'Authenticated successfully.' });
  } else {
    res.status(401).json({ error: 'Invalid username or password.' });
  }
});

// 3. Admin Check Session
app.get('/api/admin/me', requireAdmin, (req: Request, res: Response) => {
  res.json({ authenticated: true, username: ADMIN_USERNAME });
});

// 4. Admin Logout
app.post('/api/admin/logout', (req: Request, res: Response) => {
  res.clearCookie('galaxy_admin_session', { path: '/' });
  res.json({ success: true, message: 'Logged out.' });
});

// 5. Admin Inquiries API
app.get('/api/admin/inquiries', requireAdmin, (req: Request, res: Response) => {
  res.json({ inquiries: inquiriesStore });
});

app.patch('/api/admin/inquiries/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const item = inquiriesStore.find((i) => i.id === id);
  if (!item) {
    res.status(404).json({ error: 'Inquiry not found' });
    return;
  }
  if (status) item.status = status;
  updateInquiry(item)
    .then(() => res.json({ success: true, inquiry: item }))
    .catch(() => res.status(500).json({ error: 'Failed to save inquiry status.' }));
});

app.delete('/api/admin/inquiries/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  inquiriesStore = inquiriesStore.filter((i) => i.id !== id);
  deleteInquiry(id)
    .then(() => res.json({ success: true }))
    .catch(() => res.status(500).json({ error: 'Failed to delete inquiry.' }));
});

app.post('/api/admin/inquiries/:id/reply', requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { replyMessage } = req.body;
  const item = inquiriesStore.find((i) => i.id === id);

  if (!item) {
    res.status(404).json({ error: 'Inquiry not found' });
    return;
  }

  item.status = 'REPLIED';
  if (!item.replies) item.replies = [];
  item.replies.push({ message: replyMessage, date: new Date().toISOString() });

  try {
    await updateInquiry(item);
  } catch {
    res.status(500).json({ error: 'Failed to save inquiry reply.' });
    return;
  }

  if (item.email) {
    const htmlContent = `
      <p>Dear ${item.firstName},</p>
      <blockquote style="background: #f8fafc; padding: 12px; border-left: 4px solid #ea580c;">${replyMessage}</blockquote>
      <hr/>
      <p><strong>Galaxy Composite Manufacturing</strong><br/>
      Phone: +251 92 010 4692<br/>
      Email: Djgoodluck2015@gmail.com<br/>
      Address: 2P6J+2H Supreme Court, Addis Ababa</p>
    `;
    await sendEmailNotification(item.email, `Re: ${item.subject} - Galaxy Composite Manufacturing`, htmlContent);
  }

  res.json({ success: true, inquiry: item });
});

// 6. Settings API
app.get('/api/settings', (req: Request, res: Response) => {
  res.json(companySettingsStore);
});

app.put('/api/admin/settings', requireAdmin, (req: Request, res: Response) => {
  companySettingsStore = { ...companySettingsStore, ...req.body };
  res.json({ success: true, settings: companySettingsStore });
});

// 7. Image/Media Upload Signature or Direct Handler
app.post('/api/upload', requireAdmin, (req: Request, res: Response) => {
  const { fileData, fileName } = req.body;
  // If Cloudinary env set, can generate upload signature or accept file
  if (fileData) {
    res.json({ success: true, url: fileData });
  } else {
    res.status(400).json({ error: 'No file data provided' });
  }
});

// Start Server Mode: Vite Middleware for Dev OR Dist Static for Production
let storageInitialization: Promise<void> | undefined;

async function initializeStorageOnce() {
  storageInitialization ||= initializeInquiryStorage();
  await storageInitialization;
}

export async function handleVercelRequest(req: Request, res: Response) {
  await initializeStorageOnce();
  return app(req, res);
}

async function startServer() {
  await initializeStorageOnce();

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Galaxy Composite Server running on http://localhost:${PORT}`);
  });
}

if (!process.env.VERCEL) startServer();
