import React from "react";
import Form from "./Form";

import 'bootstrap/dist/css/bootstrap.min.css';

class RegisterAccount extends Form {

    render() {
        return (
            <div className="col-lg-6">
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input id="email" name="email" type="text" className="form-control" placeholder="Example: yourname@email.com" required />
                    </div>

                    <div className="form-group">
                        <label>Username: </label>
                        <input id="name" name="name" type="text" className="form-control" placeholder="Example: YourName123" required />
                    </div>

                    <div className="form-group">
                        <label>Password: </label>
                        <input id="password" name="password" type="password" className="form-control" placeholder="Example: YourName123" required />
                    </div>

                    {/* May need to refactor to dropdown/select locations */}
                    <div className="form-group">
                        <label>Location: </label>
                        <input id="location" name="location" type="text" className="form-control" placeholder="Example: YourName123" />
                    </div>

                    <div className="form-group">
                        <label>Bio: </label>
                        <textarea id="description" name="description" type="text" rows="5" className="form-control" placeholder="Say something about yourself!" />
                    </div>

                    <div className="form-group">
                        <input type="submit" name="submit" value="Register" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }

    /**
     * Redirects to login page upon a successful post creation
     * 
     * TODO alert user of successful account creation
     */
    onSuccessResponse(xhr) {
        if (isNaN(xhr.response)) {
            alert(xhr.response);
        }
        else {
            window.location.pathname = "/login";
        }
    }
}

export default RegisterAccount;
