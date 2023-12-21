import React from "react";
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import Login from './pages/login'
import '../CSS/navbar.css'
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function App()
{
    const [ham,setHam]=useState(false)

    return(
        <div className="router">
        <Router>
            <div className="nav">
            <Link to="/" className="title">Movie</Link>
            <Link to="/About" className={ham ? "down":"hide"}>About</Link>
            <Link to="/contact" className={ham ? "down":"hide"}>Contact</Link>
            <Link to="/Login" className={ham ? "down":"hide"}>Login</Link>
            <div className="ham_burger" onClick={()=>{setHam(!ham)}}>
                <FontAwesomeIcon icon={faBars}/>
            </div>
            </div>


        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/Login' element={<Login />}/>
            <Route path='/About' element={<About />}/>
            <Route path="/Contact" element={<Contact />}/>
        </Routes>
        </Router>
        </div>
    )
}

export default App