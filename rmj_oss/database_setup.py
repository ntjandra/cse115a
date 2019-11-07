import sys
# for creating the mapper code
from sqlalchemy import Column, ForeignKey, Integer, String

# for configuration and class code
from sqlalchemy.ext.declarative import declarative_base

# for creating foreign key relationship between the tables
from sqlalchemy.orm import relationship

# for auto-incrementing id
# from sqlalchemy.schema import Sequence

# for configuration
from sqlalchemy import create_engine

# create declarative_base instance
Base = declarative_base()

# RentPost, extends the Base Class.


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


# Account class
class Account(Base):
    __tablename__ = 'account'

    email = Column(String(250), primary_key=True)
    name = Column(String(250), nullable=False)
    description = Column(String, nullable=True)
    location = Column(String(250), nullable=True)
    password = Column(String(32), nullable=False)

    def serialize(self):
        return {
            'email': self.email,
            'name': self.name,
            'description': self.description,
            'location': self.location,
            'password': self.password,
        }
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

# Creates a create_engine instance at the bottom of the file
engine = create_engine('sqlite:///site.db')

Base.metadata.create_all(engine)
