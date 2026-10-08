"""Create the farmvoice_ai database + tables (init path, no manual SQL needed)."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

import pymysql

from app.config import get_settings
from app.database.base import Base
from app.database.connection import get_engine
import app.models  # noqa: F401  (register models)

settings = get_settings()

conn = pymysql.connect(
    host=settings.DB_HOST,
    port=settings.DB_PORT,
    user=settings.DB_USER,
    password=settings.DB_PASSWORD,
    charset="utf8mb4",
)
try:
    with conn.cursor() as cur:
        cur.execute(
            f"CREATE DATABASE IF NOT EXISTS `{settings.DB_NAME}` "
            "CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
        )
    conn.commit()
finally:
    conn.close()

Base.metadata.create_all(bind=get_engine())
print(f"Database '{settings.DB_NAME}' ready (tables created).")
