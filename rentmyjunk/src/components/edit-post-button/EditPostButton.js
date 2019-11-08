import React from 'react'

class EditPostButton extends React.Component {

    /**
     * Minor, but may need to be expanded in the future for determining visibility
     * based on user authentication status
     * 
     * @param {Integer} post_id The post ID to be deleted
     * @param {String} local_host_url URL for the server
     */
    constructor(post_id) {
        super();
        this.post_id = post_id;;
    }

    gotoEditPost() {
        console.log("testing")
        window.location.pathname = "/editpost" + this.post_id;
    }

    render() {
        return <button onClick={() => this.gotoEditPost()}>Edit Post</button>
    }
}

export default EditPostButton
