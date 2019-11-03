import React from "react";
import Form from "./Form";

class EditForm extends Form {
  render() {
    return (
      <div>
        <h1>
          <font face="Trebuchet MS">
            <b>Edit Post</b>
          </font>
        </h1>
        <form onSubmit={this.handleSubmit}>
          <p>Product Title:</p>
          <input type="text" name="title" />
          <p>Product Description:</p>
          <textarea name="comment" type="text" name="descr" />
          <p>Contact Information:</p>
          <input type="text" name="contact" />
          <p>Location:</p>
          <input type="text" name="location" />
          <p>Price:</p>
          <input type="text" name="price" />
          <br></br>
          <br></br>
          <div className="form-group">
            <input
              type="submit"
              value="Save Changes"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditForm;
