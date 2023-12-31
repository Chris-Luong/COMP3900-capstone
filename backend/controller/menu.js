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
  const {name, description, ingredients, categories, price} = req.body;
  const thumbnail = req.body['thumbnail'];
  Menu.addMenuItem(
    name,
    description,
    ingredients,
    categories,
    price,
    thumbnail,
    (err, result) => {
      if (err) {
        return res.status(err.status).json({ message: err.message });
      }
      res.status(200).json(result);
    }
  );
}

removeItem = (req, res) => {
  const id = req.body.id;
  Menu.removeMenuItem(id, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    res.status(200).json(result); 
  })
}

editItem = (req, res) => {
  const {id, name, description, ingredients, categories, price} = req.query;
  const thumbnail = req.body['thumbnail'];
  Menu.editMenuItem(
    parseInt(id, 10),
    name,
    description,
    ingredients,
    categories,
    price,
    thumbnail,
    (err, result) => {
      if (err) {
        return res.status(err.status).json({ message: err.message });
      }
      res.status(200).json(result);
    }
  );
}

getCategories = (req, res) => {
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

addCategory = (req, res) => {
  Menu.addCategory(req.body["name"], (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    res.status(200).json(result);
  });
}

removeCategory = (req, res) => {
  Menu.removeCategory(req.body["id"], (err, result) => {
    if (err) {
      return res.status(err.status).json({message: err.message});
    }
    res.status(200).json(result);
  })
}

categoriesFromId = (req, res) => {
  const id = req.params["itemid"];
  Menu.getCategoryNames(parseInt(id, 10), (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    res.status(200).json({ categoryNames: result });
  });
}

module.exports = {
  menu,
  addItem,
  removeItem,
  editItem,
  getCategories,
  addCategory,
  removeCategory,
  categoriesFromId
};