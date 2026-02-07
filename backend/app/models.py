from __future__ import annotations

from enum import Enum
from typing import List, Optional, Literal

from pydantic import BaseModel


class ChangeType(str, Enum):
    INSERTED = "inserted"
    DELETED = "deleted"
    UNCHANGED = "unchanged"
    MODIFIED = "modified"


class DiffBlock(BaseModel):
    type: ChangeType
    left_content: Optional[str] = None
    right_content: Optional[str] = None
    left_start: int
    left_end: int
    right_start: int
    right_end: int


class ComparisonResult(BaseModel):
    similarity_score: float  # 0-100%
    total_changes: int
    additions: int
    deletions: int
    modifications: int
    diff_blocks: List[DiffBlock]
    left_text: str
    right_text: str
    processing_time_ms: float


class FileUploadResponse(BaseModel):
    file_id: str
    filename: str
    file_type: Literal["pdf", "docx"]
    text_preview: str
    char_count: int
