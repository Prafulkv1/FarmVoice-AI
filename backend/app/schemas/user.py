"""Pydantic schemas for auth + user CRUD (mirrors the React register/login forms)."""
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class RegisterRequest(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    mobile_number: str = Field(min_length=10, max_length=20)
    email: EmailStr | None = None
    password: str = Field(min_length=6, max_length=128)
    state: str | None = Field(default=None, max_length=100)
    district: str | None = Field(default=None, max_length=100)
    preferred_language: str = Field(default="kn", max_length=10)


class LoginRequest(BaseModel):
    identifier: str = Field(min_length=3, max_length=255)  # mobile number or email
    password: str = Field(min_length=1, max_length=128)


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    mobile_number: str
    email: str | None
    state: str | None
    district: str | None
    preferred_language: str | None = None
    is_active: bool
    created_at: datetime


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class UpdateProfileRequest(BaseModel):
    full_name: str | None = Field(default=None, min_length=2, max_length=120)
    state: str | None = Field(default=None, max_length=100)
    district: str | None = Field(default=None, max_length=100)
    preferred_language: str | None = Field(default=None, max_length=10)
