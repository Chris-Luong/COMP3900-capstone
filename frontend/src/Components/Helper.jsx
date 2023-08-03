import sendRequest from "./Utils/Request";
import * as Yup from "yup";

// contains functions that are used by multiple components

/*
  account functions
*/
export const loginUser = async (body) => {
  const res = await sendRequest("/login", "POST", body);
  localStorage.setItem("token", res.token);
  return res;
};

export const deleteUser = async (id) => {
  const res = await sendRequest("/account/delete", "DELETE", { id });
  return res.message;
};

/*
  menu functions
*/
export const getAllMenuItems = async () => {
  const res = await sendRequest("/menu", "GET");
  return res;
};

export const getAllCategories = async () => {
  const res = await sendRequest("/categories", "GET");
  const categories = [];
  for (const category in res.categories) {
    categories.push(res.categories[category]);
  }
  return categories;
};

export const applyFilters = async (
  search,
  category,
  minPrice,
  maxPrice,
  sortType,
  sortOrder
) => {
  let url = "/menu?";
  url += search ? `&search=${search}` : "";
  url += category ? `&category=${category}` : "";
  url += minPrice || minPrice === 0 ? `&min_price=${minPrice}` : "";
  url += maxPrice || maxPrice === 0 ? `&max_price=${maxPrice}` : "";
  url += sortType ? `&sort_type=${sortType}` : "";
  url += sortOrder ? `&sort_order=${sortOrder}` : "";

  const res = await sendRequest(url, "GET");
  return res;
};

export const sendOrder = async (body) => {
  const res = await sendRequest("/orders/create", "POST", body);
  console.log(res);
  // alert("SUCCESS: order id is " + res.orderId);
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
  const res = await sendRequest(`/orders/tables/${tableId}`, "GET");
  return res;
};

export const retrieveOrderItems = async (orderId) => {
  const res = await sendRequest(`/orders?orderId=${orderId}`, "GET");
  return res;
};

export const deleteTableOrders = async () => {
  const body = { tableId: localStorage.getItem("tableId") };
  const res = await sendRequest("/orders/delete", "DELETE", body);
  return res.message;
};

/*
  String constants for status
*/
export const PREPARING_STATUS = "Preparing";
export const READY_STATUS = "Ready To Serve";
export const SERVED_STATUS = "Served";

export const PAID_STATUS = {
  Unpaid: "Unpaid",
  Requesting: "Requesting",
  Paid: "Paid",
};

export const Request = {
  Status: {
    Waiting: "Waiting",
    Completed: "Completed",
  },
  Type: {
    Bill: "Bill",
    Assistance: "Assistance",
  },
};

/*
  request functions
*/
export const createWaiterRequest = async (tableId, type, description) => {
  const body = {
    tableId,
    type,
    description,
  };
  const res = await sendRequest("/request/create", "POST", body);
  return res;
};

export const getWaiterRequests = async () => {
  const res = await sendRequest(
    `/request?status=${Request.Status.Waiting}`,
    "GET"
  );
  return res;
};

export const completeWaiterRequest = async (id) => {
  const res = await sendRequest(`/request/complete?id=${id}`, "PUT");
  return res;
};

/*
  order functions
*/
export const retrieveOrdersByStatus = async (status) => {
  const res = await sendRequest(`/orders/${status}`, "GET");
  return res;
};

export const updateOrderItemStatus = async (id, status) => {
  const res = await sendRequest(
    `/orders/update?id=${id}&newStatus=${status}`,
    "PUT"
  );
  return res;
};

export const updateOrderPayStatus = async (orderArr, status, accountId) => {
  let params = "";
  orderArr.forEach((orderId) => {
    params += `orderIds=${orderId}&`;
  });
  const res = await sendRequest(
    `/orders/pay?${params}accountId=${accountId}&status=${status}`,
    "PUT"
  );
  return res;
};

/*
  function for converting larger files for transfer over endpoints
*/
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

/*
  manager functions
*/
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
  const res = await sendRequest(`/categories/${id}`, "GET");
  return res.categoryNames;
};

/*
  booking functions here
*/
export const createBooking = async (body) => {
  const res = await sendRequest(`/bookings/create`, "POST", body);
  return res;
};

// If using date, add an empty string before i.e. ("", {date})
export const getBookings = async (account, date) => {
  let url = "/bookings?";
  url += account ? `&accountId=${account}` : "";
  url += date ? `&date=${date}` : "";
  const res = await sendRequest(url, "GET");
  return res;
};

export const deleteBooking = async (bookingId) => {
  const res = await sendRequest(`/bookings/delete`, "DELETE", {
    id: bookingId,
  });
  return res;
};

export const deleteBookingByAccount = async (accountId) => {
  const res = await sendRequest(`/bookings/deleteAccount`, "DELETE", {
    id: accountId,
  });
  return res;
};

export const getBookingById = async (bookingId) => {
  try {
    const res = await sendRequest(`/bookings/${bookingId}`, "GET");
    return res[0];
  } catch (err) {
    alert(err);
    return null;
  }
};

export const verifyBookingId = async (bookingId) => {
  const res = await sendRequest(`/bookings/verify/${bookingId}`, "GET");
  return res;
};

export const updateBooking = async (body) => {
  try {
    const res = await sendRequest(`/bookings/update`, "PUT", body);
    return res;
  } catch (err) {
    alert(err);
    return null;
  }
};

/*
  style objects
*/
export const checkboxStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
};

/*
  form validation schema
*/
export const createMenuItemSchema = Yup.object().shape({
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

export const editMenuItemSchema = Yup.object().shape({
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
  thumbnail: Yup.mixed(),
});

export const newCategorySchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

export const createBookingSchema = Yup.object().shape({
  guests: Yup.string().required("Number of guests is required"),
});
