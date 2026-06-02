# Backend Template

## Run

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m app.db.init_db
uvicorn app.main:app --reload
```

## Initial API Endpoints

- `GET /`
- `GET /api/status`
- `GET /api/navigation`
- `GET /api/modules`
- `GET /api/modules/{module_slug}`
