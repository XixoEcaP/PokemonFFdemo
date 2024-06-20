import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

function Main() {
  return (
    <div className="main-container">
      <h1>Welcome to My App</h1>
      <div className="links">
        <Link to="/portfolio" className="btn btn-primary">Portfolio</Link>
        <Link to="/todo" className="btn btn-secondary">To-Do List</Link>
      </div>
    </div>
  );
}

export default Main;
