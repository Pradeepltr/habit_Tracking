// import All required things for this page
import React from 'react';
import './App.css';
import Home from "./Components/Home"
import Status from './Components/Status';
import Update from './Components/Update';
import {BrowserRouter as Router,Switch,Routes,Route} from 'react-router-dom'

function App() {

  return (
    // Use react router to navigate different component through button
   
    <Router>


      <>
      
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/status' element={<Status />}/>
        <Route exact path='/update' element={<Update />}/>
      </Routes>
      </>
    </Router>
   
  );
}

export default App;
