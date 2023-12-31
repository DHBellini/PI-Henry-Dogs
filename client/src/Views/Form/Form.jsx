import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getDogs, getTemperaments, postDog } from '../../Redux/Actions'
import "./form.modules.css"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Form = () => {

  const history = useHistory()

  const dispatch = useDispatch()

  const allTemperaments = useSelector((state) => state.allTemperaments)

  useEffect(() => {
    dispatch(getDogs())
    dispatch(getTemperaments())
  }, [])

  const [state, setState] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    image: "",
    life_span: "",
    temperament: []    
  })

  const [errors, setErrors] = useState({
    name: "Data is required",
    min_height: "Data is required",
    max_height: "Data is required",
    min_weight: "Data is required",
    max_weight: "Data is required",
    image: "",
    life_span: "Data is required",
    temperament: []   
  })

  const validate = (state, name) => {
    if(name === "name"){
      if(state.name ==="") setErrors({...errors, name: "Name is required."})
      else if(state.name.length >= 20) setErrors({...errors, name:"Name is too long."})
      else setErrors({...errors, name:""})
  }

    if(name === "min_height") {
    if(isNaN(parseInt(state.min_height))) setErrors({...errors, min_height:"The data must be number."})
    else if(state.min_height > state.max_height) setErrors({...errors, min_height:"It cannot be greater than the maximum height."})
    else setErrors({...errors, min_height: ""})
  }

    if(name === "max_height"){
    if(isNaN(parseInt(state.max_height))) setErrors({...errors, max_height:"The data must be number."})
    else setErrors({...errors, max_height: ""})
  }

    if(name === "min_weight"){
    if(isNaN(parseInt(state.min_weight))) setErrors({...errors, min_weight: "The data must be number."})
    else if(state.min_weight > state.max_weight) setErrors({...errors, min_weight:"It cannot be greater than the maximum weight."})
    else setErrors({...errors, min_weight: ""})
  }

    if(name === "max_weight"){
    if(isNaN(parseInt(state.max_weight))) setErrors({...errors, max_weight: "The data must be number."})
    else setErrors({...errors, max_weight: ""})
  }

    if(name === "life_span"){
    if(isNaN(parseInt(state.life_span))) setErrors({...errors, life_span: "The data must be number."})
    else setErrors({...errors, life_span: ""})
  }

  if (name === "image") {
    const regex =/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if (regex.test(productData.image)) setErrors({ ...errors, image: ""})
    else setErrors({...errors, image: "La imagen debe ser una URL" })
  }

  if(name === "temperament"){
    if(!state.temperament.length) setErrors({...errors, temperament: "Minimium one Temperament required"})
    else setErrors({...errors, temperament: ""})
  }
}

const handleChange = (event) => {
  if(event.target.name === "temperament"){
    if(state.temperament.includes(event.target.value)) return
    setState({
      ...state,
      [event.target.name]: [...state[event.target.name], event.target.value]
    })
  }else{
  setState({
    ...state,
    [event.target.name]: event.target.value
  })
}

  validate({
    ...state,
    [event.target.name]: event.target.value
  }, event.target.name)
}

const disabledButton = () => {
  let disableAux = true;
  for (let error in errors){
    if(errors[error] === "") disableAux = false
    else {
      disableAux = true
      break
    }
  }
  return disableAux
}

const remove = (event) => {
  setState({
    ...state,
    [event.target.name]: [...state[event.target.name].filter(X => X!==event.target.id)]
  })
}

const handleSubmit = (event) => {
  event.preventDefault()
  dispatch(postDog(state))
  history.push("/home")
  //windows
}
  
  return (
    <div className='form-cont'>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type = "text" name = "name" placeholder = 'Name'/>
        <span>{errors.name}</span>
        <input onChange={handleChange} type = "text" name = "image" placeholder = 'Image'/>
        <input onChange={handleChange} type = "text" name = "min_height" placeholder = 'Minimium Height'/>
        <span>{errors.min_height}</span>
        <input onChange={handleChange} type = "text" name = "max_height" placeholder = 'Maximium Height'/>
        <span>{errors.max_height}</span>
        <input onChange={handleChange} type = "text" name = "min_weight" placeholder = 'Minimium Weight'/>
        <span>{errors.min_weight}</span>
        <input onChange={handleChange} type = "text" name = "max_weight" placeholder = 'Maximium Weight'/>
        <span>{errors.max_weight}</span>
        <input onChange={handleChange} type = "text" name = "life_span" placeholder = 'Life Span'/>
        <span>{errors.life_span}</span>   
        <div>
          <label>Temperaments:</label>
          <select onChange={handleChange} name = "temperament">
            <option hidden>Select Temperament</option>
            {allTemperaments?.map((t) => <option key={t.id} value={t.name}>{t.name}</option>)}
          </select>
          <div>
            {state.temperament?.map((t) => <div><span id={t}>{t}</span><button type="button" id={t} name="temperament" onClick={remove}>X</button></div>) }
          </div>
          <span>{errors.temperament}</span> 
        </div>
        <input disabled = {disabledButton()} type = "submit"/>
      </form>
    </div>
  )
}

export default Form