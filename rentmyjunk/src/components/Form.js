import React from 'react'

class Form extends React.Component {
    /**
     * @param {string} url base url of the server (API),
     * @param {string} route route where the request should be sent,
     * @param {boolean} get False by default. If true, the request
     *      method used will be GET, POST otherwise.
     */
    constructor(url, route, get = false) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);

        this.baseUrl = url;
        if(url.endsWith("/")) {
            this.baseUrl = url.slice(0, -1);
        }

        this.route = route;
        if(!route.startsWith("/")) {
            this.route = "/" + route
        }

        this.method = get ? "GET" : "POST"
    }

    /**
     * It sends the information to the API at the specified route.
     * @param {*} event event
     */
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

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

    /**
     * You need to override this method in the children classes.
     * Don't forger to put <form onSubmit={this.handleSubmit}>
     */
    render() {
        return <p>render() method not implemented! You may be using the Form class instead of an inheriting class.</p>
    }

    /**
     * Called if the request received a success response.
     * - xhr.responseText: Returns the response as a string.
     * - xhr.responseXML: Returns the response as XML.
     * - xhr.status: Returns the status as a number (200, 404, ...)
     * - xhr.statusText: Returns the status as a string ("OK", "Not Found", ...)
     * @param {XMLHttpRequest} xhr XMLHttpRequest object
     */
    onSuccessResponse(xhr) { }

     /**
     * Called if the request received a failed response.
     * - xhr.responseText: Returns the response as a string.
     * - xhr.responseXML: Returns the response as XML.
     * - xhr.status: Returns the status as a number (200, 404, ...)
     * - xhr.statusText: Returns the status as a string ("OK", "Not Found", ...)
     * @param {XMLHttpRequest} xhr XMLHttpRequest object
     */
    onFailureResponse(xhr) { }

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
}

export default Form
