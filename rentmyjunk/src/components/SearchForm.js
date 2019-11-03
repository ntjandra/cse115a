import React from 'react'
import Form from './Form'

class SearchForm extends Form {

  /**
   * @param {string} url base url of the server (API),
   */
  constructor(url) {
    super(url, "unset")
  }

  handleSubmit(event) {
    const data = new FormData(event.target);
    const content = data.get("search");
    this.route = "/api/search/item/" + content;

    super.handleSubmit(event);
  }

  render() {
      return (
          <div>
            <h2>Search</h2>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="search" placeholder="Search..." required />
              <input type="submit" value="Search" />
            </form>
          </div>
        );
  }
}

export default SearchForm;