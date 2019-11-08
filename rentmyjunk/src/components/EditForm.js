import React from "react";
import Form from "./Form";

import 'bootstrap/dist/css/bootstrap.min.css';

class EditForm extends Form {
  render() {
    return (
      <div class="col-lg-6 offset-2">
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
    window.location.pathname = "/post" + xhr.responseText;
  }
}

export default EditForm;
