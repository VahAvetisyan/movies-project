import './App.css';
import ResponsiveAppBar from './components/AppBar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Watchlist from './components/Watchlist';
import SignIn from './SignIn&SignUp/SignIn'
import SignUp from './SignIn&SignUp/SignUp';
import Profile from './components/Profil';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser, setUser } from './redux/reducers/userReducer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import FilmPage from "./components/FilmPage"


function App() {
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const [selectedFilm, setSelectedFilm] = useState(null)

  React.useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      dispatch(setUser(u?.email));
    });
  }, []);
  return (
    <div className="App">
      <div>
        <ResponsiveAppBar loggedInUser={loggedInUser}/>
      </div>
      <Routes>
        {loggedInUser?<>
          <Route index path="/" element={<Home selectedFilm={setSelectedFilm} />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="profile" element={<Profile />} /> 
          <Route path="signIn" element={<Home />} />
          <Route path="signUp" element={<Home />} />
          <Route path="film" element={<FilmPage selectedFilm={selectedFilm} />} />
        </>
        
        :    <>

            <Route index path="/" element={<Home selectedFilm={setSelectedFilm} />} />
            <Route path="watchlist" element={<SignIn />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="profile" element={<Home />} /> 
            <Route path="film" element={<FilmPage selectedFilm={selectedFilm} />} />
      
        </> 
} 
      </Routes>
    </div>
  );
}

export default App;
