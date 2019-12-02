import React, { Component } from "react";
import JWTActions from "../JWTActions"
import FileUploader from "react-firebase-file-uploader"
import firebase from "firebase"

import 'bootstrap/dist/css/bootstrap.min.css';

class EditForm extends Component{

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    // We get the old image name to override it
    let filename = "";
    if(this.props.post.image !== "") {
      let s = this.props.post.image.split("/")
      filename = s[s.length - 1].split(".")[0].split("%2F")[1]
    }

    this.state = {
      image: '',
      imageURL: this.props.post.image,
      progress: '',
      filename: filename
    }
  }

  handleUploadStart = () => {
    this.setState({
        progress: "• uploading..."
    })
  }

  handleUploadSuccess = filename => {
    this.setState({
        image: filename,
        progress: "• uploaded!"
    })

    firebase.storage().ref("posts").child(filename).getDownloadURL()
        .then(url => this.setState({
            imageURL: url
        }));
  }

  /**
     * It sends the information to the API at the specified route.
     * @param {*} event event
     */
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    var actions = new JWTActions();
    var curr_user_JSON = actions.getUser(this.props.url);
    var curr_user = actions.getParsedJSON(curr_user_JSON);
    data.append("curr_user_id", curr_user.user_id);

    var xhr = new XMLHttpRequest();

    // Listeners
    let self = this; // used to call instance's methods in listener
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        // After the request has been completed, and the response
        // data has been completely received from the server.
        if (xhr.status === 200) {
          window.location.pathname = "/post" + self.props.post.id;
        } else {
          alert("error");
        }
      }
    };

    xhr.open(this.props.method, this.props.url + this.props.route, true);
    xhr.send(data);
  }

  render() {
    return (
      <div className="col-lg-6">
        <h2>Edit a post</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Product Title: </label>
            <input id="title" name="title" type="text" className="form-control" defaultValue={this.props.post.title} required />
          </div>
          <div className="form-group">
              <label>Image: <small>1920x1080 max, preview with height=150px {this.state.progress}</small></label> <br/>
              <img
                  src={this.state.imageURL !== "" ? this.state.imageURL : "https://via.placeholder.com/150?text=?"}
                  alt="preview"
                  height="150"/>
              <br/><br/>
              <FileUploader
                  accept="image/*"
                  name="image"
                  filename={this.state.filename}
                  storageRef={firebase.storage().ref("posts")}
                  onUploadStart={this.handleUploadStart}
                  onUploadSuccess={this.handleUploadSuccess}
                  maxWidth="1920"
                  maxHeight="1080"
                  />
              <input id="image" name="image" type="text" value={this.state.imageURL} readOnly hidden/>
          </div>
          <div className="form-group">
            <label>Product Description: </label>
            <textarea id="description" name="description" type="text" rows="5" className="form-control" defaultValue={this.props.post.description} required />
          </div>
          <div className="form-group">
            <label>Contact Information: </label>
            <input id="contact" name="contact" type="text" className="form-control" defaultValue={this.props.post.contactinfo} required />
          </div>
          <div className="form-group">
            <label>Location: </label>
            <input id="location" name="location" type="text" className="form-control" defaultValue={this.props.post.location} required />
          </div>
          <div className="form-group">
            <label>Price: </label>
            <input id="price" name="price" type="number" className="form-control" defaultValue={this.props.post.price} required />
          </div>
          <div className="form-group">
            <input type="submit" name="submit" value="Save changes" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }

  /**
   * Redirects to newly created post page upon a successful post creation
   */
  onSuccessResponse(xhr) {
    window.location.pathname = "/post" + this.post_id;
  }
}

export default EditForm;
