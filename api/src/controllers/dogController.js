const axios = require("axios")
const { Dog, Temperament } = require("../db")

const {API_KEY} = process.env

const getDogApi = async() => {
    const info = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`).then(res => res.data.map(dog => {
        return {
            id: dog.id,
            name: dog.name,
            image: dog.image.url,
            min_height: dog.height.metric.split(" - ")[0],
            max_height: dog.height.metric.split(" - ")[1] ? dog.height.metric.split(" - ")[1] : ((dog.height.metric.split(" - ")[0]*1)+1).toString(),
            min_weight: dog.weight.metric === "NaN" ? "30" : dog.weight.metric.split(" - ")[0] === "NaN" ? "5" : dog.weight.metric.split(" - ")[0],
            max_weight: dog.weight.metric === "NaN" ? "60" : dog.weight.metric.split(" - ")[1] ? dog.weight.metric.split(" - ")[1] : ((dog.weight.metric.split(" - ")[0]*1)+1).toString(),            
            life_span: dog.life_span,
            temperament: dog.temperament
        }
    }))
    return info
}

const getDogDb = async () => {
    const dogDb = await Dog.findAll({
        include: [
            { model: Temperament,
                attributes: ["name"],
                through: { attributes: [] }
            }
        ]
    })   
    const dogMap = dogDb.map (dog => {
        const {id, name, image, min_height, max_height, min_weight, max_weight, life_span, temperaments} = dog
        return {
            id,
            name,
            image,
            min_height,
            max_height,
            min_weight,
            max_weight,
            life_span,
            temperament: temperaments?.map(dog => dog.name).join(`, `),
            created: dog.createInDb         
        } 
    })
    return dogMap
}

const getAllDogs = async (name) => {
    const dogDb = await getDogDb()
    const dogApi = await getDogApi()

    const allDogs = [...dogDb, ...dogApi]

    if(name){
        const dogFIlter = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
        if(!dogFIlter.length) throw new Error(`Dog not found: ${name}`)
        return dogFIlter
    }

    return allDogs
}

const getDogId = async (id) => {
    if(isNaN(id)){
        const dogDb = await Dog.findByPk(id, {
            include: [
                { model: Temperament,
                    attributes: ["name"],
                    through: { attributes: [] }
                }
            ],
        } )     
        return {
            id: dogDb.id,
            name: dogDb.name,
            image: dogDb.image,
            min_height: dogDb.min_height,
            max_height: dogDb.max_height,
            min_weight: dogDb.min_weight,
            max_weight: dogDb.max_weight,
            life_span: dogDb.life_span,
            temperament: dogDb.temperaments?.map(dog => dog.name).join(`, `) 
        }   
    } else {
        const api = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)
        const info = await api.data

        const dogId = {
            id: info.id,
            name: info.name,
            image: `https://cdn2.thedogapi.com/images/${info.reference_image_id}.jpg`,            
            min_height: info.height.metric.split(" - ")[0],
            max_height: info.height.metric.split(" - ")[1] ? info.height.metric.split(" - ")[1] : ((info.height.metric.split(" - ")[0]*1)+1).toString(),
            min_weight: info.weight.metric === "NaN" ? "30" : info.weight.metric.split(" - ")[0] === "NaN" ? "5" : info.weight.metric.split(" - ")[0],
            max_weight: info.weight.metric === "NaN" ? "60" : info.weight.metric.split(" - ")[1] ? info.weight.metric.split(" - ")[1] : ((info.weight.metric.split(" - ")[0]*1)+1).toString(),
            life_span: info.life_span,
            temperament: info.temperament
        }
        return dogId
    }
}

const createDog = async (name, image, min_height, max_height, min_weight, max_weight, life_span, temperament) => {

    if(!name) throw new Error ("name is required")
    const exist = await Dog.findOne({ where: { name: name }})
    if(exist) throw new Error ("Dog already exist")

    if(!image) image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlP36My9zX2bdIF66W6YPilKPo8hDL84NrYL_muGHws6A0uELBGzfUa9zqZqw0fclGLUA&usqp=CAU"

    const dog = await Dog.create({
        name,
        image,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_span,
        temperament
    })

    const searchTemperament =  await Temperament.findAll({
        where: { name: temperament}
    })

    await dog.addTemperament(searchTemperament)
    return dog
}

module.exports = {
    getAllDogs,
    getDogId,
    createDog
}