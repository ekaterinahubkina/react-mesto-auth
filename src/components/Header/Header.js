import React from "react";
import logo from "../../images/logo.svg"

function Header () {
    return (
        <header className="header">
            <a className="logo" href="#">
                <img className="logo__image" src={logo} alt="Логотип"/>
            </a>
            <div className="header__auth">
                <p className="header__email"></p>
                <a className="header__enter">Войти</a>
            </div>
        </header>
    );
}

export default Header;