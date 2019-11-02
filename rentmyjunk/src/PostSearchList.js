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
                        <h1> { RentPost.title } </h1>
                        <p> { RentPost.description } </p>
                    </div>
                })}
            </div>
        )
    }
}