from database_setup import Base, RentPost
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from flask import Flask, render_template, request, redirect, url_for
from flask_cors import CORS
import sys

app = Flask(__name__)
CORS(app)


# Connect to Database and create database session
engine = create_engine('sqlite:///site.db')
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()

# Home Route - Returns recent posts
@app.route("/", methods=['GET', 'POST'])
def home():
    if request.method == "POST":
#        print(request.form['price'])
#        print(request.values)
#        sys.stdout.flush()
        return "Received POST"
    elif request.method == "GET":
	    return "Received GET"
		
# Returns a post matching the given id, if post exists
@app.route("/api/get-post", methods=['GET', 'POST'])
def get_post():
    return None
	
# Given a post's id, checks for existence and then updates all fields w/ the new info 
@app.route("/api/edit-post", methods=['GET', 'POST'])
def editpost():
    post_id = request.form["postid"]
#    post_id = int(post_id)
#    print(post_id)
#    sys.stdout.flush()
    # Existence check
    dne = session.query(RentPost).filter_by(id=post_id).scalar() is None
    if dne:
        return str('Error - Requested post ID does not exist.')
    post_to_edit              = session.query(RentPost).filter_by(id=post_id).one()
    post_to_edit.title        = request.form['title']
    post_to_edit.description  = request.form['descr']
    post_to_edit.location     = request.form['location']
    post_to_edit.contactinfo  = request.form['contact']
    post_to_edit.price        = request.form['price']
    session.commit()
    return "Edited ID: " + post_id + ", TITLE: " + post_to_edit.title

if __name__ == "__main__":
    app.run()
