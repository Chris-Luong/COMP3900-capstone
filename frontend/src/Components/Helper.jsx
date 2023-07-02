// contains functions that are used by multiple components

import sendRequest from "./Utils/Request"

export const getAllMenuItems = async () => {
  try {
    const res = await sendRequest('/menu', 'GET');
    const items = [];
    // console.log(res.items.length);
    // res.items.forEach((item) => {
    //   // console.log(item);
    //   items.push(item);
    // })
    // items.push(res.items);
    // console.log(res.items);
    for (const item in res.items) {
      // console.log(item);
      items.push(res.items[item]);
    }
    console.log(items);
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
};