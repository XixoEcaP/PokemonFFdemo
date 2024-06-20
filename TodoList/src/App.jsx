import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Portfolio from './components/Portfolio';
import ToDoApp from './components/toDoList/App'; // Ensure this is the correct import path for your To-Do List component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/todo" element={<ToDoApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


