const axios = require('axios');

const config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.infocons.ro/api/en/open/food',
  headers: {
    'Content-Type': 'application/json',
  },
};

getInfoConsIngredients = async (req, res) => {
  const data = {
    word: req.query['name'] ?? '',
  };
  try {
    const response = await axios({ ...config, data });
    res.json(response.data);
  } catch (err) {
    res.send(err);
  }
};

module.exports = { getInfoConsIngredients };
