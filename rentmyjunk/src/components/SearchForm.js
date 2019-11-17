import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

class SearchForm extends Component{

  constructor(props){
    super(props)
    this.baseUrl = this.props.url;
  }

  sendData(data) {
    this.props.parentCallback(data);
  }

  onClick() {
    let data = [{
        "contactinfo": "email@address.com",
        "description": "description for the first posting for the demo",
        "id": 1,
        "location": "santa cruz",
        "price": "lotta money",
        "title": "my first posting"
    },
    {
        "contactinfo": "my info",
        "description": "a posting",
        "id": 2,
        "location": "australia",
        "price": "a couple bucks",
        "title": "postA"
    }]
    this.sendData(data);
  }

  render() {
    return (
      <div>
        <h2>Search</h2>
        <div className="form-group">
          <label>Search:</label>
          <input id="title" name="title" type="text" className="form-control" placeholder="Search... (required)" required/>
        </div>
        <div className="form-group">
            <button className="btn btn-primary" onClick={() => this.onClick()}>Search</button>
        </div>
      </div>
    );
  }
}

export default SearchForm;
