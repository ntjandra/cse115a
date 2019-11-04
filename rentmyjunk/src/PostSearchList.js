import React, { Component } from 'react'
// For testing purposes
import PostData from './data/posts.json'

class PostList extends Component {
    render() {
        /* Renders an HTML Page
           Containing Post Title, and description */
        return (
            <div>
                <h1> Search Results </h1>
                { PostData.map((search, index) => {
                    return <div>
                        <h1> { search.title } </h1>
                        <p> { search.description } </p>
                    </div>
                })}
            </div>
        )
    }
}

export default RentPost