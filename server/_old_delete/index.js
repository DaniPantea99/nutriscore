const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const ingredientsRouter = require('./app/routes/ingredients.routes.js');

const recipeRouter = require('./routes/recipe-router');
const ingredientsRouter = require('./routes/ingredients-router');

const apiPort = 5000;
// const db = require('./db')
const mongoose = require('mongoose');

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/api/recipes', recipeRouter);
app.use('/api/ingredients', ingredientsRouter);

const mongoURI = 'mongodb://mongo:27017/react-app'

mongoose.connect(
  mongoURI || 'mongodb://localhost:27017/react-app',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log('FAILED to connect to MongoDB!');
      console.log(err);
    } else {
      console.log('CONNECTED to MongoDB!');
      // app.listen(27017);
    }
  }
);

// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
  res.send('Hello !!!');
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
