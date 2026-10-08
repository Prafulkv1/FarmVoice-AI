"""Seed the 11 supported languages (matches the React language switcher)."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.models.core import Language

LANGUAGES = [
    ("en", "English"),
    ("kn", "ಕನ್ನಡ"),
    ("hi", "हिंदी"),
    ("ta", "தமிழ்"),
    ("te", "తెలుగు"),
    ("ml", "മലയാളം"),
    ("mr", "मराठी"),
    ("bn", "বাংলা"),
    ("gu", "ગુજરાતી"),
    ("pa", "ਪੰਜਾਬੀ"),
    ("or", "ଓଡ଼ିଆ"),
]


def seed(db: Session) -> int:
    added = 0
    for code, label in LANGUAGES:
        if not db.query(Language).filter_by(code=code).first():
            db.add(Language(code=code, label=label, is_active=True))
            added += 1
    db.commit()
    return added


if __name__ == "__main__":
    db = SessionLocal()
    try:
        print(f"Seeded {seed(db)} languages.")
    finally:
        db.close()
