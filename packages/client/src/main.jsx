import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Route, Routes } from "react-router-dom";
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import Todolist from './Todolist.jsx';
import AddTodo from './AddTodo.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <div className="container">
      <nav>
        <ul>
          <Link to="/" class="list">
            Todos<br/>
          </Link>
          <Link to="/todo" class="list">
            Add todo<br/>
          </Link>
          <Link to="/auth-permissions" class="list">
            Live course<br/>
          </Link>
          <Link to="/contact" class="list">
            Contact<br/>
          </Link>
        </ul>
      </nav>

      {/* Defining routes path and rendering components as element */}
      <Routes>
        <Route path="/todo" element={<AddTodo/>} />
        <Route path="/" element={<Todolist/>} />
      </Routes>
    </div>
    </BrowserRouter>
  </React.StrictMode>,
)

