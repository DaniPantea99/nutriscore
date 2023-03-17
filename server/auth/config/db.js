//This file should be temporary, just to test Auth without Docker
const mongoose = require('mongoose')

const connectDB = async() => {
    await mongoose.connect("mongodb://127.0.0.1/node_auth", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    })

    console.log("MongoDB connected!")
}

module.exports = connectDB