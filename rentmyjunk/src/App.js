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
import DeletePostButton from "./components/delete-post-button/DeletePostButton"

import RegisterAccount from "./components/RegisterAccount"
import LogIn from "./components/LogIn"
import LogOut from "./components/LogOut"
import ProfilePage from "./components/ProfilePage"
import EditProfile from "./components/EditProfile"

import './css_styling/sidebar.css';
import images from "./ImageLoader";
import DesktopToggleButton from "./components/sidebar-toggle/DesktopToggleButton";
import MobileToggleButton from "./components/sidebar-toggle/MobileToggleButton";
import HeaderMessage from "./components/header-message/HeaderMessage";

var local_host_url = "http://127.0.0.1:5000/";

/* -------------------------------
   HTML Components
------------------------------- */

export default function App() {
  let desktopToggleButton = new DesktopToggleButton(images["arrow"]);
  let mobileToggleButton = new MobileToggleButton(images["arrow"]);
  let headerMessage = new HeaderMessage();

  return (

    <div id="page-container">

      <Router>
        <div id="header-container">

          {/* Header + Banner */}
          <div id="header">

            {/* Profile/Register/Sign In
            <div id="header-profile">
              <div id="logged-in">
                Welcome, <a href="url for profile">user</a>.&nbsp;&nbsp;&nbsp;&nbsp;<a href="url for inbox">Msg
            Icon</a> / <a href="logout">Log Out</a>
              </div>

              <div id="logged-out" style={{ display: 'none' }}>
                Welcome! <a href="url for register">Register</a>/<a href="url for login">Log In</a>
              </div>
            </div> */}
            { headerMessage.render() }

            {/* Banner */}
            <div id="banner-desktop">
              <img src={images["desktop_logo"]} alt="desktop banner"></img>
            </div>

            {/* Mobile Section */}
            <div id="header-mobile-container">

              {/* Mobile sidebar toggle */}
              {/* <div id="sidebarCollapseMobile">
                <img src={images["arrow"]} alt="toggle"></img>
              </div> */}
              {mobileToggleButton.render()}

              {/* Mobile banner */}
              <div id="banner-mobile">
                <img src={images["mobile_logo"]} alt="banner"></img>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <nav id="sidebar">

            {/* Sidebar toggle, NOT a Link */}
            {desktopToggleButton.render()}

            {/* Home */}
            <Link className="sidebar-element" to="/">
              <div className="sidebar-text">
                Home
      </div>
              <img src={images["home"]} alt="home"></img>
            </Link>

            {/* Create Post */}
            <Link className="sidebar-element" to="createpost">
              <div className="sidebar-text">
                Create Post
      </div>
              <img src={images["create_post"]} alt="new post"></img>
            </Link>

            {/* My Profile */}
            <Link className="sidebar-element" to="profile">
              <div className="sidebar-text">
                My Profile
      </div>
              <img src={images["profile"]} alt="profile"></img>
            </Link>

            {/* About Us */}
            <Link className="sidebar-element" to="aboutus">
              <div className="sidebar-text">
                About Us
      </div>
              <img src={images["about_us"]} alt="about us"></img>
            </Link>

            {/* Search */}
            <Link className="sidebar-element" to="search">
              <div className="sidebar-text">
                Search
      </div>
              <img src={images["search"]} alt="search"></img>
            </Link>

          </nav>
        </div>

        {/* Main Content */}
        <div id="content-container">
          <div id="content">
            {/* INSERT CONTENT */}
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
            {/* /INSERT CONTENT */}
          </div>

          {/* Footer NECESSARY FOR CREDITING FLATICON */}
          <hr />
          <div id="footer">
            <div id="icon-license">
              Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a
                href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
            </div>
          </div>
        </div>
      </Router>

    </div>
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
  let form = new EditForm(post_id, local_host_url, "/api/post/update/" + post_id);
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
 * TODO Finalize styling
 */
function PostInfo() {
  let { post_id } = useParams();
  let editPostBtn = new EditPostButton(post_id);
  let deletePostBtn = new DeletePostButton(post_id, local_host_url);

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
      <p><strong>Contact Info:</strong> {post.contactinfo}</p>
      <p><strong>Location:</strong> {post.location}</p>
      <p><strong>Price:</strong> ${post.price}</p>
      <br />
      {editPostBtn.render()}
      <br /><br />
      {deletePostBtn.render()}
    </div>
  );
}

/* -------------------------------
 * Account Pages
 ------------------------------- */
function RegisterRoute() {
  let form = new RegisterAccount(local_host_url, "/api/account/register", "POST");
  return form.render();
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
