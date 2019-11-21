import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

class SearchForm extends Component{



  state = { filter: "title"}

  constructor(props){
    super(props)

    this.searchInput = "";

    // This is important so that we can use "this" in these functions
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);

    this.FILTERS = ["title", "description", "location"]
    this.filter = this.FILTERS.TITLE;
  }

  sendData(data) {
    this.props.parentCallback(this.searchInput, data);
  }

  onClick() {
    let url = this.props.url;
    if(this.searchInput === "") {
      url += "api/search/"
    } else {
      url += "api/search/" + this.state.filter + "/" + this.searchInput;
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

  onFilterClick(e) {
    this.setState({
      filter: e.currentTarget.name
    });
  }

  render() {
    let filters = this.FILTERS;
    return (
      <div>
        <h2>Search</h2>
          <div className="form-group">
            <input type="text" className="form-control" placeholder={"Search by " + this.state.filter} onChange={this.handleChange} />
          </div>
          <DropdownButton id="dropdown-item-button" title="Filter">
            {
              filters.map((filter, index) => {
                return this.state.filter === filter ?
                  <Dropdown.Item key={index} name={filter} onClick={this.onFilterClick} as="button" active>Search by {filter}</Dropdown.Item>
                  : <Dropdown.Item key={index} name={filter} onClick={this.onFilterClick} as="button">Search by {filter}</Dropdown.Item>
              })
            }
          </DropdownButton>
          <br></br>
          <div className="form-group">
              <button className="btn btn-primary" onClick={this.onClick}>Search</button>
          </div>
      </div>
    );
  }
}

export default SearchForm;
