<<<<<<< HEAD
# Apex Health Platform – MVP

A research analytics dashboard demonstrating Social Determinants of Health (SDOH) alignment visualization.

**Demo Presentation: March 24, 2025**

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Backend | Spring Boot 3 (Java 17) |
| Database | SQLite (MVP) |
| Containerization | Docker + Docker Compose |
| Hosting | Render or Railway |

---

## Project Structure

```
apex-health/
├── frontend/          # React app
├── backend/           # Spring Boot API
├── docker/            # Dockerfiles
├── docker-compose.yml
└── README.md
```

---

## Quick Start (Docker)

### Prerequisites
- Docker Desktop: https://www.docker.com/products/docker-desktop
- Git

### Run

```bash
git clone https://github.com/YOUR_USERNAME/apex-health.git
cd apex-health
docker-compose up --build

# Frontend: http://localhost:3000
# Backend:  http://localhost:8080/api
```

---

## Local Development (Without Docker)

```bash
# Backend
cd backend && ./mvnw spring-boot:run

# Frontend
cd frontend && npm install && npm run dev
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/studies` | All research studies |
| GET | `/api/studies?sdoh=Housing` | Filter by SDOH |
| GET | `/api/studies?population=Indigenous` | Filter by population |
| GET | `/api/kpis` | KPI summary |

---

## Known Limitations

- Synthetic demo data only (no real patient data)
- No authentication
- SQLite not for production scale
- Basic error handling

---

## Post-MVP Roadmap

- User authentication
- PostgreSQL migration
- PHIA/HIPAA compliance
- Real data pipelines
- FHIR interoperability APIs
=======
# Apex-Health
The repository for the Apex-Health project.
>>>>>>> d4b3e1f2b4d618fa5f07931ead13e356e5e8f3f4
