import React from 'react'
import Card from '../Card/Card'
import "./cards.modules.css"

const Cards = ({info}) => {
  return (
    <div className='cards-cont' >{
       info?.map((d) => <Card 
      name= {d.name}
      temperament={d.temperament}
      min_weight={d.min_weight}
      max_weight={d.max_weight}
      image={d.image}
      id={d.id}
      />)
      }
    </div>
  )
}

export default Cards