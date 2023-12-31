const {
    getAllDogs,
    getDogId,
    createDog
} = require("../controllers/dogController")

const getDogsHandler = async (req, res) => {
    try {                
        const {name} = req.query
        const allDogs = await getAllDogs(name)
        res.status(200).json(allDogs)        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getDogHandler = async (req, res) => {
    const { id } = req.params
    try {
        const dogId = await getDogId(id)
        res.status(200).json(dogId)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const createDogHandler = async (req, res) => {
    try {
        const {name, image, min_height, max_height, min_weight, max_weight, life_span, temperament} = req.body
        const dog = await createDog(name, image, min_height, max_height, min_weight, max_weight, life_span, temperament)
        res.status(200).json(dog)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getDogsHandler,
    getDogHandler,
    createDogHandler
}