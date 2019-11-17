import React, { Component } from 'react'

import SearchForm from "./SearchForm.js";
import Post from "./Post.js"

class SearchPage extends Component {

    state = { searchResults: [] }

    callbackFunction = (data) => {
        this.setState({searchResults: data});
    }

    render() {
        let r = this.state.searchResults;
        return (
            <div className="col-lg-6">
                <SearchForm key="-1" url={this.props.url} parentCallback={this.callbackFunction} />

                <h2>Results</h2>
                <div>
                    {
                        r.length ? this.state.searchResults.map((post, index) => {
                            return <Post key={index} post={post} />
                        }) : <p>No results.</p>
                    }
                </div>
            </div>
        );
    }
}

export default SearchPage;