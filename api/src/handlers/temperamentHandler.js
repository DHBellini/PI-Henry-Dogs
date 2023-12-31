const { getTemperamentApi }  = require("../controllers/temperamentController")

const getTemperamentHandler = async (req, res) => {
    try {
        const results = await getTemperamentApi()
        res.status(200).json(results)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getTemperamentHandler
}