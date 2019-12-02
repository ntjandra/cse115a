import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader"
import firebase from "firebase"

import 'bootstrap/dist/css/bootstrap.min.css';

class RegisterAccount extends Component {

    state = {
        image: '',
        imageURL: '',
        progress: '',
        filename: ''
    };

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            // If the user changes the image multiple times, then it will
            // override the one that already exists
            filename: Math.random().toString(36).substring(7),
        });
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

        firebase.storage().ref("avatars").child(filename).getDownloadURL()
            .then(url => this.setState({
                imageURL: url
            }));
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    window.location.pathname = "/login";
                }
            }
        };

        xhr.open("POST", this.props.url + "api/account/register", true);
        xhr.send(data);
    }

    render() {
        return (
            <div className="col-lg-6">
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input id="email" name="email" type="text" className="form-control" placeholder="Example: yourname@email.com" required />
                    </div>

                    <div className="form-group">
                        <label>Username: </label>
                        <input id="name" name="name" type="text" className="form-control" placeholder="Example: YourName123" required />
                    </div>

                    <div className="form-group">
                        <label>Password: </label>
                        <input id="password" name="password" type="password" className="form-control" placeholder="Password" required />
                    </div>

                    <div className="form-group">
                        <label>Image: <small>200x200 max {this.state.progress}</small></label> <br/>
                        <img
                            src={this.state.imageURL !== "" ? this.state.imageURL : "https://via.placeholder.com/200?text=?"}
                            alt="preview"
                            height="200"/>
                        <br/><br/>
                        <FileUploader
                            accept="image/*"
                            name="image"
                            filename={this.state.filename}
                            storageRef={firebase.storage().ref("avatars")}
                            onUploadStart={this.handleUploadStart}
                            onUploadSuccess={this.handleUploadSuccess}
                            maxWidth="200"
                            maxHeight="200"
                            />
                        <input id="image" name="image" type="text" value={this.state.imageURL} readOnly hidden/>
                    </div>

                    <div className="form-group">
                        <label>Location: </label>
                        <input id="location" name="location" type="text" className="form-control" placeholder="Example: YourName123" />
                    </div>

                    <div className="form-group">
                        <label>Bio: </label>
                        <textarea id="description" name="description" type="text" rows="5" className="form-control" placeholder="Say something about yourself!" />
                    </div>

                    <div className="form-group">
                        <input type="submit" name="submit" value="Register" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

export default RegisterAccount;
