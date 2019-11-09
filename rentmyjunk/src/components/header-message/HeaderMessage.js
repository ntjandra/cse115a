import React from 'react';
import {
    Link
  } from "react-router-dom";

/**
 * The message present in the header. Changes depending on the login-status of a user.
 */
class HeaderMessage extends React.Component {

    // constructor() {
    //     super();
    // }

    render() {
        if (this.getUser() === null) {
            return this.notLoggedIn();
        }
        else {
            return this.loggedIn();
        }
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
    notLoggedIn() {
        return(
            <div id="header-profile">
                Welcome! <Link to="register">Register</Link>/<Link to="login">Log In</Link>
            </div>
        );
    }

    /**
     * Message displayed when a user IS logged in
     */
    loggedIn() {
        return <p>Not implemented</p>;
    }
}

export default HeaderMessage