module.exports = (mongoose) => {
  const Recipe = mongoose.model(
    'recipe',
    mongoose.Schema(
      {
        name: { type: String, required: true, unique: true },
        quantity: { type: Number },
        date: { type: String },
        ingredients: [{}],
        nutriments: {
          calories: { type: Number },
          fat: { type: Number },
          saturated_fat: { type: Number },
          carbohydrates: { type: Number },
          sugars: { type: Number },
          proteins: { type: Number },
          salt: { type: Number },
        },
        additives: [],
        nutriscore: { type: String },
        nutriscore_TEMP: {},
      },
      { timestamps: true }
    )
  );
  return Recipe;
};
