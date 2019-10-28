import React from 'react'
import Form from './Form'

class PostForm extends Form {
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="username">Enter username</label>
                <input id="username" name="username" type="text" />

                <label htmlFor="email">Enter your email</label>
                <input id="email" name="email" type="email" />

                <label htmlFor="birthdate">Enter your birth date</label>
                <input id="birthdate" name="birthdate" type="text" />

                <button>Send data!</button>
            </form>
        )
    }
}

export default PostForm;