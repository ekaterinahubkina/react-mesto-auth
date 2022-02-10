import React from "react";


function Register () {
    return (
        <div className="form__container">
            <h2 className="form__title">Регистрация</h2>
            <form className="form">
                <input type="email" className="form__input form__input_type_register" placeholder="Email"></input>
                <span className="form__error"></span>
                <input type="password" className="form__input form__input_type_register" placeholder="Пароль"></input>
                <span className="form__error"></span>
                <button className="form__button form__button_type_register">Зарегистрироваться</button>
            </form>
            <span className="form__span">Уже зарегистрированы? <a>Войти</a></span>
        </div>
    );
}

export default Register;