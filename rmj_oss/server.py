from database_setup import Base, RentPost
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


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
@app.route("/", methods=['GET', 'POST'])
def home():
    if request.method == "POST":
        return "Received POST"
    elif request.method == "GET":
        return "Received GET"


# Adds new RentPosts to the database
@app.route("/api/create-post", methods=['POST'])
def create_post():

    form = request.form

    print(form)

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
    print('New ID: ' + str(new_post.id)) # Prints this post's ID

    return str(new_post.id)


# Returns a post matching the given id, if post exists
@app.route("/api/get-post", methods=['GET', 'POST'])
def get_post():
    # Get post_id as an integer
    print(request.form)
    post_id = request.form['post_id']
    if not representsInt(post_id):
        return str('Error - Invalid post ID format. Must be an integer.')
    post_id = int(post_id)

    # Existence check
    dne = session.query(RentPost).filter_by(id=post_id).scalar() is None
    if dne:
        return str('Error - Requested post ID does not exist.')

    # Return post's values
    post = session.query(RentPost).filter_by(id=post_id).one()
    return jsonify(post.serialize())


if __name__ == "__main__":
    app.run()
