const { Menu, NOT_FOUND } = require('../models/menu.model');

menu = (req, res) => {
  const { search, category, min_price, max_price, sort_type, sort_order } = req.query;
  Menu.getFilteredMenuItems(search, category, min_price, max_price, sort_type, sort_order, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    res.status(200).json(result); 
  });
};

addItem = (req, res) => {
  const {name, description, ingredients, categories, price, thumb} = req.body;
  Menu.addMenuItem(name, description, ingredients, categories, price, thumb, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    res.status(200).json(result); 
  })
}

removeItem = (req, res) => {
  const id = req.body;
  Menu.removeMenuItem(id, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    res.status(200).json(result); 
  })
}

module.exports = {
  menu,
  addItem,
  removeItem
};