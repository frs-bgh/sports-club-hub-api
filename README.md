# sports club hub api (node.js + express)

This project was made for the Backend Web course (EHB).
It is a database-driven REST API built with Node.js 20+, Express and Prisma (SQLite).

---

## Features (assignment requirements)

- Database‑driven API (SQLite via Prisma)
- Two CRUD interfaces
	- Members
	- News posts
- Basic validation
	- Required fields cannot be empty
	- Numeric fields must be numbers (strings are rejected)
	- `firstName` cannot contain digits
- Pagination (limit + offset)
	- `GET /api/members?limit=10&offset=0`
	- `GET /api/news?limit=10&offset=0`
- Search
	- `GET /api/members?search=fariss` (search on firstName/lastName)
	- `GET /api/news?search=club` (search on title/content)
- Root HTML documentation page
	- `GET /` (served from `public/index.html`)

---

## Endpoints

### Docs (root)

- `GET /`

### Health

- `GET /api/health`

### Members (CRUD)

- `GET /api/members`
- `GET /api/members/:id`
- `POST /api/members`
- `PUT /api/members/:id`
- `DELETE /api/members/:id`

Example body (create member):

```json
{
	"firstName": "john",
	"lastName": "doe",
	"age": 22,
	"membershipNumber": 2001
}
```

### News posts (CRUD)

- `GET /api/news`
- `GET /api/news/:id`
- `POST /api/news`
- `PUT /api/news/:id`
- `DELETE /api/news/:id`

Example body (create news post):

```json
{
	"title": "club event",
	"content": "small event next week for members",
	"views": 2
}
```

---

## Setup (how to run)

### Requirements

- Node.js 20+
- npm
- git

### 1) Clone the repository and enter the folder

```bash
git clone https://github.com/frs-bgh/sports-club-hub-api.git
cd sports-club-hub-api
```

### 2) Install dependencies

```bash
npm install
```

### 3) Create `.env`

If you have an `.env.example`, you can copy it:

Windows (PowerShell):

```bash
copy .env.example .env
```

macOS / Linux:

```bash
cp .env.example .env
```

Minimum `.env` content:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

### 4) Run database migration (create tables)

```bash
npm run db:migrate -- --name init
```

### 5) Seed demo data (optional but recommended)

```bash
npm run db:seed
```

### 6) Run locally (development)

```bash
npm run dev
```

### 7) Open in browser

- http://localhost:3000/
- http://localhost:3000/api/health
- http://localhost:3000/api/members
- http://localhost:3000/api/news

---

## Deployment (website url)

Put the deployed URL here (for the assignment):

```text
<put_deployed_url_here>
```

### Environment variables needed

```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

### Example deploy commands

```bash
npm install
npx prisma migrate deploy
npm run db:seed
npm start
```

---

## Git

- `node_modules` is ignored via `.gitignore`.
- Commits are made in small, logical steps with clear messages.

---

## Sources / bronvermeldingen

- Express documentation – https://expressjs.com/
- Prisma documentation – https://www.prisma.io/docs
- Zod documentation – https://zod.dev/
- Helmet / CORS / Morgan documentation –
	- Helmet: https://helmetjs.github.io/
	- CORS (npm package): https://www.npmjs.com/package/cors
	- Morgan: https://www.npmjs.com/package/morgan

