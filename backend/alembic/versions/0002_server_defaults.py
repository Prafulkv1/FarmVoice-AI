"""Add MySQL server defaults for timestamps/booleans (strict-mode safe)."""
from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "0002_server_defaults"
down_revision: str = "0001_initial"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    for table in ("languages", "users", "farmers", "notifications"):
        op.alter_column(table, "created_at", server_default=sa.func.now(), existing_type=sa.DateTime())
    for table in ("users", "farmers"):
        op.alter_column(
            table,
            "updated_at",
            server_default=sa.func.now(),
            server_onupdate=sa.func.now(),
            existing_type=sa.DateTime(),
        )
    op.alter_column("languages", "is_active", server_default="1", existing_type=sa.Boolean())
    op.alter_column("users", "is_active", server_default="1", existing_type=sa.Boolean())
    op.alter_column("notifications", "is_read", server_default="0", existing_type=sa.Boolean())


def downgrade() -> None:
    op.alter_column("notifications", "is_read", server_default=None, existing_type=sa.Boolean())
    op.alter_column("users", "is_active", server_default=None, existing_type=sa.Boolean())
    op.alter_column("languages", "is_active", server_default=None, existing_type=sa.Boolean())
    for table in ("users", "farmers"):
        op.alter_column(
            table, "updated_at", server_default=None, server_onupdate=None, existing_type=sa.DateTime()
        )
    for table in ("languages", "users", "farmers", "notifications"):
        op.alter_column(table, "created_at", server_default=None, existing_type=sa.DateTime())
