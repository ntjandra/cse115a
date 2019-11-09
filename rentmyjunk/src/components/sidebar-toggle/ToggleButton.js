import React from 'react'

class ToggleButton extends React.Component {
    constructor(image) {
        super()
        this.image = image;
    }

    /**
     * toggleSidebar
     * 
     * Toggles the class "active" to display or hide sidebar
     */
    toggleSidebar() {
        document.getElementById("sidebar").classList.toggle("active");
        document.getElementById("content-container").classList.toggle("active");
        document.getElementById("header").classList.toggle("active");
    }

    /**
     * Default render, should be overwritten
     */
    render() {
        return <p>render() method not implemented</p>;
    }
}

export default ToggleButton