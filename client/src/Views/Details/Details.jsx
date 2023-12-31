import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { cleanDogDetail, getDog } from "../../Redux/Actions"
import "./details.modules.css"

const Details = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const dogDetail = useSelector((state) => state.dogDetail)

  useEffect(() => {
    dispatch(getDog(params.id))
    return () => {dispatch(cleanDogDetail())}
  }, [])

  return (
    <div className='details-cont'>     
      <div><img src={dogDetail.image} alt='dog'/></div>     
      <div>
        <label>ID:</label>
        <h2>{dogDetail.id}</h2>
        <h1>{dogDetail.name}</h1>
        <label>Minimium Weight:</label>
        <p>{dogDetail.min_weight}</p>
        <label>Maximium Weight:</label>
        <p>{dogDetail.max_weight}</p>
        <label>Minimium Height:</label>
        <p>{dogDetail.min_height}</p>
        <label>Maximium Height:</label>
        <p>{dogDetail.max_height}</p>
        <label>Life Span:</label>
        <p>{dogDetail.life_span}</p>
        <label>Temperaments:</label>          
        <h4>{dogDetail?.temperament}</h4>
      </div>
    </div>
  )
}

export default Details