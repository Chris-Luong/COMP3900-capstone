// contains functions that are used by multiple components

import sendRequest from "./Utils/Request"

export const getAllMenuItems = async () => {
  try {
    const res = await sendRequest('/menu', 'GET');
    const items = [];
    for (const item in res.items) {
      items.push(res.items[item]);
    }
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
};