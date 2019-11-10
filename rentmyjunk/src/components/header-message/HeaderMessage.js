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

    render() { // TODO swap this stuff back to normal
        if (!this.loggedIn()) {
            return this.loggedInHeader();
        }
        else {
            return this.notLoggedInHeader();
        }
    }

    /**
     * Checks if a user is currently logged in, returns true or false
     */
    loggedIn() {
        // Create a new XMLHttpRequest object
        let xhr = new XMLHttpRequest();

        // Configure xhr by parameters
        xhr.open("GET", this.baseUrl + "/api/account/auth", true);

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

        console.log(xhr.response, "|", xhr.status);
        return xhr.response === "User logged in";
    }

    /**
     * Returns user's name if a user is logged in, or null if no user is logged in
     * 
     * TODO implement functionality
     */
    getUser() {
        return null;
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
        const spanStyle = {
            textDecorationLine: 'underline',
            cursor: 'pointer'
          };

        return (
            <div id="header-profile">
                Welcome, <Link to="register">name!</Link> <span style={spanStyle} onClick={() => this.logOut()}>Log Out</span>
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