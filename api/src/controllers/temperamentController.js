const axios = require("axios")
const { Temperament } = require("../db")
const { API_KEY } = process.env

const getTemperamentApi = async () => {
    const allTemperament = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key${API_KEY}`)

    const allTemperaments = allTemperament.data.map((d) => (d.temperament ? d.temperament : "No info")).map((d) => d.split(", "))

    let oneTemperament = [...new Set(allTemperaments.flat())]
    oneTemperament.forEach((t) => {
        if(t){
            Temperament.findOrCreate({
                where: { name: t }
            })
        }
    })
    oneTemperament = await Temperament.findAll()
    return oneTemperament
}

module.exports = {
    getTemperamentApi
}