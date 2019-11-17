import React, { Component } from 'react'

class Post extends Component {

    render() {
        let p = this.props.post;
        return (
            <div id={p.id} class="post">
                <h4> { p.title } </h4>
                <p>  { p.description } </p>
                <p class="details">Available at {p.location}, for {p.price}. Contact: {p.contactinfo}</p>
            </div>
        )
    }
}

export default Post