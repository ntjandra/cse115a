import React from "react";
import JWTActions from "./../JWTActions";

class Reputation extends React.Component {

    state = {
        reputation: -1,
        reviews: 0,
        logged_user: -1
    };

    constructor(props) {
        super(props)
        this.rate = this.rate.bind(this);
    }

    componentDidMount() {
        this.initState()
    }

    updateReputationInformation() {
        let xhr = new XMLHttpRequest();
        let route = this.props.url + "api/reputation/" + this.props.user_id;

        xhr.open("GET", route, false);

        let self = this
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    console.log(`Error ${xhr.status}: ${xhr.statusText}`);
                } else {
                    let response = JSON.parse(xhr.response);
                    self.setState({
                        reputation: response["evaluation"],
                        reviews: response["count"],
                        logged_user: self.state.logged_user
                    });
                }
            }
        };

        xhr.send();
    }

    initState() {
        let actions = new JWTActions();
        let curr_user_JSON = actions.getUser(this.props.url);
        let curr_user = actions.getParsedJSON(curr_user_JSON);

        let logged_user = -1
        if (curr_user !== null) {
            logged_user = curr_user.user_id
        }

        this.setState({
            reputation: this.state.reputation,
            reviews: this.state.reviews,
            logged_user: logged_user
        }, function () {
            this.updateReputationInformation()
        });
    }

    rate(url, target, reviewer, evaluation) {
        let xhr = new XMLHttpRequest();
        let route = url +
                    "api/reputation/" +
                    target + "/" +
                    reviewer + "/" +
                    evaluation;

        xhr.open("POST", route, true);
        xhr.send();

        let self = this;
        xhr.onload = function () {
            if (xhr.status !== 200) {
                console.log(`Error ${xhr.status}: ${xhr.statusText}`);
            } else {
                self.updateReputationInformation(url, target);
            }
        };
    }

    renderButtons() {
        return (
            <div>
                <p>
                    <b>Rate this profile: </b>
                    { // Show buttons if the user logged is different
                    this.state.logged_user !== this.props.user_id && this.state.logged_user !== -1 ?
                    <React.Fragment>
                        {[0, 1, 2, 3, 4, 5].map( (value, index) => {
                            return (
                                <button
                                    key={index}
                                    className=""
                                    onClick={() => this.rate(this.props.url,
                                                             this.props.user_id,
                                                             this.state.logged_user,
                                                             value)}>
                                    {value}
                                </button>
                            )
                        })}
                    </React.Fragment> : null
                    }
                </p>
            </div>
        )
    }

    render(){
        if (this.state.reviews === 0) {
            return (
                <div>
                    <p>
                        <b>Reputation:</b> No reviews.
                    </p>
                    {this.renderButtons()}
                </div>
            )
        } else {
            return (
                <div>
                    <p>
                        <b>Reputation:</b> {this.state.reputation}, with {this.state.reviews} review(s).
                    </p>
                    {this.renderButtons()}
                </div>
            );
        }
    }
}

export default Reputation