import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import EditForm from "./components/EditForm";
import PostForm from "./components/CreateForm";
import SearchForm from "./components/SearchForm.js";
import EditPostButton from "./components/edit-post-button/EditPostButton";

import RegisterAccount from "./components/RegisterAccount"
import LogIn from "./components/LogIn"
import LogOut from "./components/LogOut"
import ProfilePage from "./components/ProfilePage"
import EditProfile from "./components/EditProfile"

var local_host_url = "http://127.0.0.1:5000/";

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
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/* Pages related to posts */}
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/editpost:post_id">
            <EditPost />
          </Route>
          <Route path="/post:post_id">
            <PostInfo />
          </Route>
          <Route path="/createpost">
            <CreatePost />
          </Route>
          <Route path="/search">
            <Search />
          </Route>

          {/* Pages related to accounts */}
          <Route path="/register">
            <RegisterRoute />
          </Route>
          <Route path="/login">
            <LogInRoute />
          </Route>
          <Route path="/logout">
            <LogOutRoute />
          </Route>
          <Route path="/profile:profile_id">
            <ProfileRoute />
          </Route>
          <Route path="/editprofile:profile_id">
            <EditProfileRoute />
          </Route>

          {/* Home */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Homes</h2>
      <div>
        content
      </div>
    </div>
  );
}

function Search() {
  let form = new SearchForm(local_host_url);
  return form.render();
}

/**
 * About Component
 */
function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

/**
 * Edit Post Component
 */
function EditPost() {
  let { post_id } = useParams();
  let form = new EditForm(local_host_url, "/api/post/update/" + post_id);
  return form.render();
}

/**
 * Create Post Component
 */
function CreatePost() {
  let form = new PostForm(local_host_url, '/api/post/new');
  return form.render();
}

/**
 * Displays info for specific post, by ID
 *
 * TODO Add styling
 */
function PostInfo() {
  let { post_id } = useParams();
  let editPostBtn = new EditPostButton(post_id);

  var post_data = xhrSend("GET", "api/search/id/" + post_id, null);

  // If post doesn't exist, display error
  if (post_data === "404-Page Result not found") {
    return <h1>{post_data}</h1>;
  }

  // // Post exists
  var post = JSON.parse(post_data).post;
  console.log(post);
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p>Contact Info: {post.contactinfo}</p>
      <p>Location: {post.location}</p>
      <p>Price: {post.price}</p>
      { editPostBtn.render() }
    </div>
  );
}

/* -------------------------------
 * Account Pages
 ------------------------------- */
 function RegisterRoute() {
   let registerAct = new RegisterAccount();
   return registerAct.render();
 }

 function LogInRoute() {
   let logIn = new LogIn();
   return logIn.render();
 }

 function LogOutRoute() {
  let logOut = new LogOut();
  return logOut.render();
}

function ProfileRoute() {
  let profilePage = new ProfilePage();
  return profilePage.render();
}

function EditProfileRoute() {
  let editProfile = new EditProfile();
  return editProfile.render();
}

/* -------------------------------
   XHR Functions
------------------------------- */

/**
 * Makes generic xhr, defined by parameters.
 *
 * @param {String} type - Type of connection (POST, GET, etc)
 * @param {String} route - Route in database where request will be made
 * @param {FormData} data - Data to be sent to the database within xhr
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
