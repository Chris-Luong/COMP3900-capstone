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
    return res;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const sendOrder = async (body) => {
  try {
    const res = await sendRequest("/orders/create", "POST", body);
    console.log(res);
    alert("SUCCESS: order id is " + res.orderId);
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

export const getOrders = async () => {
  try {
    const res = await sendRequest("/orders", "GET");
    return res;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const retrieveOrdersWithTableId = async (tableId) => {
  try {
    const res = await sendRequest(`/orders/tables/${tableId}`, "GET");
    return res;
  } catch (err) {
    alert(err);
    console.log(err);
  }
};

export const retrieveOrderItems = async (orderId) => {
  try {
    const res = await sendRequest(`/orders?orderId=${orderId}`, "GET");
    return res;
  } catch (err) {
    alert(err);
    console.log(err);
  }
};

export const retrieveOrdersByStatus = async () => {
  const role = localStorage.getItem("role");
  const status = role === "Kitchen Staff" ? "Preparing" : "Ready To Serve";
  try {
    const res = await sendRequest(`/orders/pending/${status}`, "GET");
    return res;
  } catch (err) {
    alert(err);
    console.log(err);
  }
};

export function fileToDataUrl(file) {
  if (!file) {
    return null;
  }
  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  console.log(file);
  reader.readAsDataURL(file);
  return dataUrlPromise;
}

export const addItem = async ({
  name,
  description,
  ingredients,
  categories,
  price,
  thumbnail,
}) => {
  const formData = new FormData();
  formData.append("thumbnail", thumbnail);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("ingredients", ingredients);
  categories.forEach((c) => formData.append("categories", c));
  formData.append("price", price);

  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8800/menu/add`, {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (!res.ok) {
        res.json().then((data) => {
          reject(data.message);
        });
      } else {
        res.json().then((data) => {
          resolve(data.message);
        });
      }
    });
  });
};

export const editItem = async (
  id,
  name,
  description,
  ingredients,
  categories,
  price,
  thumbnail
) => {
  let url = "/menu/edit?";
  url += `id=${id}`;
  url += name ? `&name=${name}` : "";
  url += description ? `&description=${description}` : "";
  url += ingredients ? `&ingredients=${ingredients}` : "";
  categories.forEach((c) => {
    url += categories ? `&categories=${c}` : "";
  });
  url += price ? `&price=${price}` : "";

  const formData = new FormData();
  formData.append("thumbnail", thumbnail);

  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8800${url}`, {
      method: "PUT",
      body: formData,
    }).then((res) => {
      if (!res.ok) {
        res.json().then((data) => {
          reject(data.message);
        });
      } else {
        res.json().then((data) => {
          resolve(data.message);
        });
      }
    });
  });
};

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
    .min(0, "Price can't be negative")
    .max(1000, "Maximum price is 1000"),
  thumbnail: Yup.mixed().required("Thumbnail is required"),
});
