import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

class SearchForm extends Component{

  constructor(props){
    super(props)

    this.searchInput = "";

    // This is important so that we can use "this" in these functions
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  sendData(data) {
    this.props.parentCallback(this.searchInput, data);
  }

  onClick() {
    let url = this.props.url;
    if(this.searchInput === "") {
      url += "api/search/"
    } else {
      url += "api/search/item/" + this.searchInput;
    }

    let self = this;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          self.sendData(JSON.parse(xhr.responseText));
        } else {
          self.sendData([xhr.statusText]);
        }
      }
    }
    xhr.open("GET", url, true);
    xhr.send();
  }

  handleChange(e) {
    this.searchInput = e.target.value;
  }

  handleKeyPress(e) {
    if(e.charCode === 13){
      // Enter clicked
      this.onClick();
    }
  }

  render() {
    return (
      <div>
        <h2>Search</h2>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Search... (required)" onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
        </div>
        <div className="form-group">
            <button className="btn btn-primary" onClick={this.onClick}>Search</button>
        </div>
      </div>
    );
  }
}

export default SearchForm;
