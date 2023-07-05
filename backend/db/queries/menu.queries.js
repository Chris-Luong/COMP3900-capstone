const getAllMenuItems = `
  SELECT * FROM menuItems
`;

const getCategories = `
  SELECT * FROM categories
`;

module.exports = {
  getAllMenuItems,
  getCategories
};