import React from 'react'
import ToggleButton from "./ToggleButton"

class DesktopToggleButton extends ToggleButton {
    render() {
        return (
            <div id="sidebarCollapse" className="sidebar-element" style={{ float: 'left' }} onClick={() => this.toggleSidebar()}>
                <div className="sidebar-text">
                    {/* Empty */}
                </div>
                <div className="sidebar-image" style={{ float: 'right' }}>
                    <img src={this.image} alt="toggle"></img>
                </div>
            </div>
        );
    }
}

export default DesktopToggleButton