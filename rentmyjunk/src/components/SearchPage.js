import React, { Component } from 'react'

import SearchForm from "./SearchForm.js";
import Post from "./Post.js"

class SearchPage extends Component {

    state = { searchResults: [], query: ""}

    callbackFunction = (query, results) => {
        this.setState(
            {
                searchResults: results,
                query: query
            }
        );
    }

    render() {
        let s = this.state;
        return (
            <div className="col-lg-6">
                <SearchForm key="-1" url={this.props.url} parentCallback={this.callbackFunction} />

                <h2>Results</h2>
                <div>
                    {s.searchResults.length ? <em>Results for: "s.query"</em> : ""}
                    {
                        s.searchResults.length ? s.searchResults.map((post, index) => {
                            return <Post key={index} post={post} />
                        }) : <p>No results.</p>
                    }
                </div>
            </div>
        );
    }
}

export default SearchPage;