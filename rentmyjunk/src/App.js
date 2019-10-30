import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

var local_host_url = "http://127.0.0.1:5000/";

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
            <li>
              <Link to="/search">Search</Link>
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
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function getData() {
  // 1. Create a new XMLHttpRequest object
  let xhr = new XMLHttpRequest();

  // 2. Configure it: GET-request for the URL /article/.../load
  xhr.open("POST", local_host_url, false);

  // 3. Send the request over the network
  xhr.send();

  // 4. This will be called after the response is received
  xhr.onload = function() {
    if (xhr.status !== 200) {
      // analyze HTTP status of the response
      console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else {
      // show the result
      console.log(`Done, got ${xhr.response.length} bytes`); // responseText is the server
      console.log(xhr.response);
    }
  };

  xhr.onerror = function() {
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

function Search() {
  return (
    <div>
      <h2>Search</h2>
      <form>
        <input type="text" name="search" placeholder="Search.." />
        <input type="submit" value="Search" />
      </form>
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
  return (
    <div>
      <h2>Create Post</h2>
      <form>
        <div className="form-group">
          <label>Product Title: </label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label>Product Description: </label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label>Contact Information: </label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label>Location: </label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label>Price: </label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Post"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
