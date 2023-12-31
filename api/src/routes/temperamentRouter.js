const { Router } = require("express")
const { getTemperamentHandler } = require("../handlers/temperamentHandler")

const temperamentRouter = Router()

temperamentRouter.get("/", getTemperamentHandler)

module.exports = temperamentRouter