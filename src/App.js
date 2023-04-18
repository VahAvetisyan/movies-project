import './App.css';
import ResponsiveAppBar from './components/AppBar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Watchlist from './components/Watchlist';
import SignIn from './SignIn&SignUp/SignIn'
import SignUp from './SignIn&SignUp/SignUp';
import Profile from './components/Profil';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser, setUser } from './redux/reducers/userReducer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';


function App() {
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

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
          <Route index path="/home/page-1" element={<Home />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="profile" element={<Profile />} /> 
          <Route path="signIn" element={<Home />} />
          <Route path="signUp" element={<Home />} />
        </>
        
        :    <>

            <Route index path="/" element={<Home />} />
            <Route path="watchlist" element={<SignIn />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="profile" element={<Home />} /> 
      
        </> 
} 
      </Routes>
    </div>
  );
}

export default App;
