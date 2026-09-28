import 'dotenv/config';
import fs from 'node:fs';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

await connection.query(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id VARCHAR(64) PRIMARY KEY,
    first_name VARCHAR(120) NOT NULL,
    last_name VARCHAR(120) NOT NULL DEFAULT '',
    email VARCHAR(255) NOT NULL DEFAULT '',
    phone VARCHAR(80) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    product VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(16) NOT NULL DEFAULT 'NEW',
    created_at DATETIME NOT NULL,
    replies LONGTEXT NULL
  )
`);
await connection.query('CREATE TABLE IF NOT EXISTS products (id VARCHAR(120) PRIMARY KEY, data LONGTEXT NOT NULL)');
await connection.query('CREATE TABLE IF NOT EXISTS gallery_items (id VARCHAR(120) PRIMARY KEY, data LONGTEXT NOT NULL)');

function readJson(file) {
  if (!fs.existsSync(file)) return [];
  const value = JSON.parse(fs.readFileSync(file, 'utf8'));
  return Array.isArray(value) ? value : [];
}

async function importWhenEmpty(table, file, insert) {
  const [rows] = await connection.query(`SELECT COUNT(*) AS total FROM ${table}`);
  if (Number(rows[0].total) !== 0) return;
  for (const item of readJson(file)) await insert(item);
}

await importWhenEmpty('inquiries', 'data/inquiries.json', (item) => connection.query(
  `INSERT INTO inquiries
    (id, first_name, last_name, email, phone, subject, product, message, status, created_at, replies)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [item.id, item.firstName, item.lastName || '', item.email || '', item.phone, item.subject, item.product, item.message, item.status, new Date(item.createdAt), JSON.stringify(item.replies || [])]
));
await importWhenEmpty('products', 'data/products.json', (item) => connection.query(
  'INSERT INTO products (id, data) VALUES (?, ?)',
  [item.id, JSON.stringify(item)]
));
await importWhenEmpty('gallery_items', 'data/gallery.json', (item) => connection.query(
  'INSERT INTO gallery_items (id, data) VALUES (?, ?)',
  [item.id, JSON.stringify(item)]
));

const [counts] = await connection.query(`
  SELECT
    (SELECT COUNT(*) FROM inquiries) AS inquiries,
    (SELECT COUNT(*) FROM products) AS products,
    (SELECT COUNT(*) FROM gallery_items) AS gallery_items
`);
console.log(`Database ${process.env.MYSQL_DATABASE} ready: ${counts[0].inquiries} inquiries, ${counts[0].products} products, ${counts[0].gallery_items} gallery images.`);
await connection.end();
