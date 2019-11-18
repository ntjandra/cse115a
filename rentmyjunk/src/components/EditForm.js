import React from "react";
import Form from "./Form";
import JWTActions from "../JWTActions"

import 'bootstrap/dist/css/bootstrap.min.css';

class EditForm extends Form {

  /**
   * @param {Integer} post_id ID of the post to be edited
   * @param {string} url base url of the server (API),
   * @param {string} route route where the request should be sent,
   * @param {boolean} get False by default. If true, the request
   *      method used will be GET, POST otherwise.
   */
  constructor(post_id, url, route, get = false) {
    super(url, route);
    this.post_id = post_id;
  }

  /**
     * It sends the information to the API at the specified route.
     * @param {*} event event
     */
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    var actions = new JWTActions();
    var curr_user_JSON = actions.getUser(this.baseUrl + "/");
    var curr_user = actions.getParsedJSON(curr_user_JSON);
    data.append("curr_user_id", curr_user.user_id);

    var xhr = new XMLHttpRequest();

    // Listeners
    let self = this; // used to call instance's methods in listener
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 0) {
        // After you have created the XMLHttpRequest object,
        // but before you have called the open() method.

      } else if (xhr.readyState === 1) {
        // After you have called the open() method, but before
        // you have called send().

      } else if (xhr.readyState === 2) {
        // After you have called send().

      } else if (xhr.readyState === 3) {
        // After the browser has established a communication with
        // the server, but before the server has completed the response.

      } else if (xhr.readyState === 4) {
        // After the request has been completed, and the response
        // data has been completely received from the server.
        if (xhr.status === 200) {
          self.onSuccessResponse(xhr);
        } else {
          self.onFailureResponse(xhr);
        }
      }
    };

    xhr.open(this.method, this.baseUrl + this.route, true);
    xhr.send(data);
  }

  render() {
    return (
      <div className="col-lg-6">
        <h2>Edit a post</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Product Title: </label>
            <input id="title" name="title" type="text" className="form-control" placeholder="todo: get post title" required />
          </div>
          <div className="form-group">
            <label>Product Description: </label>
            <textarea id="description" name="description" type="text" rows="5" className="form-control" placeholder="todo: get post description" required />
          </div>
          <div className="form-group">
            <label>Contact Information: </label>
            <input id="contact" name="contact" type="text" className="form-control" placeholder="todo: get post contact info" required />
          </div>
          <div className="form-group">
            <label>Location: </label>
            <input id="location" name="location" type="text" className="form-control" placeholder="todo: get post location" required />
          </div>
          <div className="form-group">
            <label>Price: </label>
            <input id="price" name="price" type="number" className="form-control" placeholder="todo: get post price" required />
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
