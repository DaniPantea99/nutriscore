//This file should be temporary, just to test Auth without Docker
const mongoose = require('mongoose')

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    })

    console.log("MongoDB connected!")
}

module.exports = connectDB