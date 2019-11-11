import React from 'react'
import Form from './Form'
import JWTActions from '../JWTActions'
import Cookies from 'js-cookie'

class EditProfile extends Form {

    /**
     * @param {String} name Username associated with this profile
     */
    constructor(baseURL, route, name) {
        super(baseURL, route);
        this.baseURL = baseURL;
        this.name = name;
        this.actions = new JWTActions();
        var user_JSON = this.getUserByName(this.baseURL, this.name)
        this.user = this.actions.getParsedJSON(user_JSON);
        console.log(user_JSON);
    }

    getUserByName(baseURL, name) {
        // Create a new XMLHttpRequest object
        let xhr = new XMLHttpRequest();

        // Configure xhr by parameters
        var route = this.baseURL + "api/account/get/name/" + this.name;
        xhr.open("GET", route, false);

        // Send the request over the network
        xhr.send();

        // This will be called after the response is received
        xhr.onload = function () {
            if (xhr.status !== 200) {
                // analyze HTTP status of the response
                console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
            } else {
                // show the result
                console.log(`Done, got ${xhr.response.length} bytes`); // responseText is the server
            }
        };

        xhr.onerror = function () {
            console.log("Request failed");
            console.log(xhr.status);
        };

        return xhr.response;
    }

    /**
     * Overwrite to send auth token and edit target's ID
     */
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // Add auth token and name
        data.append("auth_token", Cookies.get("auth_token"));
        data.append("target_id", this.user.user_id);

        var xhr = new XMLHttpRequest();

        // Listeners
        let self = this; // used to call instance's methods in listener
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 0) {
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
                if(xhr.status  === 200) {
                    self.onSuccessResponse(xhr);
                } else {
                    self.onFailureResponse(xhr);
                }
            }
        };

        xhr.open(this.method, this.baseUrl + this.route, true);
        xhr.send(data);
    }

    render() {
        if (!this.user) {
            return <h2>User not found</h2>;
        }
        return (
            <div className="col-lg-6">
                <h2>Edit Profile for {this.user.name}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <textarea id="description" name="description" type="text" rows="5" className="form-control" placeholder={this.user.description} required />
                    </div>
                    <div className="form-group">
                        <label>Location: </label>
                        <input id="location" name="location" type="text" className="form-control" placeholder={this.user.location} required />
                    </div>
                    <div className="form-group">
                        <input type="submit" name="submit" value="Save changes" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }

    onSuccessResponse(xhr) {
        if (xhr.response == "You cannot edit this profile") {
            alert(xhr.response);
        }
        else {
            alert("Profile updated!")
            // window.location.pathname = "/profile" + this.name;
        }
    }
}

export default EditProfile