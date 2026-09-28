<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/11e67534-aebe-480a-9aa3-018e3407cb43

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## MySQL inquiry storage

Quote requests and contact submissions are stored in MySQL when these variables are set in `.env`:

```env
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=galaxy_composite
```

Create the database once in MySQL:

```sql
CREATE DATABASE galaxy_composite;
```

The server automatically creates the `inquiries` table and imports existing local inquiries the first time it connects. New requests, status changes, deletions, and replies are then saved in MySQL. If the MySQL variables are not configured, the app uses the local `data/inquiries.json` fallback.

## Deploy to Vercel

Import the GitHub repository into Vercel. The Vercel API function serves the Express API, while Vite builds the frontend into `dist`.

In Vercel Project Settings → Environment Variables, configure `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, and `MYSQL_DATABASE` for a hosted MySQL service. Do not use `127.0.0.1` for the database host; that points to the Vercel function itself. Also set `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH` (a bcrypt hash of the chosen admin password), and a long random `SESSION_SECRET`. Admin login intentionally stays disabled on Vercel until these values are configured.

Local `.env` files and `data/*.json` customer records are excluded from Git.
