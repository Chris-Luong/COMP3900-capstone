// contains functions that are used by multiple components

import sendRequest from "./Utils/Request";

export const getAllMenuItems = async () => {
  try {
    const res = await sendRequest("/menu", "GET");
    return res;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getAllCategories = async () => {
  try {
    const res = await sendRequest("/categories", "GET");
    const categories = [];
    for (const category in res.categories) {
      categories.push(res.categories[category]);
    }
    return categories;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const applyFilters = async (
  search,
  category,
  minPrice,
  maxPrice,
  sortType,
  sortOrder
) => {
  try {
    let url = "/menu?";
    url += search ? `&search=${search}` : "";
    url += category ? `&category=${category}` : "";
    url += minPrice || minPrice === 0 ? `&min_price=${minPrice}` : "";
    url += maxPrice || maxPrice === 0 ? `&max_price=${maxPrice}` : "";
    url += sortType ? `&sort_type=${sortType}` : "";
    url += sortOrder ? `&sort_order=${sortOrder}` : "";

    const res = await sendRequest(url, "GET");
    return res.items;
  } catch (err) {
    console.log(err);
    return [];
  }
};
