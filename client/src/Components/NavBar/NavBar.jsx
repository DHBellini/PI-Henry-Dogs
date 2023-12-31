import React from 'react'
import "./navbar.modules.css"
import { Link } from "react-router-dom"
import SearchBar from '../SearchBar/SearchBar'

const NavBar = () => {
  return (
    <div className='navbar-cont'>
      <div className='navbar-cont-img'>
        <Link className="navbar-link" to="/"><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpV7p78r4moakfnV-eU7_3BdRPe05JIm9yWw&usqp=CAU' alt="logo"></img></Link>
      </div>
      <div className='navbar-cont-links'>
        <Link className='navbar-link' to="/home">Home</Link>        
        <Link className='navbar-link' to="/form">Form</Link>
      </div>
      <div className='navbar-cont-search'>
        <SearchBar/>       
      </div>
    </div>
  )
}

export default NavBar