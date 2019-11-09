import sys
# for creating the mapper code
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
# from sqlalchemy.schema import Sequence
from sqlalchemy import create_engine
from flask_login import LoginManager, UserMixin

# create declarative_base instance
Base = declarative_base()
login_manager = LoginManager()

# RentPost, extends the Base Class.

# Login Cookie at Init
@login_manager.user_loader
#Safely cast the user_id to a int
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

    def serialize(self):
        return {
            'email': self.email,
            'name': self.name,
            'description': self.description,
            'location': self.location,
            'password': self.password,
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

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'location': self.location,
            'contactinfo': self.contactinfo,
            'price': self.price,
        }


# Creates a create_engine instance at the bottom of the file
engine = create_engine('sqlite:///site.db')


Base.metadata.create_all(engine)