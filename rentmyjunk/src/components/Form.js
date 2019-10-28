import React from 'react'

class Form extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch("/api/form-submit", {
            method: "POST",
            body: data
        });
    }

    render() {
        return <p>render() method not implemented! You may be using the Form class instead of an inheriting class.</p>
    }
}

export default Form