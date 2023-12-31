import React from 'react'
import "./landingpage.modules.css"
import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div className='landingPage-cont'>
      <div>
        <h1>Dogs Project</h1>
      </div>
      <div>
        <Link className={"landingPage-button"} to={"/home"}>Home</Link>
      </div>
    </div>
  )
}

export default LandingPage