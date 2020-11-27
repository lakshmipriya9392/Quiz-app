import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import Category from './Components/Category/Category'
import Quiz from  './Components/Quiz/Quiz'

function App() {
  return (
    <Router>
      <Route path = "/" exact component = {Home} />
      <Route path = "/play/Category" exact component = {Category} />
      <Route path = "/play/Quiz" exact component = {Quiz} />
      
    </Router>
  );
}

export default App;
