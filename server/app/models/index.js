const dbConfig = require("../config/db.config.js")
const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.recipes = require("./recipe.model.js")(mongoose)
db.auth = require("./User.model.js")(mongoose) //added while creating Auth

module.exports = db