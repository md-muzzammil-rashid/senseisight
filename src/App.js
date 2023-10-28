import './App.css';
import Header from './components/Header';
import Cards from './components/Cards';
import {Routes, Route} from 'react-router-dom'
import AddElement from './components/AddElement';
import Details from './components/Details';
import Login from './components/Login';
import { createContext, useState } from 'react';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import Logout from './components/Logout';

const AppState = createContext()
function App() {
  const [login, setLogin]=useState(false);
  const [userName, setUserName]=useState('');
  const auth = getAuth();
  onAuthStateChanged(auth, (user)=>{
    if(user){
      setLogin(true)
    }
    else{
      setLogin(false)
    }
  })
  return (
    <AppState.Provider value={{login, userName, setLogin, setUserName}}>

    <div className="App relative">
      <Header/>
      <Routes>
        <Route index element={<Cards/>}/>
        <Route path='/' element={<Cards/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/add' element={<AddElement/>}/>
        <Route path='/details/:id' element={<Details/>}/>
      </Routes>
    
    </div>
    </AppState.Provider>
  );
}

export default App;
export {AppState}
