import React from 'react';
import './Header.css';

const Header = function (props) {
    return (
        <div className="app-header app-logo">
            {props.heading}
            
            
        </div>
    )
}

export default Header;