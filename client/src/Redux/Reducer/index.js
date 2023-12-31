import {GET_DOG, GET_DOG_DETAIL, CLEAN_DOG_DETAIL, GET_TEMPERAMENTS, FILTER_BY_TEMPERAMENTS, PAGINATE, FILTER, RESET, SEARCH_DOG, FILTER_BY_ORIGIN} from "../Actions/action-types"

let initialState = {
    allDogs:[],
    allDogsBackUp:[],
    dogDetail: {},
    dogsFiltered: [],
    allTemperaments: [],
    filters: false,
    currentPage: 0
}

function rootReducer(state=initialState, action){
    const ITEMS_PER_PAGE = 8;

    switch (action.type) {
        case GET_DOG:
            return{
                ...state,
                allDogs: [...action.payload].splice(0, ITEMS_PER_PAGE),
                allDogsBackUp: action.payload
            }

        case SEARCH_DOG:
            return{
                ...state,
                allDogs: [...action.payload].splice(0, ITEMS_PER_PAGE),
                dogsFiltered: action.payload,
                filters: true,
                currentPage: 0
            }

        case GET_DOG_DETAIL:
            return{
                ...state,
                dogDetail: action.payload
            }
    
        case CLEAN_DOG_DETAIL:
            return{
                ...state,
                dogDetail: {}
            }

        case GET_TEMPERAMENTS:
            return{
                ...state,
                allTemperaments: action.payload
            }

        case FILTER_BY_TEMPERAMENTS:
            return{
                ...state,
                allDogs: [...state.allDogsBackUp].filter(dog => dog.temperament?.includes(action.payload)).splice(0, ITEMS_PER_PAGE),
                dogsFiltered: [...state.allDogsBackUp].filter(dog => dog.temperament?.includes(action.payload)),
                currentPage: 0
            }

        case FILTER_BY_ORIGIN:
            if(action.payload === "DB"){
                return{                    
                    ...state,
                    allDogs: [...state.allDogsBackUp].filter(dog => dog.hasOwnProperty("created")).splice(0, ITEMS_PER_PAGE),
                    dogsFiltered: [...state.allDogsBackUp].filter(dog => isNaN(parseInt(dog.id))),
                    currentPage: 0
                }
            }else{
                return{
                    ...state,
                    allDogs: [...state.allDogsBackUp].filter(dog => !dog.hasOwnProperty("created")).splice(0, ITEMS_PER_PAGE),
                    dogsFiltered: [...state.allDogsBackUp].filter(dog => !isNaN(parseInt(dog.id))),
                    currentPage: 0
                }
            }           

        case PAGINATE:           
            const next_page = state.currentPage +1;
            const prev_page = state.currentPage -1;
            const firstIndex = action.payload === "next" ? next_page * ITEMS_PER_PAGE : prev_page * ITEMS_PER_PAGE

            if(state.filters){
                if(action.payload === "next" && firstIndex >= state.dogsFiltered.length) return state
                else if(action.payload === "prev" && prev_page < 0) return state

                return{
                    ...state,
                    allDogs: [...state.dogsFiltered].splice(firstIndex, ITEMS_PER_PAGE),
                    currentPage: action.payload === "next" ? next_page : prev_page
                }
            }

            if(action.payload === "next" && firstIndex >= state.allDogsBackUp.length) return state
            else if(action.payload === "prev" && prev_page < 0) return state
            
            return{
                ...state,
                allDogs: [...state.allDogsBackUp].splice(firstIndex, ITEMS_PER_PAGE),
                currentPage: action.payload ===  "next" ? next_page : prev_page
            }
            

        case FILTER:
            switch(action.payload){
                case "AZ":
                    let asc = []
                    if(state.filters){
                        asc = [...state.dogsFiltered].sort((prev, next) => {
                            if(prev.name.toLowerCase() > next.name.toLowerCase()) return 1
                            if(prev.name.toLowerCase() < next.name.toLowerCase()) return -1
                            return 0
                        })
                        return{
                            ...state,
                            allDogs: [...asc].splice(0, ITEMS_PER_PAGE),
                            dogsFiltered: asc,
                            currentPage: 0
                        }
                    }else{
                        asc = [...state.allDogsBackUp].sort((prev, next) => {
                            if(prev.name.toLowerCase() > next.name.toLowerCase()) return 1
                            if(prev.name.toLowerCase() < next.name.toLowerCase()) return -1
                            return 0
                        })
                        return{
                            ...state,
                            allDogs: [...asc].splice(0, ITEMS_PER_PAGE),
                            allDogsBackUp: asc,
                            currentPage: 0
                        }
                    }

                case "ZA":
                    let desc = []
                    if(state.filters){
                        desc = [...state.dogsFiltered].sort((prev, next) => {
                            if(prev.name.toLowerCase() > next.name.toLowerCase()) return -1
                            if(prev.name.toLowerCase() < next.name.toLowerCase()) return 1
                            return 0
                        })
                        return{
                            ...state,
                            allDogs: [...desc].splice(0,ITEMS_PER_PAGE),
                            dogsFiltered: desc,
                            currentPage: 0
                        }
                    }else{
                        desc = [...state.allDogsBackUp].sort((prev, next) => {
                            if(prev.name.toLowerCase() > next.name.toLowerCase()) return -1
                            if(prev.name.toLowerCase() < next.name.toLowerCase()) return 1
                            return 0
                        })
                        return{
                            ...state,
                            allDogs: [...desc].splice(0, ITEMS_PER_PAGE),
                            allDogsBackUp: desc,
                            currentPage: 0
                        }
                    }
            }

        case RESET:
            return{
                ...state,
                allDogs: [...state.allDogsBackUp].splice(0, ITEMS_PER_PAGE),
                dogsFiltered: [].splice(0, ITEMS_PER_PAGE),             
                currentPage: 0
            }

        default: return state
    }

}

export default rootReducer