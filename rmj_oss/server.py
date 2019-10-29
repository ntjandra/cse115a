from database_setup import Base, RentPost
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from flask import Flask, render_template, request, redirect, url_for
from flask_cors import CORS

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
        return "Received POST"
    elif request.method == "GET":
        return "Received GET"

@app.route("/api/create-post", methods=['POST'])
def create_post():

    form = request.form

    # Extract data from form
    title = form['title']
    print(title)
    descr = form['description']
    print(descr)
    contact = form['contact']
    print(contact)
    loc = form['location']
    print(loc)
    price = form['price']
    print(price)

    # Add post to database
    

    return "Post added"


if __name__ == "__main__":
    app.run()
