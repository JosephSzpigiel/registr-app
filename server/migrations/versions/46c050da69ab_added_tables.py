"""added tables

Revision ID: 46c050da69ab
Revises: 
Create Date: 2023-12-05 22:45:44.515244

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '46c050da69ab'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('event_types',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type_name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_types',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type_name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=True),
    sa.Column('last_name', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('phone', sa.Date(), nullable=True),
    sa.Column('img_url', sa.String(), nullable=True),
    sa.Column('user_type_id', sa.String(), nullable=True),
    sa.Column('_password_hash', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('modified_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.ForeignKeyConstraint(['user_type_id'], ['user_types.id'], name=op.f('fk_users_user_type_id_user_types')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('img_url', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('created_by_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('modified_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('event_type_id', sa.Integer(), nullable=True),
    sa.Column('start_time', sa.DateTime(), nullable=True),
    sa.Column('end_time', sa.DateTime(), nullable=True),
    sa.Column('max_tickets', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['created_by_id'], ['users.id'], name=op.f('fk_events_created_by_id_users')),
    sa.ForeignKeyConstraint(['event_type_id'], ['event_types.id'], name=op.f('fk_events_event_type_id_event_types')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('registrations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('modified_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('event_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('tickets', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], name=op.f('fk_registrations_event_id_events')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_registrations_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('registrations')
    op.drop_table('events')
    op.drop_table('users')
    op.drop_table('user_types')
    op.drop_table('event_types')
    # ### end Alembic commands ###
