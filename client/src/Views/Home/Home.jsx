import React, { useEffect } from 'react'
import "./home.modules.css"
import { useDispatch, useSelector } from "react-redux"
import { dogFilter, dogReset, filterOrigin, filterTemperaments, getDogs, getTemperaments, page } from "../../Redux/Actions/index"
import Cards from "../../Components/Cards/Cards"

const Home = () => {

  const dispatch = useDispatch()

  const allDogs = useSelector((state) => state.allDogs)
  const allTemperaments = useSelector((state) => state.allTemperaments)
  const currentPage = useSelector((state) => state.currentPage)

  useEffect(() => {
    dispatch(getDogs())
    dispatch(getTemperaments())
  }, [])

  const pagination = (event) => {
    dispatch(page(event.target.name))
  }

  const filters = (event) => {
    dispatch(dogFilter(event.target.name))
  }

  const filterByTemperaments = (event) => {
    dispatch(filterTemperaments(event.target.value))
  }

  const filterByOrigin = (event) => {
    dispatch(filterOrigin(event.target.name))
  }

  const reset = (event) => {
    dispatch(dogReset())
  }

  return ( 
    <div className='home-cont'>
      <div>
        <label>RESET:</label>
        <button onClick={reset}>RESET</button>
      </div>
      <div>
        <label>Filters</label>
        <button name="AZ" onClick={filters}>A-Z</button>
        <button name="ZA" onClick={filters}>Z-A</button>
      </div>
      <div>
        <h4>Origin</h4>
        <button onClick={filterByOrigin} name = "DB">Data Base</button>
        <button onClick={filterByOrigin} name = "API">API</button>
      </div>
      <div>
        <select name="filterByTemperaments" onChange={filterByTemperaments}>
        <option hidden>Select Temperament</option>
          {allTemperaments?.map((t) => <option key={t.name} value={t.name}>{t.name}</option>)}
        </select>
      </div>
      <div>
        <label>Pagination</label>
        <button name="prev" onClick={pagination}>Prev</button>       
        <h4> {currentPage+1}</h4>      
        <button name="next" onClick={pagination}>Next</button>
      </div>
      <div>
        <Cards info={allDogs}/>
      </div>      
    </div>
  )
}

export default Home