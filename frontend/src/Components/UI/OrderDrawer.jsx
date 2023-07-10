import { Fragment, useState, useEffect } from "react";
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

const OrderDrawer = (orderItems, setOrderItems) => {
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

  const orderArray = orderItems.orderItems;

  // TODO: useEffect or something to update the orderItems with new orderItems
  // returned from this function
  // useEffect(() => {
  //   const newOrderItems = applyFilters(orderArray);
  //   setState({ ...state, orderItems: newOrderItems });
  // }, [orderArray]);
  // const handleDelete = (index) => {
  //   deleteItem(index);
  // };
  const handleRemoveOrderItem = (index) => {
    setOrderItems((prevArray) => {
      return prevArray.filter((item, i) => i !== index);
    });
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
        {orderArray.length
          ? orderArray.map((item, index) => (
              <>
                <ListItem key={item}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.note} />
                  <DeleteOutlineIcon
                    color='warning'
                    onClick={() => handleRemoveOrderItem(index)}
                  />
                </ListItem>
                {/* Could remove if clutters UI */}
                <Divider />
              </>
            ))
          : null}
      </List>
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
