import React from "react";


function Login () {
    return (
        <div className="form__container">
            <h2 className="form__title">Вход</h2>
            <form className="form">
                <input type="email" className="form__input form__input_type_register" placeholder="Email"></input>
                <span className="form__error"></span>
                <input type="password" className="form__input form__input_type_register" placeholder="Пароль"></input>
                <span className="form__error"></span>
                <button className="form__button form__button_type_register">Войти</button>
            </form>
        </div>
    );
}

export default Login;