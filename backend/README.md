# FarmVoice AI — Backend (FastAPI + MySQL only)

Architecture: **React.js → FastAPI → MySQL**. No other database is used.

## Prerequisites
- MySQL 8.0 running on `localhost:3306` (verified: 8.0.46)
- Python 3.12+

## Environment variables (`backend/.env`, never committed)
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=farmvoice_ai
DB_USER=root
DB_PASSWORD=your_password
SQL_ECHO=false
JWT_SECRET_KEY=change-me-to-a-long-random-secret
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
APP_ENV=development
```
Copy `backend/.env.example` to `backend/.env` and fill in `DB_PASSWORD` + `JWT_SECRET_KEY`.

## Install dependencies
```bash
cd backend
uv venv .venv --python 3.12
uv pip install --python .venv/Scripts/python.exe -r requirements.txt
```

## Create / migrate the database
Fresh setup (creates `farmvoice_ai` + tables):
```bash
.venv/Scripts/python.exe scripts/init_db.py
.venv/Scripts/python.exe scripts/seed_languages.py
```
Migration path (Alembic, from `backend/`):
```bash
.venv/Scripts/python.exe -m alembic upgrade head   # current: 0002_server_defaults
```

## Start the backend
```bash
cd backend
..\\backend\\.venv\\Scripts\\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

## Verify
- `GET /health` → `{"status":"ok","database":"mysql","database_status":"connected"}`
- `POST /auth/register`, `POST /auth/login`, `GET/PATCH/DELETE /users/me`

## Layout
```
backend/
├── app/
│   ├── main.py               # FastAPI app + CORS + routers
│   ├── config.py             # settings (.env, MySQL DSN via PyMySQL)
│   ├── database/
│   │   ├── base.py           # DeclarativeBase
│   │   ├── connection.py     # pooled MySQL engine (QueuePool, pool_pre_ping)
│   │   └── session.py        # SessionLocal + get_db dependency
│   ├── models/core.py        # languages, users, farmers, notifications
│   ├── schemas/user.py       # register/login/profile schemas
│   ├── services/             # bcrypt auth + user CRUD
│   └── routes/               # health, auth, users
├── alembic/                  # MySQL migrations (0001_initial, 0002_server_defaults)
└── scripts/                  # init_db.py, seed_languages.py
```

## Local configuration notes
- `backend/.env` must contain your real MySQL root password; it is git-ignored.
- The frontend (`src/`, styles, auth UI, sidebar/header/footer) is untouched.
- Future tables (farms, crops, weather, schemes, chat_history, …) go in
  `app/models/` + new Alembic revisions; `users.id` is the FK anchor.
