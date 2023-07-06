const { Menu, NOT_FOUND } = require('../models/menu.model');

menu = (req, res) => {
  const { search, category, min_price, max_price, sort_type, sort_order } = req.query;
  Menu.getFilteredMenuItems(search, category, min_price, max_price, sort_type, sort_order, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(NOT_FOUND).json({ message: "Items Not Found" });
    }
    res.status(200).json({items: result}); 
  });
};

module.exports = menu;