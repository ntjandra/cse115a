import React, { Component } from 'react'
// For testing purposes
import PostData from '../data/posts.json'

class PostList extends Component {
    render() {
        /* Renders an HTML Page
           Containing Post Title, and description */
        return (
            <div>
                <h1> Search Results </h1>
                { PostData.map((result, index) => {
                    return <div>
                        <h1> { result.title } </h1>
                        <p> { result.description } </p>
                    </div>
                })}
            </div>
        )
    }
}

export default RentPost