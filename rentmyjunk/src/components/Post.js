import React, { Component } from 'react'

class Post extends Component {

    isDict(v) {
        return typeof v==='object' && v!==null && !(v instanceof Array) && !(v instanceof Date);
    }

    render() {
        let p = this.props.post;

        if (this.isDict(p)) {
            return (
                <div id={p.id} className="post">
                    <h4> { p.title } </h4>
                    <p>  { p.description } </p>
                    <p className="details">Available at {p.location}, for {p.price}. Contact: {p.contactinfo}</p>
                </div>
            )
        } else {
            return <p>Internal error: {p}</p>
        }
    }
}

export default Post