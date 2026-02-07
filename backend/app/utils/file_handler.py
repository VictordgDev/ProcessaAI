import os
from pathlib import Path


def ensure_dir(path: str) -> str:
    Path(path).mkdir(parents=True, exist_ok=True)
    return path


def safe_filename(name: str) -> str:
    # simples: remove separadores de path
    return os.path.basename(name).replace("..", "")
