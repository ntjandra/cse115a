from database_setup import Base, RentPost, Account
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS
import sys
import pprint

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
@app.route("/api/edit-post", methods=['GET', 'POST'])
def home():
#    print('hello world', file=sys.stderr)
#    sys.stdout.flush()
    if request.method == "POST":
#        print(request.form['price'])
        print(request.values)
        sys.stdout.flush()
        return "Received POST"
    elif request.method == "GET":
	    return "Received GET"


# Adds new RentPosts to the database
@app.route("/api/create-post", methods=['POST'])
def create_post():

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

    return str(new_post.id)

# Returns a post matching the given id, if post exists
@app.route("/api/get-post", methods=['GET', 'POST'])
def get_post():
    # Get post_id as an integer
    post_id = request.form["post_id"]
    if not representsInt(post_id):
        return str('Error - Invalid post ID format. Must be an integer.')
    post_id = int(post_id)

    # Existence check
    dne = session.query(RentPost).filter_by(id=post_id).scalar() is None
    if dne:
        return str('Error - Requested post ID does not exist.')
    post = session.query(RentPost).filter_by(id=post_id).one()
    return jsonify(post.serialize())
    
# Returns a json contaiining the default of all posts.
@app.route("/api/search/", methods=['GET'])
def search():
    # Get all posts
    posts = session.query(RentPost)
    return jsonify(search=[post.serialize() for post in posts])

# Returns a json of posts that contain a filter
# Returns all posts who have a particular address listed as one of their locations
@app.route("/api/search/place/<string:place>", methods=['GET'])
def search_place(place):
    # the in_ method is the wildcard for contains anywhere.
    places = session.query(RentPost).filter_by(location=place).order_by(RentPost.id).all() 
    return jsonify(place=[post.serialize() for post in places])

# Returns all posts who have a particular word in their post title
@app.route("/api/search/item/<string:item>", methods=['GET'])
def search_item(item):
    # the in_ method is the wildcard for contains anywhere.
    #  items = session.query(RentPost).filter_by(title=item).order_by(RentPost.id).all() 
    # Testing lenience
    items = session.query(RentPost).filter(RentPost.title.contains(item))

    return jsonify(item=[post.serialize() for post in items])

# Add DRY here to do (column, search)
@app.route("/api/search/<string:column>/<string:value>", methods=['GET'])
def searchPost(column, value):
    # WANT TO HAVE A REDIRECT IF COLUMN DNE
    #  if column dne:
        #  return redirect(url_for('home'))
    if (column == "description"):
        results = session.query(RentPost).filter(RentPost.description.contains(value)).all()
        return jsonify(results=[post.serialize() for post in results])

    elif (column == "id"):
        result = session.query(RentPost).filter_by(id=value).first()  # Single page by ID
        if result == None:  # Special Error Handling for Keys
            return "404-Page Result not found"
        return jsonify(post=result.serialize())
    else:
        return "404-Page not Found" 

# Given a post's id, checks for existence and then deletes post
@app.route("/api/delete-post", methods=['POST'])
def deletepost():
    post_id = request.form["post_id"]

    # Existence check
    dne = session.query(RentPost).filter_by(id=post_id).scalar() is None
    if dne:
        return str('Error - Requested post ID does not exist.')

    post_to_delete = session.query(RentPost).filter_by(id=post_id).one()
    post_title = post_to_delete.title
    session.delete(post_to_delete)
    session.commit()
    return "Deleted ID: " + post_id + ", TITLE: " + post_title

if __name__ == "__main__":
    app.run()
