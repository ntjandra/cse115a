from database_setup import Base, RentPost, Account
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_login import (
    LoginManager, login_user, current_user,
    logout_user, login_required)
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)  # Security
login_manager = LoginManager(app)  # Flask-Login
login_manager.login_view = 'login'

# Secure Login Sessions by encryption


# Helper functions
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

# Home Route - Returns recent posts
@app.route("/api/default", methods=['GET', 'POST'])
def home():
    if request.method == "POST":
        return "Received POST"
    if request.method == "GET":
        return "Received GET"
    return "Invalid Method"

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
    places = session.query(RentPost).filter_by(location=place).\
             order_by(RentPost.id).all()
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
        # Single page by ID
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


# Login API Begins here
"""
Login Manager creates a session cookie for the user/caller
It does not store their account_id
Using Flask Login allows us to check the cookie with
current_user, which is created upon access
Methods
is_authenticated : Checks if current user is logged in
is_active : Handles the ban hammer
is_anonymous: Not logged in
Can do some neat stuff like
if post.author != current_user:
    # Cannot edit file
"""

# Route to handle registration
@app.route("/api/account/register", methods=['POST'])
def register():
    if current_user.is_authenticated:
        return ("Error - User is already logged in")

    form = request.form
    user = form['email']

    # Need to check for unique email.
    dne = session.query(Account).filter_by(user_id=user).scalar() is None
    if (dne):
        # Never store passwords in plain text
        hashed_password = (
            bcrypt.generate_password_hash(form['password'])
            .decode('utf-8'))
        # Extract data from form
        username = form['name']
        loc = form['location']
        bio = form['description']

        # Add Basic User to database
        user = Account(
            email=user, name=username, password=hashed_password,
            location=loc, description=bio)
        session.add(user)
        session.commit()
        return ("200 - OK : Account has been created!")
    return ("404 - OK : Email is Taken")


# Route to handle User Login
"""
From Flask Login
flask_login.login_user(user, remember=False, duration=None,
force=False, fresh=True)[source]
Logs a user in. You should pass the actual user object to this.
 If the user’s is_active property is False,
  they will not be logged in unless force is True.
This will return True if the log in attempt succeeds,
and False if it fails (i.e. because the user is inactive).
Parameters:
user (object) – The user object to log in.
remember (bool) – Whether to remember the user after their session expires.
Defaults to False.
duration (datetime.timedelta) – The amount of time before
the remember cookie expires.
If None the value set in the settings is used. Defaults to None.
force (bool) – If the user is inactive, setting this to True
will log them in regardless. Defaults to False.
fresh (bool) – setting this to False will log in the user
with a session marked as not “fresh”. Defaults to True.
"""


@app.route("/api/account/login", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return ("Error - User is already logged in")
    form = request.form

    user = session.query(Account).filter_by(email=form['email']).first()
    # Account Authenthication
    if user and bcrypt.check_password_hash(user.password, form['password']):
        login_user(user)  # Remember me remember=form['remember'])
        # next_page = request.args.get('next')
        # The next_page sends back a request token that it passed auth
        return ('Login Successful')
    return ('Login Unsuccessful. Please check email and password')

# Route to Logout User
@app.route("/api/account/logout")
def logout():
    # Handled by Flask-Login, Deletes Session Cookie
    logout_user()
    return "200 OK-- Logged out"

# Route to see if user is logged
@app.route("/api/account/auth/")
@login_required
def isLoggedin():
    if current_user.is_authenticated:
        return ("User logged in")
    return("Please log in")

# Update a profile, if the auth token matches the requested update target
@app.route("/api/account/update", methods=['POST'])
def updateAccount():
    form = request.form
    # Get the current user's id, and compare to the edit target's id
    auth_token = form["auth_token"]
    curr_user_id = decode_auth_token(auth_token)

    # Update user's account information
    user = session.query(Account).filter_by(user_id=curr_user_id).first()
    user.email = form["email"]
	user.name = form["name"]
    user.description = form["description"]
    user.location = form["location"]
    password = form["password"]  # temp variable
    # check if password has been edited/is not an empty string
    if(password != NULL and password != ""):
        hashed_password = (
            bcrypt.generate_password_hash(password)
            .decode('utf-8'))
        user.password = hashed_password
    session.commit()
    return "Profile updated for " + user


if __name__ == "__main__":
    app.run()
