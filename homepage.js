var domContainer = document.querySelector('#content');

var element1 = React.createElement(
  "h1",
  { className: "text-center" },
  "Welcome to Rent My Junk!"
);

var element2 = React.createElement(
  "div",
  { className: "row" },
  React.createElement(
    "div",
    { id: "btn-register", className: "col-sm-6 btn-home-container" },
    React.createElement(
      "button",
      { className: "btn-home" },
      "Register"
    )
  ),
  React.createElement(
    "div",
    { id: "btn-login", className: "col-sm-6 btn-home-container" },
    React.createElement(
      "button",
      { className: "btn-home" },
      "Log In"
    )
  )
);

var element3 = React.createElement(
  "div",
  { id: "recent-posts-container" },
  React.createElement(
    "h3",
    null,
    "Recent Posts"
  ),
  React.createElement(
    "div",
    { className: "recent-post" },
    React.createElement(
      "a",
      { href: "{{ url_for(postPage) }}" },
      React.createElement(
        "h4",
        null,
        "Product Name 1"
      )
    ),
    React.createElement(
      "div",
      { className: "row recent-post-inner" },
      React.createElement(
        "div",
        { className: "col-md-9" },
        React.createElement(
          "p",
          { className: "recent-post-description" },
          "This is the description for a product. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        )
      ),
      React.createElement("div", { className: "col-md-1" }),
      React.createElement(
        "div",
        { className: "col-md-2" },
        React.createElement("img", { className: "recent-post-img", src: "../../static/images/post-example.jpg" })
      )
    )
  )
);

var test = React.createElement(
  "div",
  { id: "homepage" },
  element1,
  element2,
  element3
);

ReactDOM.render(test, domContainer);