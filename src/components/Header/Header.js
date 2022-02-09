import React from "react";
import logo from "../../images/logo.svg"

function Header () {
    return (
        <header className="header">
            <a className="logo" href="#">
                <img className="logo__image" src={logo} alt="Логотип"/>
            </a>
        </header>
    );
}

export default Header;