import Cookies from "js-cookie";

/* -------------------------------
   JWT Functions
------------------------------- */

class JWTActions {

    /**
     * Checks if a user is currently logged in, returns true or false
     * If curr_user_JSON is not a JSON, no user is logged in
     */
    loggedIn(curr_user_JSON) {
        try {
            JSON.parse(curr_user_JSON);
        } catch (e) {
            return false;
        }
        return true;
    }

    getParsedJSON(user_JSON) {
        try {
            return JSON.parse(user_JSON);
        } catch (e) {
            return false;
        }
    }

    /**
     * Sends the auth token to backend, and saves result
     * 
     * @param {String} local_host_url URL for server
     */
    getUser(local_host_url) {
        // Create a new XMLHttpRequest object
        let xhr = new XMLHttpRequest();

        // Configure xhr by parameters
        xhr.open("POST", local_host_url + "api/account/auth", false);

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
}

export default JWTActions