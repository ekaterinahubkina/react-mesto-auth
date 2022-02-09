import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';
import api from '../../utils/api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';

function App() {

  const [isLoading, setIsLoading] = React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserData()
      .then(res => {
        console.log(res);
        setCurrentUser(res);
      })
  }, [])



  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups () {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick (card) {
    setSelectedCard(card)
  }

  function handleUpdateUser ({ name, about }) {
    setIsLoading(true);
    console.log({name, about})
    api.editUserData({ name, about })
      .then((res) => {
        console.log(res)
        setCurrentUser(res);
        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar ({ avatar }) {
    setIsLoading(true);
    api.editUserAvatar({ avatar })
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    }) 
    }

    function handleCardDelete(card) {

        api.deleteMyCard(card)
            .then((res) => {
                console.log(res);
                setCards((state) => state.filter((c) => c._id !== card._id))
            })
    }

    React.useEffect(() => {
        api.getCards()
            .then(res => {
                console.log(res);
                setCards(res);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    function handleAddPlaceSubmit ({ name, link }) {
      setIsLoading(true);
      api.addNewCard({ name, link})
        .then((newCard) => {
          console.log(newCard);
          setCards([newCard, ...cards]);
          closeAllPopups();
        })
        .finally(() => {
          setIsLoading(false);
        })
    }


  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards} />
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpateAvatar={handleUpdateAvatar} isLoading={isLoading}/>
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading}/>
      <PopupWithForm title={'Вы уверены?'} name={'confirm'} buttonText={'Да'}>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
