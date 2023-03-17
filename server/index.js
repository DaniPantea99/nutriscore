require('dotenv').config({ path: './config.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const ingredientsRouter = require('./app/routes/ingredients.routes.js');
const authRouter = require('./auth/routes/auth.js'); //For authentication
const connectDB = require('./auth/config/db.js') //For authentication - this should be temporary, just to test Auth without Docker

var corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/ingredients', ingredientsRouter);
//For authentication
app.use('/api/auth', authRouter);

//Connect Mongodb
connectDB() //For authentication - this should be temporary, just to test Auth without Docker

// const db = require('./app/models');
// db.mongoose
//   .connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true, // newly added when creating Auth
//     useFindAndModify: true, // newly added when creating Auth
//   })
//   .then(() => {
//     console.log('Connected to database!');
//   })
//   .catch((err) => {
//     console.log('Cannot connect to the database!', err);
//     process.exit();
//   });

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Nutriscore application.' });
});

require('./app/routes/recipe.routes')(app);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
