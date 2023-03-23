require('dotenv').config({ path: './config.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ingredientsRouter = require('./app/routes/ingredients.routes.js');
const privateRouter = require('./app/routes/private.routes.js') //For authentication
const authRouter = require('./app/routes/auth.routes.js'); //For authentication
const errorHandler = require('./app/middleware/error.middleware.js') //For authentication
const connectDB = require('./app/config/auth.db.js') //For authentication - this should be temporary, just to test Auth without Docker

const app = express();

// var corsOptions = {
//   origin: 'http://localhost:3000',
// };

//Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/api/ingredients', ingredientsRouter);
require('./app/routes/recipe.routes')(app);

//For authentication
app.use('/api/auth', authRouter);
app.use('/api/private', privateRouter);

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

//Error handler (Should be last piece of middleware)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
