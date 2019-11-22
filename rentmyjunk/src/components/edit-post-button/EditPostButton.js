import React from 'react'

class EditPostButton extends React.Component {

    gotoEditPost() {
        window.location.pathname = "/editpost" + this.props.post_id;
    }

    render() {
        return <button className="btn btn-primary" onClick={() => this.gotoEditPost()}>Edit Post</button>
    }
}

export default EditPostButton
