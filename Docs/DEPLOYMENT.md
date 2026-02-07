# SioLabs Deployment Guide

This guide covers deploying SioLabs using **Vercel (Frontend)** and **Railway (API + Database)**.

## Architecture Overview

| Component | Platform | URL |
|-----------|----------|-----|
| Frontend (Next.js) | Vercel | `https://your-app.vercel.app` |
| API (Express) | Railway | `https://your-api.railway.app` |
| Database (PostgreSQL) | Railway | (internal) |

---

## Prerequisites

- GitHub repository with the SioLabs codebase
- [Vercel](https://vercel.com) account
- [Railway](https://railway.app) account

---

## Part 1: Deploy the API + Database on Railway

### Step 1: Create a Railway Project

1. Go to [railway.app](https://railway.app) and sign in (GitHub recommended)
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your SioLabs repository
4. Choose **Add variables later** or **Empty Project** to start

### Step 2: Add PostgreSQL Database

1. In your Railway project, click **+ New** → **Database** → **PostgreSQL**
2. Railway provisions a PostgreSQL instance automatically
3. Click on the PostgreSQL service → **Variables** tab
4. Copy the `DATABASE_URL` (or `POSTGRES_URL`) — you'll need this for the API

### Step 3: Configure and Deploy the API

1. Click **+ New** → **GitHub Repo** (or **Add Service** if you already have the repo)
2. Select the same SioLabs repository
3. In the new service, go to **Settings**:
   - **Root Directory:** Set to `apps/api`
   - **Build Command:** (leave default — Nixpacks uses `nixpacks.toml`)
   - **Start Command:** (leave default — uses `npm run start:prod`)

4. Go to **Variables** and add:

   | Variable | Value |
   |----------|-------|
   | `DATABASE_URL` | Paste from PostgreSQL service (e.g. `${{Postgres.DATABASE_URL}}` if linking) |
   | `JWT_SECRET` | Generate with `openssl rand -base64 32` |
   | `JWT_EXPIRES_IN` | `7d` |
   | `CORS_ORIGIN` | Leave empty for now; add after Vercel deploy |
   | `NODE_ENV` | `production` |
   | `PORT` | Railway sets this automatically |

5. **Link the database:** In the API service Variables, click **+ New Variable** → **Add Reference** → select the Postgres `DATABASE_URL`

6. Deploy: Railway will build and deploy automatically. Go to **Settings** → **Networking** → **Generate Domain** to get your API URL (e.g. `https://siolabs-api-production.up.railway.app`)

7. **Note your API URL** — you'll need it for Vercel (use the full URL including `https://` and add `/api` for the base path, e.g. `https://xxx.railway.app/api`)

---

## Part 2: Deploy the Frontend on Vercel

### Step 1: Import Project

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New** → **Project**
3. Import your SioLabs repository
4. Configure the project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** Click **Edit** and set to `apps/web`
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** (leave default — `.next` for Next.js)
   - **Install Command:** `npm install` (default)

### Step 2: Add Environment Variables

Before deploying, add:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `https://YOUR-RAILWAY-API-URL/api` |

Replace `YOUR-RAILWAY-API-URL` with the domain from your Railway API service (e.g. `https://siolabs-api-production.up.railway.app/api`).

**Important:** The URL must end with `/api` because the frontend expects all API routes under that path.

### Step 3: Deploy

1. Click **Deploy**
2. Wait for the build to complete
3. Copy your Vercel URL (e.g. `https://siolabs.vercel.app`)

---

## Part 3: Connect Frontend and API (CORS)

1. Go back to **Railway** → your API service → **Variables**
2. Update `CORS_ORIGIN` to your Vercel URL:
   - `https://siolabs.vercel.app` (production)
   - Or add both: `https://siolabs.vercel.app,https://siolabs-git-main-yourteam.vercel.app` for preview deployments
3. Railway will automatically redeploy with the new variable

---

## Part 4: Seed the Database (Optional)

To add sample data for testing:

1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Link your project: `railway link` (select the API service)
4. Run seed from repo root:
   ```bash
   cd apps/api
   railway run npm run db:seed
   ```

Or use Prisma Studio to inspect data:
```bash
cd apps/api
DATABASE_URL="your-railway-database-url" npx prisma studio
```

---

## Verification Checklist

- [ ] API returns 200 at `https://YOUR-API-URL/api/health`
- [ ] Frontend loads at your Vercel URL
- [ ] Login works (if using seed data: `student@siolabs.com` / `Password123!`)
- [ ] Dashboard loads after login
- [ ] No CORS errors in browser console

---

## Custom Domains

### Vercel
- **Settings** → **Domains** → Add your domain (e.g. `app.siolabs.com`)
- Update `CORS_ORIGIN` in Railway to include the new domain

### Railway
- **Settings** → **Networking** → **Custom Domain** (e.g. `api.siolabs.com`)
- Update `NEXT_PUBLIC_API_URL` in Vercel to the new API domain

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors | Ensure `CORS_ORIGIN` in Railway matches your Vercel URL exactly (no trailing slash) |
| 404 on API routes | Check that `NEXT_PUBLIC_API_URL` ends with `/api` |
| DB connection failed | Verify `DATABASE_URL` is set and the Postgres service is running |
| Migrations not applied | `start:prod` runs `prisma migrate deploy` automatically; check build logs for errors |
| Build fails on Vercel | Ensure Root Directory is `apps/web` and dependencies are in `apps/web/package.json` |

---

## Environment Variables Reference

### Frontend (Vercel)
| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | Full API base URL including `/api` (e.g. `https://api.example.com/api`) |

### API (Railway)
| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Secret for JWT signing (min 32 chars) |
| `JWT_EXPIRES_IN` | No | Token expiry (default: `7d`) |
| `CORS_ORIGIN` | Yes | Frontend URL(s), comma-separated |
| `NODE_ENV` | No | Set to `production` |
| `PORT` | No | Railway sets automatically |
