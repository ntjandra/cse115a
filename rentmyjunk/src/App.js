import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Cookies from 'js-cookie';

// Multipart form-data
import EditForm from "./components/EditForm";
import CreateForm from "./components/CreateForm";
import EditPostButton from "./components/edit-post-button/EditPostButton";
import DeletePostButton from "./components/delete-post-button/DeletePostButton"
import SearchPage from "./components/SearchPage"
import HomePage from "./components/HomePage"

import RegisterAccount from "./components/RegisterAccount"
// Add to Side Bar Login/Logout
import LogIn from "./components/LogIn"
import ProfilePage from "./components/ProfilePage"
import EditProfile from "./components/EditProfile"

import './css_styling/post.css';
import './css_styling/sidebar.css';
import images from "./ImageLoader";
import DesktopToggleButton from "./components/sidebar-toggle/DesktopToggleButton";
import MobileToggleButton from "./components/sidebar-toggle/MobileToggleButton";
import HeaderMessage from "./components/header-message/HeaderMessage";
import JWTActions from "./JWTActions";

import firebase from "firebase"
import firebaseConfig from "./firebase-config"

firebase.initializeApp(firebaseConfig);

var local_host_url = "http://127.0.0.1:5000/";


/* -------------------------------
   HTML Components
------------------------------- */

export default function App() {
  let desktopToggleButton = new DesktopToggleButton(images["arrow"]);
  let mobileToggleButton = new MobileToggleButton(images["arrow"]);
  let headerMessage = new HeaderMessage(local_host_url);

  return (

    <div id="page-container">

      <Router>
        <div id="header-container">

          {/* Header + Banner */}
          <div id="header">

            {/* Profile/Register/Sign In */}
            {headerMessage.render()}

            {/* Banner */}
            <div id="banner-desktop">
              <img src={images["desktop_logo"]} alt="desktop banner"></img>
            </div>

            {/* Mobile Section */}
            <div id="header-mobile-container">

              {/* Mobile sidebar toggle */}
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
              <Route path="/aboutus">
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
                <CreateForm url={local_host_url} />
              </Route>
              <Route path="/search">
                <SearchPage url={local_host_url} />
              </Route>

              {/* Pages related to accounts */}
              <Route path="/register">
                <RegisterAccount url={local_host_url} />
              </Route>
              <Route path="/login">
                <LogInRoute />
              </Route>
              <Route path="/profile:name">
                <ProfileRoute />
              </Route>
              <Route path="/profile">
                <ProfileRedirectRoute />
              </Route>
              <Route path="/editprofile:name">
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
  var homePage = new HomePage(local_host_url);
  return homePage.render();
}

/**
 * About Component
 */
function About() {
  return (
    <div>
      <h2>About</h2>
      <p>
        RentMyJunk is a sustainable solution to the growing problem 
        of our landfills. Rent out your junk and find treasure on 
        our simple, easy-to-use platform. Clothes, cars, textbooks, 
        laptops - anything is rentable! Sign up and start renting 
        today!
      </p>
    </div>
  );
}

// What is Users?
function Users() {
  return <h2>Users</h2>;
}

/**
 * Edit Post Component
 */
function EditPost() {
  let { post_id } = useParams();
  let post_data = xhrSend("GET", "api/search/id/" + post_id, null);

  if (post_data.startsWith("ERROR")) {
    return <b>{post_data} - could not get post information</b>;
  }
  let post = JSON.parse(post_data);
  return <EditForm method={"POST"} url={local_host_url} post={post} route={"api/post/update/" + post_id} />;
}

/**
 * Displays info for specific post, by ID
 *
 * TODO Finalize styling
 */
function PostInfo() {
  let { post_id } = useParams();

  var post_data = xhrSend("GET", "api/search/id/" + post_id, null);

  // If post doesn't exist, display error
  if (post_data.startsWith("ERROR")) {
    return <h1>{post_data}</h1>;
  }

  // Post exists
  var post = JSON.parse(post_data);

  // Compare current user to post's author
  var actions = new JWTActions();
  var curr_user_JSON = actions.getUser(local_host_url);
  var curr_user = actions.getParsedJSON(curr_user_JSON);

  var isAuthor = true;
  if (!curr_user || curr_user.user_id !== post.author_id) {
    isAuthor = false;
  }

  return (
    <div>
      <img height="200px" src={post.image} alt="preview" />
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p><strong>Contact Info:</strong> {post.contactinfo}</p>
      <p><strong>Location:</strong> {post.location}</p>
      <p><strong>Price:</strong> ${post.price}</p>
      <p>By <a href={"./profile" + post.author_name}>{post.author_name}</a></p>
      <br />
      {isAuthor ?
        <React.Fragment>
          <EditPostButton post_id={post_id} />
          <br /> <br />
          <DeletePostButton post_id={post_id} url={local_host_url} />
        </React.Fragment> : null}
    </div>
  );
}

/* -------------------------------
 * Account Pages
 ------------------------------- */

function LogInRoute() {
  let logIn = new LogIn(local_host_url, "/api/account/login");
  return logIn.render();
}

function ProfileRoute() {
  let { name } = useParams();
  let profilePage = new ProfilePage(local_host_url, name);
  return profilePage.render();
}

/**
 * If a user is logged in, redirect to their profile. Else, redirect to register.
 */
function ProfileRedirectRoute() {
  var curr_user_JSON = getUser();

  if (loggedIn(curr_user_JSON)) {
    var curr_user = JSON.parse(curr_user_JSON);
    window.location.pathname = "profile" + curr_user.name;
  }
  else {
    window.location.pathname = "login";
  }

  return "";

}

function EditProfileRoute() {
  let { name } = useParams();
  let editProfile = new EditProfile(local_host_url, "/api/account/update", name);
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

/* -------------------------------
   JWT Functions
------------------------------- */

/**
 * Checks if a user is currently logged in, returns true or false
 * If curr_user_JSON is not a JSON, no user is logged in
 */
function loggedIn(curr_user_JSON) {
  try {
    JSON.parse(curr_user_JSON);
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * Sends the auth token to backend, and saves result
 */
function getUser() {
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

