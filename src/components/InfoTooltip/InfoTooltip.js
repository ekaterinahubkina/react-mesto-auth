import React from "react";
import tick from "../../images/tick.svg";

function InfoTooltip ({ isOpen, onClose }) {
    return (
        <article className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_infoTool">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <figure className="popup__figure">
                    <img className='popup__image' src={tick} alt="успешно"/>
                    <figcaption className="popup__figcaption popup__figcaption_type_infoTool">Вы успешно зарегистрировались!</figcaption>
                </figure>
            </div>
        </article>
    );
}

export default InfoTooltip;