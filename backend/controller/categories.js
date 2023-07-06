const { Menu, NOT_FOUND } = require("../models/menu.model");

categories = (req, res) => {
  Menu.getCategories((err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(NOT_FOUND).json({ message: "Category Not Found" });
    }
    res.status(200).json({ categories: result });
  });
};

module.exports = categories;
