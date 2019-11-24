import sys
# for creating the mapper code
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
# from sqlalchemy.schema import Sequence
from sqlalchemy import create_engine
from flask_login import LoginManager, UserMixin

import jwt
import datetime

# create declarative_base instance
Base = declarative_base()
login_manager = LoginManager()

# RentPost, extends the Base Class.

# Login Cookie at Init
@login_manager.user_loader
# Safely cast the user_id to a int
def load_user(user_id):
    return Account.query.get(int(user_id))


# Account class
class Account(Base, UserMixin):  # Need to add UserMixin
    __tablename__ = 'account'

    user_id = Column(Integer(), autoincrement=True, primary_key=True)
    email = Column(String(250), nullable=False)
    name = Column(String(250), nullable=False)
    description = Column(String, nullable=True, default="No bio")
    location = Column(String(250), nullable=True, default="Unknown")
    password = Column(String(32), nullable=False)

    # For creating JSONs
    def serialize(self):
        return {
            'user_id': self.user_id,
            'email': self.email,
            'name': self.name,
            'description': self.description,
            'location': self.location,
        }

    def serialize_noEmail(self):
        return {
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'location': self.location,
        }

    # Overload UserMixin
    def get_id(self):
        return (self.user_id)

    # Session Token for 2 Factor with expiry
    """
    # Required Import
    from itsdangerous import
    TimedJSONWebSignatureSerializer as Serializer
    def get_reset_token(self, expires_sec=1800):
    s = Serializer(app.config['SECRET_KEY'], expires_sec)
    return s.dumps({'user_id': self.id}).decode('utf-8')

    @staticmethod
    def verify_reset_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token)['user_id']
        except:
            return None
        return User.query.get(user_id)
    """


class RentPost(Base):
    __tablename__ = 'rentpost'

    id = Column(Integer, autoincrement=True, primary_key=True)
    title = Column(String(250), nullable=False)
    description = Column(String(250), nullable=False)
    location = Column(String(250))
    contactinfo = Column(String(250))
    price = Column(Integer())
    author_id = Column(Integer(), nullable=False)
    author_name = Column(String(250), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'location': self.location,
            'contactinfo': self.contactinfo,
            'price': self.price,
            'author_id': self.author_id,
            'author_name': self.author_name,
        }


class Reputation(Base):
    __tablename__ = 'reputation'

    key = Column(Integer, autoincrement=True, primary_key=True)
    user_id = Column(Integer, nullable=False)
    reviewer = Column(Integer, nullable=False)
    evaluation = Column(Integer, nullable=False)

    def serialize(self):
        return {
            'key': self.key,
            'user_id': self.user_id,
            'reviewer': self.reviewer,
            'evaluation': self.evaluation
        }


# Creates a create_engine instance at the bottom of the file
engine = create_engine('sqlite:///site.db')

Base.metadata.create_all(engine)
