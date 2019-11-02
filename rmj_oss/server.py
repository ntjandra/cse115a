from database_setup import Base, RentPost
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from flask import Flask, render_template, request, redirect, url_for
from flask_cors import CORS
import sys
import pprint

app = Flask(__name__)
CORS(app)


# Connect to Database and create database session
engine = create_engine('sqlite:///site.db')
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


if __name__ == "__main__":
    app.run()
