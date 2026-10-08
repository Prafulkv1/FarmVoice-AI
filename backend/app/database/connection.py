"""Reusable MySQL connection layer (SQLAlchemy engine + pooling)."""
from sqlalchemy import create_engine
from sqlalchemy.engine import Engine

from app.config import get_settings

_engine: Engine | None = None


def get_engine() -> Engine:
    """Singleton MySQL engine with connection pooling (QueuePool)."""
    global _engine
    if _engine is None:
        settings = get_settings()
        _engine = create_engine(
            settings.database_url,
            pool_pre_ping=True,   # verify connections before use (MySQL timeout-safe)
            pool_size=10,
            max_overflow=20,
            pool_recycle=3600,    # recycle before MySQL wait_timeout
            echo=settings.SQL_ECHO,
            connect_args={"charset": "utf8mb4"},
        )
    return _engine
