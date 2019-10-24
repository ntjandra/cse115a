const domContainer = document.querySelector('#content');

const element1 =
  <h1 className="text-center">Welcome to Rent My Junk!</h1>

const element2 =
  <div className="row">

    <div id="btn-register" className="col-sm-6 btn-home-container">
      <button className="btn-home">Register</button>
    </div>

    <div id="btn-login" className="col-sm-6 btn-home-container">
      <button className="btn-home">Log In</button>
    </div>
  </div>;

const element3 =
  <div id="recent-posts-container">
    <h3>Recent Posts</h3>

    <div className="recent-post">

      <a href="{{ url_for(postPage) }}">
        <h4>Product Name 1</h4>
      </a>

      <div className="row recent-post-inner">
        <div className="col-md-9">

          <p className="recent-post-description">
            This is the description for a product. Lorem ipsum dolor sit amet, consectetur
            adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt
            mollit anim id est laborum.
            </p>
        </div>

        <div className="col-md-1"></div>

        <div className="col-md-2">
          <img className="recent-post-img" src="../../static/images/post-example.jpg"></img>
        </div>
      </div>
    </div>
  </div>;

const test = <div id="homepage">
  {element1}
  {element2}
  {element3}
</div>;

ReactDOM.render(test, domContainer);