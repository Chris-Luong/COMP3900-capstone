import { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import { sendOrder } from "../Helper";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const OrderDrawer = ({ orderItems, onDelete }) => {
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

  const [orderSum, setOrderSum] = useState(0);
  const accountId = 1; // Need to get actual account id
  const tableId = 1; // Need function to genererate the table id

  console.log(orderItems);

  const handleRemoveFromCart = (index) => {
    onDelete(index);
  };

  const handleSendOrder = async () => {
    const items = orderItems.map((item) => {
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
    await sendOrder(body);
  };

  // Updated order total everytime the order is updated
  useEffect(() => {
    let total = 0;
    if (orderItems && orderItems.length > 0) {
      orderItems.forEach((item) => {
        total += item.quantity * item.price;
      });
    }
    setOrderSum(total);
  }, [orderItems]);

  // TODO: Get accountId from email of user? Generate int for tableId -> useState increment
  const list = (anchor) => (
    <Box
      sx={{ width: 300 }}
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
        {orderItems && orderItems.length > 0
          ? orderItems.map((item, index) => (
              <>
                {index !== 0 ? <Divider /> : null}
                <ListItem
                  key={item}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  {/* TODO: Replace with thumbnail */}
                  <ListItemAvatar>
                    <Avatar variant='square'>Pic</Avatar>
                  </ListItemAvatar>
                  <Container>
                    <ListItemText
                      primary={item.name}
                      secondary={"$" + item.price}
                    />
                    <ListItemText
                      primary={"Notes: " + item.note}
                      secondary={"Qty: " + item.quantity}
                    />
                  </Container>

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
      {/* TODO: useState fn to check hasSentOrder - if has sent then
      disable this button and enable the req bill button */}
      <Container sx={{ mt: "1rem" }}>
        <Typography align='center'>Total: ${orderSum}</Typography>
        <Button onClick={() => handleSendOrder()}>Submit order</Button>
        <Button disabled>Request Bill</Button>
      </Container>
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
