import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import Category from './Components/Category/Category'
import Quiz from  './Components/Quiz/Quiz'
import Maths from './Components/Quiz/Maths'
import Sports from './Components/Quiz/Sports'
import Summary from './Components/Summary/Summary'
import Login from './Components/Login/Login'
import Register from './Components/SignUp/SignUp'

function App() {
  return (
    <Router>
      <Route path = "/" exact component = {Home} />
      <Route path = "/play/Category" exact component = {Category} />
      <Route path = "/play/Quiz" exact component = {Quiz} />
      <Route path = "/play/Maths" exact component = {Maths} />
      <Route path = "/play/Sports" exact component = {Sports} />
      <Route path = "/play/quizSummary" exact component = {Summary} />
      <Route path = "/login" exact component = {Login} />
      <Route path = "/register" exact component = {Register} />
    </Router>
  );
}

export default App;
