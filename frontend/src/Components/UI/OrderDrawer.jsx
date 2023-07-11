import { Fragment, useState } from "react";
import { Button } from "@mui/material";

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

  const sendOrder = () => {
    const items = orderArray.map((item) => {
      return {
        id: item.itemId,
        quantity: item.quantity,
        note: item.note,
      };
    });
    console.log(items);
    // try {
    //   const response = await sendRequest("/orderItem/add", "POST", body);
    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log(data.message);
    //     alert(data.message);
    //   } else {
    //     throw new Error("Failed to add item to cart");
    //   }
    // } catch (error) {
    //   alert(error);
    //   console.log(error);
    // }
  };
  // TODO: Get accountId from email of user? Generate int for tableId -> useState increment
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderBottomWidth: 5 }} />
      <List>
        {orderArray && orderArray.length > 0
          ? orderArray.map((item, index) => (
              <>
                <ListItem key={item}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  <DeleteOutlineIcon
                    color='warning'
                    onClick={() => handleRemoveFromCart(index)}
                  />
                </ListItem>
                {/* Could remove if clutters UI */}
                <Divider />
              </>
            ))
          : null}
      </List>
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
