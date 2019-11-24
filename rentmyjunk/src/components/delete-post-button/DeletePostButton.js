import React from 'react'
import JWTActions from "../../JWTActions"

class DeletePostButton extends React.Component {

    /**
     * Makes generic xhr, defined by parameters.
     *
     * @param {String} type - Type of connection (POST, GET, etc)
     * @param {String} route - Route in database where request will be made
     * @param {FormData} data - Data to be sent to the database within xhr
     *
     * TODO Revise at some point in the future if needed
     */
    xhrSend(type, route, data) {
        // Create a new XMLHttpRequest object
        let xhr = new XMLHttpRequest();

        // Configure xhr by parameters
        xhr.open(type, this.props.url + route, false);

        data = new FormData();
        var actions = new JWTActions();
        var curr_user_JSON = actions.getUser(this.props.url);
        var curr_user = actions.getParsedJSON(curr_user_JSON);
        data.append("curr_user_id", curr_user.user_id);

        // Send the request over the network
        xhr.send(data);

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
        return xhr.response;
    }

    /**
     *  Calls xhr for deleting posts 
     */
    deletePost() {

        // Send xhr
        var response = this.xhrSend('POST', 'api/post/delete/' + this.props.post_id, null);

        // Redirect and return response
        window.location.pathname = "/";
        return response;
    }

    render() {
        return <button className="btn btn-primary" onClick={() => this.deletePost()}>Delete Post</button>
    }
}

export default DeletePostButton
