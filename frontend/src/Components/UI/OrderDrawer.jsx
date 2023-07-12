import { Fragment, useEffect, useState, useContext } from "react";
import RestaurantContext from "../Context/restaurant-context";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Typography,
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const OrderDrawer = ({ orderItems, onDelete, handleSendOrder }) => {
  const checkIn = useContext(RestaurantContext);
  const navigate = useNavigate();
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

  console.log(orderItems);

  const handleRemoveFromCart = (index) => {
    onDelete(index);
  };

  const handleRequestBill = async () => {
    // add request bill request here
    alert("Looks like you're done with your order. Logging you out");
    checkIn.setIsCheckedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("checkedIn");
    navigate("/restaurant");
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

  // TODO: Get accountId from email of user?
  const list = (anchor) => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ margin: "10px" }}
      >
        My Order
      </Typography>
      <List>
        {orderItems && orderItems.length > 0
          ? orderItems.map((item, index) => (
              <>
                {index !== 0 ? <Divider key={item} /> : null}
                <ListItem
                  key={item}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Container>
                    <ListItemText
                      primary={item.name}
                      secondary={"$" + item.price}
                    />
                    <ListItemText
                      primary={`Qty: ${item.quantity}`}
                      secondary={item.note ? `Notes: ${item.note}` : null}
                    />
                  </Container>
                  <DeleteOutlineIcon
                    color="warning"
                    onClick={() => handleRemoveFromCart(index)}
                  />
                </ListItem>
              </>
            ))
          : null}
      </List>
      <Divider sx={{ borderBottomWidth: 3 }} />
      {/* TODO: useState fn to check hasSentOrder - if has sent then
      disable this button and enable the req bill button */}
      <Container sx={{ mt: "1rem" }}>
        <Typography align="center">Order Total: ${orderSum}</Typography>
        <Button
          fullWidth
          disabled={orderItems.length === 0}
          onClick={handleSendOrder}
        >
          Submit order
        </Button>
        {/* TODO: add list of all orders associated with this table */}
        {/* TODO: have another total for multiple submitted orders */}
      </Container>
      <Divider sx={{ borderBottomWidth: 3 }} />
      <List>
        <ListItem>ID: 1 | status: completed</ListItem>
        <ListItem>ID: 2 | status: preparing</ListItem>
        <ListItem>ID: 3 | status: sent to kitchen</ListItem>
      </List>
      <Container sx={{ mt: "0.5rem" }}>
        <Typography align="center">Table Total: $100.00</Typography>
        <Button fullWidth onClick={handleRequestBill}>
          Request Bill
        </Button>
        {/* TODO: add list of all orders associated with this table */}
        {/* TODO: have another total for multiple submitted orders */}
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
