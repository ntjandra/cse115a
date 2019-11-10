import React from 'react';
import {
    Link
} from "react-router-dom";

/**
 * The message present in the header. Changes depending on the login-status of a user.
 */
class HeaderMessage extends React.Component {

    constructor(baseURL) {
        super();
        this.baseURL = baseURL;
    }

    render() {
        if (this.loggedIn()) {
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
                console.log(xhr.response);
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
                Welcome! <Link to="register">Register</Link> / <a onClick={() => this.xhrLogOut()}>Log In</a>
            </div>
        );
    }

    /**
     * Message displayed when a user IS logged in
     */
    loggedInHeader() {
        return (
            <div id="header-profile">
                Welcome, <Link to="register">name!</Link> <Link to="logout">Log Out</Link>
            </div>
        );
    }

    xhrLogOut() {
        var type = "GET";
        var route = "api/account/logout";
        var local_host_url = this.baseURL + "/";
        // Create a new XMLHttpRequest object
        let xhr = new XMLHttpRequest();

        // Configure xhr by parameters
        xhr.open(type, local_host_url + route, false);

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
                console.log(xhr.response);
            }
        };

        xhr.onerror = function () {
            console.log("Request failed");
            console.log(xhr.status);
        }
    }
}

export default HeaderMessage