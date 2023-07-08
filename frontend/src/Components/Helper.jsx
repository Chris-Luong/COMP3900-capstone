// contains functions that are used by multiple components

import sendRequest from "./Utils/Request";
import * as Yup from "yup";

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

export const editItem = async (id, name, description, ingredients, categories, price, thumbnail) => {
  let url = "/menu/edit?";
  url += `id=${id}`;
  url += name ? `&name=${name}` : "";
  url += description ? `&description=${description}` : "";
  url += ingredients ? `&ingredients=${ingredients}` : "";
  url += categories ? `&categories=${categories}` : "";
  url += price ? `&price=${price}` : "";

  console.log(url);

  try {
    const res = await sendRequest(url, "PUT");
    return res.message;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export const getCategoryNamesFromItemId = async (id) => {
  try {
    const res = await sendRequest(`/categories/${id}`, "GET");
    return res.categoryNames;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const checkboxStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
};

export const menuItemSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  ingredients: Yup.string().required("Ingredients are required"),
  categories: Yup.array()
    .required("Categories required.")
    .min(1, "Categories required."),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price can't be negative"),
});
