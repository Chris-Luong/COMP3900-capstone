const getAllMenuItems = `
  SELECT menuitems.* FROM menuItems
`;

const filterCategory = `
  JOIN menuitemscategories ON menuitems.id = menuitemscategories.itemId
  JOIN categories ON menuitemscategories.categoryId = categories.id
  WHERE categories.name = '?'
`

const filterPrice = `
  WHERE menuitems.price <= ? AND menuitems.price >= ?
`

const filterPriceAND = `
  AND menuitems.price <= ? AND menuitems.price >= ?
`

const sortMenuItems = `
  ORDER BY ? ?
`

const searchMenuItems = `
  WHERE menuitems.name LIKE '%?%'
`

const searchMenuItemsAND = `
  AND menuitems.name LIKE '%?%'
`

module.exports = {
  getAllMenuItems,
  filterCategory,
  sortMenuItems,
  searchMenuItems,
  searchMenuItemsAND,
  filterPrice,
  filterPriceAND
};