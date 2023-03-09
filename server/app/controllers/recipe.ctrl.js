const db = require('../models');
const Recipe = db.recipes;

exports.create = (req, res) => {
  //Validate request
  if (!req.body.name) {
    res.status(400).send({ message: 'Name cannot be empty!' });
    return;
  }

  //Create a Recipe
  const recipe = new Recipe({
    name: req.body.name,
    quantity: req.body.quantity,
    date: req.body.date,
    ingredients: req.body.ingredients,
    nutriments: req.body.nutriments,
    additives: req.body.additives,
    nutriscore: req.body.nutriscore,
    nutriscore_TEMP: req.body.nutriscore_TEMP,
  });

  //Save Recipe in the database
  recipe
    .save(recipe)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Recipe.',
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  Recipe.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving recipes.',
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Recipe.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: 'Not found Recipe with id ' + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: 'Error retrieving Recipe with id=' + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.id;

  Recipe.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Recipe with id=${id}. Maybe Recipe was not found!`,
        });
      } else res.send({ message: 'Recipe was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Recipe with id=' + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Recipe.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Recipe with id=${id}. Maybe Recipe was not found!`,
        });
      } else {
        res.send({
          message: 'Recipe was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Recipe with id=' + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Recipe.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Recipes were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all recipes.',
      });
    });
};

exports.findAllNutriscoreA = (req, res) => {
  Recipe.find({ nutriscore: 'A' })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while retrieving recipes.',
      });
    });
};
