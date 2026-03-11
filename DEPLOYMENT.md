# Deployment Guide – Apex Health Platform

Two recommended free-tier hosting options for the MVP demo.

---

## Option A: Render (Recommended for MVP)

Render offers a generous free tier for both web services and static sites.

### Step 1 – Push to GitHub

```bash
cd apex-health
git init
git add .
git commit -m "Initial commit - Apex Health MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/apex-health.git
git push -u origin main
```

### Step 2 – Deploy Backend (Spring Boot)

1. Go to https://render.com → **New** → **Web Service**
2. Connect your GitHub repository
3. Set these settings:
   - **Name:** `apex-health-backend`
   - **Root Directory:** `backend`
   - **Runtime:** `Docker` (or `Java`)
   - **Build Command:** `./mvnw clean package -DskipTests`
   - **Start Command:** `java -jar target/*.jar`
4. Under **Environment Variables**, add:
   - `SPRING_DATASOURCE_URL` = `jdbc:sqlite:./data/apexhealth.db`
5. Click **Create Web Service**
6. Note the URL — it will be something like: `https://apex-health-backend.onrender.com`

### Step 3 – Deploy Frontend (React)

1. Go to **New** → **Static Site**
2. Connect same repository
3. Set these settings:
   - **Name:** `apex-health-frontend`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_URL` = `https://apex-health-backend.onrender.com/api`
5. Click **Create Static Site**

✅ Your dashboard will be live at `https://apex-health-frontend.onrender.com`

---

## Option B: Railway

Railway supports Docker Compose directly — easiest for running both services.

### Steps

1. Go to https://railway.app → **New Project** → **Deploy from GitHub**
2. Connect your repository
3. Railway auto-detects `docker-compose.yml`
4. Click **Deploy**
5. Under each service, go to **Settings** → **Generate Domain** for public URLs

---

## Option C: Local Demo (for March 24 presentation)

If internet is unreliable at the venue, run locally:

```bash
# Make sure Docker Desktop is running
docker-compose up --build

# Open browser:
# Dashboard: http://localhost:3000
# API:       http://localhost:8080/api/health
```

This is the most reliable option for a live demo.

---

## Pre-Demo Checklist

- [ ] `docker-compose up --build` runs without errors
- [ ] `http://localhost:3000` loads the dashboard
- [ ] KPI cards show correct numbers (5 total, 4 active, 3 completed)
- [ ] Bar chart shows all 14 SDOH determinants
- [ ] Radar chart toggle works
- [ ] Filters update the study table
- [ ] Row expansion shows study description
- [ ] Screenshot the working dashboard as backup

---

## Troubleshooting

**Port 3000 already in use:**
```bash
docker-compose down
# Or change port in docker-compose.yml: "3001:80"
```

**Backend fails to start:**
```bash
docker-compose logs backend
```

**Frontend can't reach API:**
- Check that backend is running: `http://localhost:8080/api/health`
- Dashboard will fall back to demo data automatically
