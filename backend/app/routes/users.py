"""User routes: bearer-auth profile CRUD backed by MySQL."""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.core import Language, User
from app.schemas.user import UpdateProfileRequest, UserOut
from app.services.security import decode_subject
from app.services.users import user_to_out

router = APIRouter(prefix="/users", tags=["users"])
_bearer = HTTPBearer(auto_error=False)


def current_user(
    creds: HTTPAuthorizationCredentials | None = Depends(_bearer),
    db: Session = Depends(get_db),
) -> User:
    if not creds:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing token.")
    subject = decode_subject(creds.credentials)
    if not subject:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token.")
    user = db.query(User).filter(User.id == int(subject), User.deleted_at.is_(None)).first()
    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found.")
    return user


@router.get("/me", response_model=UserOut)
def me(user: User = Depends(current_user)):
    return user_to_out(user)


@router.patch("/me", response_model=UserOut)
def update_me(payload: UpdateProfileRequest, user: User = Depends(current_user), db: Session = Depends(get_db)):
    if payload.full_name:
        user.full_name = payload.full_name.strip()
    if payload.state is not None:
        user.state = payload.state.strip() or None
    if payload.district is not None:
        user.district = payload.district or None
    if payload.preferred_language:
        lang = db.query(Language).filter(Language.code == payload.preferred_language).first()
        if not lang:
            raise HTTPException(status_code=400, detail="Unknown language code.")
        user.preferred_language_id = lang.id
    db.commit()
    db.refresh(user)
    return user_to_out(user)


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
def delete_me(user: User = Depends(current_user), db: Session = Depends(get_db)):
    from datetime import datetime

    user.deleted_at = datetime.utcnow()  # soft delete, preserved behavior
    user.is_active = False
    db.commit()
    return None
