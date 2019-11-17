import React from "react";
import Form from "./Form";

import 'bootstrap/dist/css/bootstrap.min.css';

class SearchForm extends Form {
  /**
   * @param {string} url base url of the server (API),
   */
  constructor(url) {
    super(url, "unset", true);
  }

  handleSubmit(event) {
    const data = new FormData(event.target);
    // First request
    let contentResult = "";
    const content = data.get("search");
    this.route = "/api/search/item/" + content;
    var xhr = new XMLHttpRequest();
    // Listeners
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // success
          contentResult = xhr.responseText;
        } else {
          // fail
          contentResult = xhr.statusText;
        }
      }
    };
    xhr.open(this.method, this.baseUrl + this.route, true);
    xhr.send(data);

    // Second request
    let placeResult = "";
    const place = data.get("place");
    if (place !== "") {
      this.route = "/api/search/place/" + place;
      xhr = new XMLHttpRequest();
      // Listeners
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // success
            placeResult = xhr.responseText;
          } else {
            // fail
            placeResult = xhr.statusText;
          }
        }
      };
      xhr.open(this.method, this.baseUrl + this.route, true);
      xhr.send(data);
    }

    // TODO: do something with the results
    // I can't do it because I need the DB to be populated
    console.log(contentResult);
    console.log(placeResult);
  }

  render() {
    return (
      <div class="col-lg-6 offset-2">
        <h2>Search</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Search:</label>
            <input id="title" name="title" type="text" className="form-control" placeholder="Search... (required)" required/>
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input id="title" name="place" type="text" className="form-control" placeholder="Place... (optional)" />
          </div>
          <div className="form-group">
              <input type="submit" name="submit" value="Search" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchForm;
