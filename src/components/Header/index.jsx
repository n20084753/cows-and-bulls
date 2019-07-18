import React from "react";

import logo from '../../assets/images/header-logo.png'

import './header.scss';

const Header = () => {
    return (
        <div className="app-header">
            <h2 className="ui center aligned icon header">
                <img width="80px" className="circular users icon" alt="logo" src={logo} />
            </h2>
        </div>
    );
}

export default Header;