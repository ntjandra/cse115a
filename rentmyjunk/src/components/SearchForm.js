import React from 'react'
import Form from './Form'

class SearchForm extends Form {
    render() {
        return (
            <div>
              <h2>Search</h2>
              <form>
                <input type="text" name="search" placeholder="Search.." />
                <input type="submit" value="Search" />
              </form>
            </div>
          );
    }
}

export default SearchForm;