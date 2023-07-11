import { Fragment, useState } from "react";
import { Avatar, Button, ListItemAvatar, Typography } from "@mui/material";
import sendRequest from "../Utils/Request";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// NOTE: find the differnce betwwen passing in arges like this and ({ orderItems, onDelete })
const OrderDrawer = (orderItems, onDelete) => {
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const accountId = 1; // Need to get actual account id
  const tableId = 1; // Need function to genererate the table id

  const orderArray = orderItems.orderItems;
  console.log(orderArray);
  // TODO: useEffect or something to update the orderItems with new orderItems
  // returned from this function
  // useEffect(() => {
  //   const newOrderItems = applyFilters(orderArray);
  //   setState({ ...state, orderItems: newOrderItems });
  // }, [orderArray]);
  // const handleDelete = (index) => {
  //   deleteItem(index);
  // };

  const handleRemoveFromCart = async (index) => {
    onDelete(index);
  };

  const sendOrder = async () => {
    const items = orderArray.map((item) => {
      return {
        id: item.itemId,
        quantity: item.quantity,
        note: item.note,
      };
    });
    console.log("items are ", items);
    const body = {
      accountId: accountId,
      tableId: tableId,
      items: items,
    };
    console.log("body is ", body);
    try {
      const response = await sendRequest("/orders/create", "POST", body);
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        alert(data.message);
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  // TODO: Get accountId from email of user? Generate int for tableId -> useState increment
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography
        variant='h4'
        gutterBottom
        align='center'
        sx={{ margin: "10px" }}
      >
        My Order
      </Typography>
      <List>
        {orderArray && orderArray.length > 0
          ? orderArray.map((item, index) => (
              <>
                {index !== 0 ? <Divider /> : null}
                <ListItem key={item}>
                  <ListItemAvatar>
                    {index % 2 === 0 ? (
                      <Avatar>R</Avatar>
                    ) : (
                      <Avatar variant='square'>S</Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={"$" + item.price}
                  />
                  <DeleteOutlineIcon
                    color='warning'
                    onClick={() => handleRemoveFromCart(index)}
                  />
                </ListItem>
                {/* Could remove if clutters UI */}
                {/* <Divider /> */}
              </>
            ))
          : null}
      </List>
      <Divider sx={{ borderBottomWidth: 5 }} />
      {/* TODO: get sum of bill with sum(quantity * price of all items) */}
      <Button onClick={sendOrder}>Submit order</Button>
    </Box>
  );

  return (
    <div>
      <Fragment key={"right"}>
        <Button onClick={toggleDrawer("right", true)}>View order</Button>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </Fragment>
    </div>
  );
};

export default OrderDrawer;
