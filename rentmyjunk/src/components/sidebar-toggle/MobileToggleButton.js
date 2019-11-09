import React from 'react'
import ToggleButton from "./ToggleButton"

class MobileToggleButton extends ToggleButton {
    render() {
        return (
            <div id="sidebarCollapseMobile" onClick={() => this.toggleSidebar()}>
                <img src={this.image} alt="toggle"></img>
              </div>
        );
    }
}

export default MobileToggleButton