import React from "react";
import Form from "./Form";

class SearchForm extends Form {
  /**
   * @param {string} url base url of the server (API),
   */
  constructor(url) {
    super(url, "unset");
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
      <div>
        <h2>Search</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="search" placeholder="Search..." required />
          <input type="text" name="place" placeholder="Place..." />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

export default SearchForm;
