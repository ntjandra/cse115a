import React from 'react'
import Form from './Form'

import 'bootstrap/dist/css/bootstrap.min.css';

class PostForm extends Form {
    render() {
        return (
            <div className="col-lg-6 offset-2">
                <h2>Create a post</h2>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Product Title: </label>
                        <input id="title" name="title" type="text" className="form-control" placeholder="Your junk" required />
                    </div>
                    <div className="form-group">
                        <label>Product Description: </label>
                        <textarea id="description" name="description" type="text" className="form-control" rows="5" placeholder="Details about your junk: damages, pick up location, ..." required />
                    </div>
                    <div className="form-group">
                        <label>Contact Information: </label>
                        <input id="contact" name="contact" type="text" className="form-control" placeholder="Email or phone number" required />
                    </div>
                    <div className="form-group">
                        <label>Location: </label>
                        <input id="location" name="location" type="text" className="form-control" placeholder="Santa Cruz Westside" required />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input id="price" name="price" type="number" className="form-control" placeholder="Price in $" required />
                    </div>
                    <div className="form-group">
                        <input type="submit" name="submit" value="Create a post" className="btn btn-primary" required />
                    </div>
                </form>
            </div>
        )
    }

    /**
     * Redirects to newly created post page upon a successful post creation
     */
    onSuccessResponse(xhr) {
        window.location.pathname = "/post" + xhr.responseText;
    }
}

export default PostForm;