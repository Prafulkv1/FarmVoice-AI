"""Reusable MySQL session layer (SessionLocal + FastAPI dependency)."""
from collections.abc import Generator

from sqlalchemy.orm import Session, sessionmaker

from app.database.connection import get_engine

SessionLocal: sessionmaker[Session] = sessionmaker(
    bind=get_engine(),
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency: yields a MySQL session, always closed afterwards."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
