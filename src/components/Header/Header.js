import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Header ({loggedIn, userEmail, location, onExit}) {

    let button = {text: '', link: ''};
    button = headerButtonText();    

        function headerButtonText () {
            switch (location.pathname) {
                case '/': 
                button.text = 'Выйти';
                button.link = '/login';
                return button;

                case '/login': 
                button.text = 'Регистрация';
                button.link = '/register';
                return button;

                case '/register': 
                button.text = 'Войти';
                button.link = '/login';
                return button;
            }
        }

    const userEmailText = loggedIn ? userEmail : '';


    return (
        <header className="header">
            <a className="logo" href="#">
                <img className="logo__image" src={logo} alt="Логотип"/>
            </a>
            <div className="header__auth">
                <p className="header__email">{userEmailText}</p>
                <Link to={button.link} className="header__button" onClick={ location.pathname === '/' && onExit }>{button.text}</Link>
            </div>
        </header>
    );
}

export default Header;