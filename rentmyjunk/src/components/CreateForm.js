import React from 'react'
import Form from './Form'
import JWTActions from '../JWTActions'

import 'bootstrap/dist/css/bootstrap.min.css';

class PostForm extends Form {
    render() {
        return (
            <div className="col-lg-6">
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
     * It sends the information to the API at the specified route.
     * @param {*} event event
     */
    handleSubmit(event) {
        var actions = new JWTActions();

        event.preventDefault();
        const data = new FormData(event.target);
        var author_id = actions.getUser();
        data.append("author_id", author_id);

        var xhr = new XMLHttpRequest();

        // Listeners
        let self = this; // used to call instance's methods in listener
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 0) {
                // After you have created the XMLHttpRequest object,
                // but before you have called the open() method.

            } else if (xhr.readyState === 1) {
                // After you have called the open() method, but before
                // you have called send().

            } else if (xhr.readyState === 2) {
                // After you have called send().

            } else if (xhr.readyState === 3) {
                // After the browser has established a communication with
                // the server, but before the server has completed the response.

            } else if (xhr.readyState === 4) {
                // After the request has been completed, and the response
                // data has been completely received from the server.
                if (xhr.status === 200) {
                    self.onSuccessResponse(xhr);
                } else {
                    self.onFailureResponse(xhr);
                }
            }
        };

        xhr.open(this.method, this.baseUrl + this.route, true);
        xhr.send(data);
    }

    /**
     * Redirects to newly created post page upon a successful post creation
     */
    onSuccessResponse(xhr) {
        var response = xhr.responseText;
        if (isNaN(response)) {
            alert(response);
        }
        else {
            window.location.pathname = "/post" + xhr.responseText;
        }
    }
}

export default PostForm;