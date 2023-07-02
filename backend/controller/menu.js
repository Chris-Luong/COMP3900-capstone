const { Menu, NOT_FOUND } = require('../models/menu.model');

menu = (req, res) => {
  Menu.getAllMenuItems((err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(NOT_FOUND).json({ message: "Items Not Found" });
    }
    console.log("================================");
    console.log(result[0].name);
    console.log("================================");
    res.status(200).json({items: result}); 
  });
};

module.exports = menu;