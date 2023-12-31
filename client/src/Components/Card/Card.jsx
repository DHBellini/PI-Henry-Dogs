import React from 'react'
import "./card.modules.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const Card = ({name, image, temperament, min_weight, max_weight, id}) => {
  return (
    <div className='card-cont'>
      <div className='card-cont-title'>
        <Link to={`/details/${id}`}><h2>{name}</h2></Link>        
      </div>
      <div className='card-cont-info'>
        <label>Temperaments:</label>
        <span>{temperament}</span>
        <br/>
        <label>Minimium Weight:</label>
        <span>{min_weight}</span>
        <br/>
        <label>Maximium Weight:</label>
        <span>{max_weight}</span>
        <br/>
      </div>
      <div className='card-cont-img'>
        <img src={image} alt="dog"/> 
      </div>
    </div>
  )
}

export default Card