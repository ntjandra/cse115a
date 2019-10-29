import React from 'react'
import Form from './Form'

class PostForm extends Form {
    render() {
        return (
            <div>
                <h2>Create Post</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Product Title: </label>
                        <input id="title" name="title" type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Product Description: </label>
                        <input id="description" name="description" type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Contact Information: </label>
                        <input id="contact" name="contact" type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Location: </label>
                        <input id="location" name="location" type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input id="price" name="price" type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" name="submit" value="Create Post" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default PostForm;