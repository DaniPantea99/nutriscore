const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const ingredientsRouter = require('./app/routes/ingredients.routes.js');

var corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/ingredients', ingredientsRouter);

const db = require('./app/models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Nutriscore application.' });
});

require('./app/routes/recipe.routes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
