import axios from "axios"
import {GET_DOG, GET_DOG_DETAIL, CLEAN_DOG_DETAIL, GET_TEMPERAMENTS, FILTER_BY_TEMPERAMENTS, PAGINATE, FILTER, RESET, SEARCH_DOG, FILTER_BY_ORIGIN} from "./action-types"

export function postDog(state){
    return async function(dispatch){
        try {
            await axios.post("http://localhost:3001/dogs/", state)
        } catch (error) {
            console.log(error);
        }
    }
}

export function getDogs(){
    return async function(dispatch){
        try {
            const response = await axios.get("http://localhost:3001/dogs/")
            dispatch({
                type: GET_DOG,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function searchDog(dog){
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/dogs?name=${dog}`)
            dispatch({
                type: SEARCH_DOG,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDog(id){
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/dogs/${id}`)
            dispatch({
                type: GET_DOG_DETAIL,
                payload: response.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function cleanDogDetail() {
    return{
        type: CLEAN_DOG_DETAIL
    }
}

export function getTemperaments(){
    return async function(dispatch){
        try {
            const response = await axios.get("http://localhost:3001/temperaments/")
            dispatch({
                type: GET_TEMPERAMENTS,
                payload: response.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterTemperaments(order){
    return async function(dispatch){
        try {
            dispatch({
                type: FILTER_BY_TEMPERAMENTS,
                payload: order
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterOrigin(order){
    return async function(dispatch){
        try {
            dispatch({
                type: FILTER_BY_ORIGIN,
                payload: order
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function page(order){
    return function(dispatch){
        dispatch({
            type: PAGINATE,
            payload: order
        })
    }
}

export function dogFilter(order){
    return function(dispatch){
        dispatch({
            type: FILTER,
            payload: order
        })
    }
}

export function dogReset(){
    return function(dispatch){
        dispatch({
            type: RESET
        })
    }
}