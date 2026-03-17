# Apex Health – Frontend (Vercel)

Fully self-contained React dashboard with dummy data. No backend required.

## Run Locally

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Deploy to Vercel

### Option A – Vercel CLI (fastest)
```bash
npm install -g vercel
vercel
# Follow prompts — done in 60 seconds
```

### Option B – GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to https://vercel.com → New Project → Import your repo
3. Settings:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click Deploy ✅

## Features
- KPI cards (live-filtered as you change filters)
- SDOH bar chart + radar chart toggle
- 5 filters: Status, SDOH determinant, Population, Min score
- Expandable study rows with full SDOH score breakdown
- Black and gold Apex Health branding
- 8 demo studies with realistic data
