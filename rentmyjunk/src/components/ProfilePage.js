import React from 'react'
import JWTActions from '../JWTActions'

class ProfilePage extends React.Component {

    /**
     * 
     * @param {String} name Username associated with this profile
     */
    constructor(baseURL, name) {
        super();
        this.baseURL = baseURL;
        this.name = name;
        this.user_JSON = this.getUserByName();
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

    render() {
        if (this.user_JSON === "User not found") {
            return <h2>User {this.name} not found.</h2>
        }
        else {
            var user = JSON.parse(this.user_JSON);
            return this.renderProfile(user);
        }
    }

    renderProfile(user) {
        return (
            <div>
                <h2>{user.name}</h2>
                <p>{user.description}</p>
                <p><strong>Location: </strong>{user.location}</p>
                {this.editRedirect(user)}
            </div>
        );
    }

    editRedirect(user) {
        var actions = new JWTActions();
        var curr_user_JSON = actions.getUser(this.baseURL);

        // Check if logged in and this profile page and this user are the same
        console.log(curr_user_JSON);
        var curr_user = actions.getParsedJSON(curr_user_JSON);
        if (!curr_user) {
            return "";
        }
        else {
            if (user.name === curr_user.name) {
                return (
                    <button className="btn btn-primary"
                        onClick={() => window.location.pathname = "/editprofile" + this.name}>
                        Edit Profile
                    </button>
                );
            }
        }

        return "";
    }
}

export default ProfilePage