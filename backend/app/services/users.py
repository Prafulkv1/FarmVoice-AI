"""User CRUD against MySQL (register / login / profile)."""
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.core import Farmer, Language, User
from app.schemas.user import RegisterRequest
from app.services.security import hash_password


def get_language_by_code(db: Session, code: str) -> Language | None:
    return db.query(Language).filter(Language.code == code).first()


def find_user_by_identifier(db: Session, identifier: str) -> User | None:
    ident = identifier.strip()
    return (
        db.query(User)
        .filter(
            or_(User.mobile_number == ident, User.email == ident),
            User.deleted_at.is_(None),
        )
        .first()
    )


def mobile_or_email_taken(db: Session, mobile: str, email: str | None) -> str | None:
    if db.query(User).filter(User.mobile_number == mobile.strip()).first():
        return "Mobile number is already registered."
    if email and db.query(User).filter(User.email == email.strip().lower()).first():
        return "Email is already registered."
    return None


def create_user(db: Session, payload: RegisterRequest) -> User:
    lang = get_language_by_code(db, payload.preferred_language) or get_language_by_code(db, "en")
    user = User(
        full_name=payload.full_name.strip(),
        mobile_number=payload.mobile_number.strip(),
        email=payload.email.strip().lower() if payload.email else None,
        password_hash=hash_password(payload.password),
        state=payload.state.strip() if payload.state else None,
        district=payload.district.strip() if payload.district else None,
        preferred_language_id=lang.id if lang else None,
    )
    db.add(user)
    db.flush()  # populate user.id for the 1:1 farmer profile
    db.add(Farmer(user_id=user.id))
    db.commit()
    db.refresh(user)
    return user


def user_to_out(user: User) -> dict:
    return {
        "id": user.id,
        "full_name": user.full_name,
        "mobile_number": user.mobile_number,
        "email": user.email,
        "state": user.state,
        "district": user.district,
        "preferred_language": user.preferred_language.code if user.preferred_language else None,
        "is_active": user.is_active,
        "created_at": user.created_at,
    }
