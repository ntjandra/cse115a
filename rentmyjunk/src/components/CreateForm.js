import React, { Component } from 'react'
import JWTActions from '../JWTActions'
import FileUploader from "react-firebase-file-uploader"
import firebase from "firebase"
import firebaseConfig from "./../firebase-config"

import 'bootstrap/dist/css/bootstrap.min.css';

firebase.initializeApp(firebaseConfig);

class PostForm extends Component {

    state = {
        image: '',
        imageURL: '',
        progress: 0,
        userId: -1,
        filename: ""
    };

    componentDidMount() {
        let actions = new JWTActions();
        let curr_user_JSON = actions.getUser(this.props.url);
        this.curr_user = actions.getParsedJSON(curr_user_JSON);

        if (this.curr_user) {
            this.setState({
                // If the user changes the image multiple times, then it will
                // override the one that already exists
                filename: this.curr_user.user_id + Math.random().toString(36).substring(7),
                userId: this.curr_user.user_id
            });
        }
    }

    handleUploadStart = () => {
        this.setState({
            progress: 0
        })
    }

    handleUploadSuccess = filename => {
        this.setState({
            image: filename,
            progress: 100
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
        data.append("author_id", this.curr_user.user_id);
        data.append("author_name", this.curr_user.name);
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    window.location.pathname = "/post" + xhr.responseText;
                }
            }
        };

        xhr.open("POST", this.props.url + "api/post/new", true);
        xhr.send(data);
    }

    render() {

        if(this.state.userId === -1)
            return <h2>Please log in before trying to create a post.</h2>

        return (
            <div className="col-lg-6">
                <h2>Create a post</h2>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Product Title: </label>
                        <input id="title" name="title" type="text" className="form-control" placeholder="Your junk" required />
                    </div>
                    <div className="form-group">
                        <label>Image: <small>1920x1080 max, preview with height=150px</small></label> <br/>
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
                        <input id="image" name="image" type="text" value={this.state.imageURL} hidden/>
                    </div>
                    <div className="form-group">
                        <label>Product Description: </label>
                        <textarea id="description" name="description" type="text" className="form-control" rows="5" placeholder="Details about your junk: damages, pick up location, ..." required />
                    </div>
                    <div className="form-group">
                        <label>Contact Information: </label>
                        <input id="contact" name="contact" type="text" className="form-control" placeholder="Email or phone number" required />
                    </div>
                    <div className="form-group">
                        <label>Location: </label>
                        <input id="location" name="location" type="text" className="form-control" placeholder="Location" required />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input id="price" name="price" type="number" className="form-control" placeholder="Price in $" required />
                    </div>
                    <div className="form-group">
                        <input type="submit" name="submit" value="Create a post" className="btn btn-primary" required />
                    </div>
                </form>
            </div>
        )
    }
}

export default PostForm;
