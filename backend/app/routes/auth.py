"""Auth routes: register + login backed by MySQL."""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.user import LoginRequest, RegisterRequest, TokenOut
from app.services.security import create_access_token, verify_password
from app.services.users import create_user, find_user_by_identifier, mobile_or_email_taken, user_to_out

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=TokenOut, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    conflict = mobile_or_email_taken(db, payload.mobile_number, payload.email)
    if conflict:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=conflict)
    user = create_user(db, payload)
    return {
        "access_token": create_access_token(str(user.id)),
        "token_type": "bearer",
        "user": user_to_out(user),
    }


@router.post("/login", response_model=TokenOut)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = find_user_by_identifier(db, payload.identifier)
    if not user or not user.is_active or not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid mobile number/email or password.",
        )
    return {
        "access_token": create_access_token(str(user.id)),
        "token_type": "bearer",
        "user": user_to_out(user),
    }
