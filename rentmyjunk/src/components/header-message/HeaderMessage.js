import React from 'react';
import {
    Link
} from "react-router-dom";
import Cookies from 'js-cookie';

/**
 * The message present in the header. Changes depending on the login-status of a user.
 */
class HeaderMessage extends React.Component {

    constructor(baseURL) {
        super();
        this.baseURL = baseURL;
    }

    /**
     * Checks if a user is currently logged in, returns true or false
     * If curr_user_JSON is not a JSON, no user is logged in
     */
    loggedIn() {
        try {
            JSON.parse(this.curr_user_JSON);
        } catch (e) {
            return false;
        }
        return true;
    }

    /**
     * Sends the auth token to backend, and saves result
     */
    getUser() {
        // Create a new XMLHttpRequest object
        let xhr = new XMLHttpRequest();

        // Configure xhr by parameters
        console.log(this.baseURL + "api/account/auth");
        xhr.open("POST", this.baseURL + "api/account/auth", false);

        // Send the request over the network
        var data = new FormData();
        data.append("auth_token", Cookies.get("auth_token"));
        xhr.send(data);

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
        this.curr_user_JSON = this.getUser();
        if (this.loggedIn()) {
            return this.loggedInHeader();
        }
        else {
            return this.notLoggedInHeader();
        }
    }

    /**
     * Message displayed when no user is logged in
     */
    notLoggedInHeader() {
        return (
            <div id="header-profile">
                Welcome! <Link to="register">Register</Link> / <Link to="login">Log In</Link>
            </div>
        );
    }

    /**
     * Message displayed when a user IS logged in
     */
    loggedInHeader() {
        var curr_user = JSON.parse(this.curr_user_JSON);

        const spanStyle = {
            textDecorationLine: 'underline',
            cursor: 'pointer'
          };

        return (
            <div id="header-profile">
                Welcome, <Link to="profile">{ curr_user.name }</Link>! <span style={spanStyle} onClick={() => this.logOut()}>Log Out</span>
            </div>
        );
    }

    // Deletes the JWT used for authenticating login
    logOut() {
        Cookies.remove("auth_token");
        window.location.reload();
    }
}

export default HeaderMessage