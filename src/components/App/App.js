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
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import auth from '../../utils/auth';

function App() {

  const [isLoading, setIsLoading] = React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);


  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const[isLoggedIn, setIsLoggedIn] =React.useState(false);


  const history = useHistory();

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
    setIsInfoTooltipOpen(false);
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

    function handleRegisterSubmit ({ password, email}) {
      auth.register({password, email})
            .then((res) => {
              if(res) {
                setIsInfoTooltipOpen(true)
              }
              console.log(res)
            })
    }

    function handleLoginSubmit ({ password, email}) {
      auth.login ({password, email})
        .then((res) => {
          if(res) {
            // setIsLoggedIn(true);
            console.log(res)
            localStorage.setItem('token', res.token);
            // history.push('/');
          }
          console.log(localStorage.getItem('token'))
        })
        .then(tokenCheck)
    }

    function tokenCheck () {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        auth.authorization({token})
          .then((res) => {
            console.log(res);
            setIsLoggedIn(true);
            history.push('/');
          })
      }
    }


  return (
    
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Switch>
        {/* <ProtectedRoute exact path='/' loggedIn={loggedIn} component={Main} /> */}
        <Route exact path='/'>
          {!isLoggedIn && <Redirect to='/login' />}
          <Main onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards} />
          <Footer />  
        </Route>
        <Route path='/login'>
          <Login onLogin={handleLoginSubmit}/>
        </Route>
        <Route path='/register'>
          <Register isOpen={isInfoTooltipOpen} onRegister={handleRegisterSubmit} onClose={closeAllPopups}/>
        </Route>
      </Switch>
      
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
