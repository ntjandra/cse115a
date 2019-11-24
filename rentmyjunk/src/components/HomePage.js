import React, { Component } from 'react'

class HomePage extends Component {

    constructor(local_host_url) {
        super();
        this.local_host_url = local_host_url;
    }

    getPostsFromDatabase() {
        // Create a new XMLHttpRequest object
        let xhr = new XMLHttpRequest();

        // Configure xhr by parameters
        xhr.open("GET", this.local_host_url + "api/search", false);

        // Send the request over the network
        xhr.send();

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

        return xhr.response;
    }

    render() {
        var posts = JSON.parse(this.getPostsFromDatabase());
        if (posts.length > 3) {
            posts = posts.slice(0, 3);
        }
        console.log(posts);

        if (posts.length === 0) {
            return (
                <div>
                    <h2>Nobody's posted anything yet!</h2>
                    <p><a href="./createpost">You can be the first - click here to make a post.</a></p>
                </div>
            );
        }

        return (
            <div>
                <h2>Recent Posts</h2>
                <ul id="recent-posts-list">
                    {posts.map((post, index) => {
                        return <div key={index}>
                            <li>
                                <h4><a href={"./post" + post.id}>
                                    {post.title}
                                </a></h4>
                                {post.description}
                            </li>
                            <br />
                        </div>
                    })}
                </ul>
            </div>
        );
    }
}

export default HomePage