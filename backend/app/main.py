import os
import uuid
from typing import Optional

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .models import ComparisonResult, FileUploadResponse
from .services.file_extractor import FileExtractor
from .services.comparator import DocumentComparator

app = FastAPI(
    title="Document Comparator API",
    description="API para comparação de documentos PDF e Word",
    version="1.0.0",
)

# Em produção (Vercel), normalmente o front e o /api ficam no mesmo domínio.
# Mantemos CORS aberto para facilitar integrações.
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ALLOW_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Storage temporário em memória (serverless pode reiniciar; ok para demo/MVP)
temp_storage: dict[str, dict] = {}
extractor = FileExtractor()
comparator = DocumentComparator()


@app.post("/api/upload", response_model=FileUploadResponse)
async def upload_file(file: UploadFile = File(...)):
    allowed_extensions = {".pdf", ".docx", ".doc"}
    file_ext = os.path.splitext(file.filename)[1].lower()

    if file_ext not in allowed_extensions:
        raise HTTPException(400, f"Tipo de arquivo não suportado. Use: {allowed_extensions}")

    content = await file.read()
    if len(content) > 50 * 1024 * 1024:
        raise HTTPException(400, "Arquivo muito grande (máx 50MB)")

    try:
        if file_ext == ".pdf":
            text = extractor.extract_pdf(content)
            file_type = "pdf"
        else:
            text = extractor.extract_docx(content)
            file_type = "docx"

        text = extractor.clean_text(text)
        file_id = str(uuid.uuid4())

        temp_storage[file_id] = {
            "filename": file.filename,
            "text": text,
            "content": content,
        }

        return FileUploadResponse(
            file_id=file_id,
            filename=file.filename,
            file_type=file_type,
            text_preview=(text[:500] + "...") if len(text) > 500 else text,
            char_count=len(text),
        )
    except Exception as e:
        raise HTTPException(500, f"Erro ao processar arquivo: {str(e)}")


@app.post("/api/compare", response_model=ComparisonResult)
async def compare_documents(
    left_file_id: str,
    right_file_id: str,
    output_format: Optional[str] = "json",  # json, html
):
    if left_file_id not in temp_storage or right_file_id not in temp_storage:
        raise HTTPException(404, "Arquivo(s) não encontrado(s). Faça o upload primeiro.")

    left_doc = temp_storage[left_file_id]
    right_doc = temp_storage[right_file_id]

    try:
        result = comparator.compare(left_doc["text"], right_doc["text"])

        if output_format == "html":
            html_result = comparator.generate_redline_html(result)
            return JSONResponse({"comparison": result.model_dump(), "html": html_result})

        return result
    except Exception as e:
        raise HTTPException(500, f"Erro na comparação: {str(e)}")


@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}


@app.delete("/api/files/{file_id}")
async def delete_file(file_id: str):
    if file_id in temp_storage:
        del temp_storage[file_id]
    return {"message": "Arquivo removido"}
