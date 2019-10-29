import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import PostForm from "./components/PostForm"

var local_host_url = 'http://127.0.0.1:5000/';

/* -------------------------------
   HTML Components
------------------------------- */

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/createpost">Create</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/createpost">
            <CreatePost />
          </Route>
          <Route path="/post:post_id">
            <PostInfo />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

/**
 * Just for testing purposes
 */
function getData() {
  // 1. Create a new XMLHttpRequest object
  let xhr = new XMLHttpRequest();

  // 2. Configure it: GET-request for the URL /article/.../load
  xhr.open('POST', local_host_url, false);

  // 3. Send the request over the network
  xhr.send();

  // 4. This will be called after the response is received
  xhr.onload = function () {
    if (xhr.status !== 200) { // analyze HTTP status of the response
      console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
      console.log(`Done, got ${xhr.response.length} bytes`); // responseText is the server
      console.log(xhr.response)
    }
  };

  xhr.onerror = function () {
    console.log("Request failed");
    console.log(xhr.status);
  };

  console.log(xhr.response, "|", xhr.status);
  return xhr.response;
}

function Home() {

  var myStatus = getData();

  return (
    <div>
      <h2>Homes</h2>
      <div>
        {myStatus}
        <br />
        Woah
      </div>
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

/* Create Post Component */
function CreatePost() {
  let form = new PostForm(local_host_url, '/api/create-post');
  return form.render();
}

/* Displays info for specific post, by ID */
function PostInfo() {
  let { post_id } = useParams();
  return <h1>{post_id}</h1>
}


/* -------------------------------
   XHR Functions
------------------------------- */

/**
 * Makes generic xhr, defined by parameters.
 *
 * @param {String} type - Type of connection (POST, GET, etc)
 * @param {String} route - Route in database where request will be made
 * @param {*} data - Data to be sent to the database within xhr
 * 
 * TODO Revise at some point in the future if needed
 */
function xhrSend(type, route, data) {
  // Create a new XMLHttpRequest object
  let xhr = new XMLHttpRequest();

  // Configure xhr by parameters
  xhr.open(type, local_host_url + route, false);

  // Send the request over the network
  xhr.send(data);

  // This will be called after the response is received
  xhr.onload = function () {
    if (xhr.status !== 200) { // analyze HTTP status of the response
      console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
      console.log(`Done, got ${xhr.response.length} bytes`); // responseText is the server
      console.log(xhr.response)
    }
  };

  xhr.onerror = function () {
    console.log("Request failed");
    console.log(xhr.status);
  };

  console.log(xhr.response, "|", xhr.status);
  return xhr.response;
}
