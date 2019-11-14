import os
from database_setup import Base, RentPost, Account
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from flask import Flask, jsonify, request, make_response, redirect
from flask_cors import CORS
from flask_login import (LoginManager, login_user, current_user,
                         logout_user, login_required)
from flask_bcrypt import Bcrypt

import jwt
import datetime

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)  # Security
login_manager = LoginManager(app)  # Flask-Login
login_manager.login_view = 'login'

# Fix from internet - seems to work TODO verify this is ok
@login_manager.user_loader
def load_user(user_id):
    return session.query(Account).filter_by(user_id=user_id).first()


# Secret Key TODO change when env vars work
app.secret_key = os.environ.get('RMJ_KEY')


# Secure Login Sessions by encryption

# ---------------------------------------------------------
# Helper functions
# ---------------------------------------------------------
def representsInt(s):
    try:
        int(s)
        return True
    except ValueError:
        return False


# Connect to Database and create database session
engine = create_engine('sqlite:///site.db?check_same_thread=False')
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()

# ---------------------------------------------------------
# JWT Authentication
# Credit to https://realpython.com/token-based-authentication-with-flask/
# for their tutorial!
# ---------------------------------------------------------
# Encode JWT
def encode_auth_token(user_id):
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                app.config.get('SECRET_KEY'),
                algorithm='HS256'
            )
        except Exception as e:
            return e

# Decode JWT
def decode_auth_token(auth_token):
    try:
        payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Login expired'
    except jwt.InvalidTokenError:
        return 'Login invalid'


# ---------------------------------------------------------
# Home Route - Returns recent posts TODO
# ---------------------------------------------------------
@app.route("/api/default", methods=['GET', 'POST'])
def home():
    if request.method == "POST":
        return "Received POST"
    if request.method == "GET":
        return "Received GET"
    return "Invalid Method"


# ---------------------------------------------------------
# Post-Related API
# ---------------------------------------------------------

# Given a post's id, checks for existence and then updates all fields
@app.route("/api/post/update/<int:post_id>", methods=['GET', 'POST'])
def edit_post(post_id):
    dne = session.query(RentPost).filter_by(id=post_id).scalar() is None
    if dne:
        return str('Error - Requested post ID does not exist.')
    form = request.form
    old_post = session.query(RentPost).filter_by(id=post_id).first()
    # Edit Data from form
    old_post.title = form['title']
    old_post.description = form['description']
    old_post.location = form['location']
    old_post.contactinfo = form['contact']
    old_post.price = form['price']

    session.commit()
    return "Edited ID: " + str(post_id) + ", TITLE: " + old_post.title

# Adds new RentPosts to the database
@app.route("/api/post/new", methods=['POST'])
def create_post():

    # The Backend should be Detached from the Frontend
    form = request.form

    # Extract data from form
    title = form['title']
    descr = form['description']
    contact = form['contact']
    loc = form['location']
    price = form['price']

    # Add post to database
    new_post = RentPost(title=title, description=descr,
                        contactinfo=contact, location=loc, price=price)

    session.add(new_post)
    session.commit()
    # print('ID: ' + str(new_post.id)) # Prints this post's ID

    return str(new_post.id) + " 200 OK Success"

# Returns a json contaiining the default of all posts.
@app.route("/api/search/", methods=['GET'])
def search():
    # Get all posts
    posts = session.query(RentPost)
    return jsonify(search=[post.serialize() for post in posts])

# Returns a json of posts that contain a filter
# Returns all posts who have a particular address
@app.route("/api/search/place/<string:place>", methods=['GET'])
def search_place(place):
    # the in_ method is the wildcard for contains anywhere.
    places = (session.query(RentPost).filter_by(location=place)
              .order_by(RentPost.id).all())
    return jsonify(place=[post.serialize() for post in places])

# Returns all posts who have a particular word in their post title
@app.route("/api/search/item/<string:item>", methods=['GET'])
def search_item(item):
    items = session.query(RentPost).filter(RentPost.title.contains(item))
    return jsonify(item=[post.serialize() for post in items])

# Add DRY here to do (column, search)
@app.route("/api/search/<string:column>/<string:value>", methods=['GET'])
def searchPost(column, value):
    if (column == "description"):
        results = session.query(RentPost).filter
        (RentPost.description.contains(value)).all()
        return jsonify(results=[post.serialize() for post in results])
    if (column == "id"):
        result = session.query(RentPost).filter_by(id=value).first()
        if result is None:  # Special Error Handling for Keys
            return "404-Page Result not found"
        return jsonify(post=result.serialize())
    return "404-Page not Found"

# Given a post's id, checks for existence and then deletes post
@app.route("/api/post/delete/<int:post_id>", methods=['POST'])
def deletepost(post_id):
    # Existence check
    dne = session.query(RentPost).filter_by(id=post_id).scalar() is None
    if dne:
        return str('Error - Requested post ID does not exist.')
    post_to_delete = session.query(RentPost).filter_by(id=post_id).one()
    post_title = post_to_delete.title
    session.delete(post_to_delete)
    session.commit()
    return "Deleted ID: " + str(post_id) + ", TITLE: " + post_title


# ---------------------------------------------------------
# Account-Related API
# ---------------------------------------------------------

# Route to handle registration
@app.route("/api/account/register", methods=['POST'])
def register():
    if current_user.is_authenticated:
        return ("Error - User is already logged in")

    fail_register = False
    fail_msg = "Error:"

    form = request.form
    email = form['email']
    name = form['name']

    # Check for unique email
    dne_email = session.query(Account).filter_by(email=email).scalar() is None
    if not dne_email:
        fail_register = True
        fail_msg = fail_msg + " Email is already in use,"

    # Check for unique name
    dne_name = session.query(Account).filter_by(name=name).scalar() is None
    if not dne_name:
        fail_register = True
        fail_msg = fail_msg + " Username is already in use,"

    # Fail if non-unique username or email
    if fail_register:
        return fail_msg

    # Never store passwords in plain text
    hashed_password = (bcrypt.generate_password_hash(
        form['password']).decode('utf-8'))

    # Extract data from form
    loc = form['location']
    bio = form['description']

    # Add Basic User to database
    user = Account(email=email, name=name,
                   password=hashed_password, location=loc, description=bio)
    session.add(user)
    session.commit()
    return str(user.user_id)

# JWT login
@app.route("/api/account/login", methods=['GET', 'POST'])
def login():
    form = request.form
    user = session.query(Account).filter_by(email=form['email']).first()

    # Verify login information
    if user and bcrypt.check_password_hash(user.password, form['password']):
        auth_token = encode_auth_token(user.user_id)
        # Verify auth_token is a jwt, then return
        if (type(auth_token) is not bytes):
            return ("Error logging in")
        return auth_token

    else:
        return ('Login Unsuccessful. Please check email and password')

# Route to Logout User
# TODO may be unecessary - front-end will just delete token (can probably delete)
@app.route("/api/account/logout", methods=['GET'])
def logout():
    # Handled by Flask-Login, Deletes Session Cookie
    if current_user.is_authenticated:
        logout_user()
        return "Logged out"
    return("Cannot logout - No user logged in")

# Update a profile, if the auth token matches the requested update target
@app.route("/api/account/update", methods=['POST'])
def updateAccount():
    form = request.form

    # Get the current user's id, and compare to the edit target's id
    auth_token = form["auth_token"]
    curr_user_id = decode_auth_token(auth_token)
    target_id = int(form["target_id"]) # Casting is REQUIRED
    if curr_user_id != target_id:
        print("bad edit target")
        return "You cannot edit this profile"

    # Update the user's information
    user = session.query(Account).filter_by(user_id=curr_user_id).first()
    user.description = form["description"]
    user.location = form["location"]
    session.commit()
    return "Profile successfully edited"

# Decodes the auth token, and returns the appropriate user if valid
@app.route("/api/account/auth", methods=['GET', 'POST'])
def verifyAuthToken():
    print(request.form)
    form = request.form

    # Check if auth_token exists
    if not "auth_token" in form:
        return "Not logged in"
    auth_token = form["auth_token"]
    
    result = decode_auth_token(auth_token)
    if representsInt(result):
        user = session.query(Account).filter_by(user_id=result).first()
        return jsonify(user.serialize())
    else:
        return result
    
# Returns a user by name
@app.route("/api/account/get/name/<string:name>", methods=['GET'])
def getAccountByName(name):
    # Check for unique name
    dne_name = session.query(Account).filter_by(name=name).scalar() is None
    if not dne_name:
        user = session.query(Account).filter_by(name=name).first()
        return jsonify(user.serialize_noEmail())
    else:
        return "User not found"


if __name__ == "__main__":
    app.run()
