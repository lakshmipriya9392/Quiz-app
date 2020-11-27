import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import Category from './Components/Category/Category'
import Quiz from  './Components/Quiz/Quiz'
import Maths from './Components/Quiz/Maths'
import Sports from './Components/Quiz/Sports'
import Summary from './Components/Summary/Summary'

function App() {
  return (
    <Router>
      <Route path = "/" exact component = {Home} />
      <Route path = "/play/Category" exact component = {Category} />
      <Route path = "/play/Quiz" exact component = {Quiz} />
      <Route path = "/play/Maths" exact component = {Maths} />
      <Route path = "/play/Sports" exact component = {Sports} />
      <Route path = "/play/quizSummary" exact component = {Summary} />
    </Router>
  );
}

export default App;
