# DocCompare (Vite + FastAPI) — pronto para GitHub e Vercel

Este repositório contém:
- **Frontend**: React + Vite + TypeScript + Tailwind (em `frontend/`)
- **Backend**: FastAPI (em `backend/`) + **Serverless entrypoint** para Vercel (em `api/`)

> Observação: o backend usa **armazenamento em memória** (`temp_storage`). Em ambiente serverless (Vercel), isso é volátil (pode reiniciar a qualquer momento). Para produção, o ideal é persistir em S3/DB.

## Rodar localmente (dev)

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
# Se quiser apontar para o backend local:
# (Linux/Mac)  export VITE_API_URL=http://localhost:8000/api
# (Windows PS) $env:VITE_API_URL='http://localhost:8000/api'
npm run dev
```

Abra: `http://localhost:5173`

## Deploy na Vercel

1) Suba o repositório no GitHub  
2) Na Vercel, **Import Project** do GitHub  
3) O `vercel.json` já está configurado para:
- buildar o **frontend**
- publicar o **FastAPI** como Serverless em `/api/*`

### Variáveis de ambiente (opcional)
- `CORS_ALLOW_ORIGINS` (default `*`)
- `VITE_API_URL` (frontend) — por padrão já usa `/api` em produção

## Endpoints

- `POST /api/upload` (multipart/form-data: `file`)
- `POST /api/compare?left_file_id=...&right_file_id=...`
- `GET /api/health`

