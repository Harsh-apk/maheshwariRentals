import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { useState } from 'react';
import Login from './components/Login';
import Account from './components/Account';
import Saved from './components/Saved';
import Create from './components/Create';
import UploadPostImages from './components/UploadPostImages'
import Signup from './components/Signup';

function App() {
  const [user,setUser] = useState(null);
  const [postId, setPostId] = useState(null);

  return (
    <Router>
      <div>
        <Navbar/>
      </div>
      <Switch>
        <Route path="/" exact>
          <Home user = {user} setUser = {setUser} />
        </Route>
        <Route path="/login" >
          <Login setUser={setUser} />
        </Route>
        <Route path="/account" >
          <Account user={user} setUser={setUser} />
        </Route>
        <Route path="/saved" >
          <Saved user={user} />
        </Route>
        <Route path="/create" >
          <Create setPostId = {setPostId} />
        </Route>
        <Route path="/uploadImages" >
          <UploadPostImages postId = {postId} />
        </Route>
        <Route path="/signup" >
          <Signup setUser={setUser} />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
