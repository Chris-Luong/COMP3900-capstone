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
  CircularProgress,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// TODO: Make delete cursor: pointer on hover
const OrderDrawer = ({
  orderItems,
  onDelete,
  handleSendOrder,
  tableOrders,
  loading
}) => {
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
  const [tableSum, setTableSum] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const handleRemoveFromCart = (index) => {
    onDelete(index);
  };

  const handleRequestBill = async () => {
    // add request bill request here
    alert("Looks like you're done with your order. Logging you out");
    checkIn.setIsCheckedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("checkedIn");
    localStorage.removeItem("tableId");
    navigate("/restaurant");
  };

  // Updated order total everytime the order is updated
  useEffect(() => {
    setIsLoading(true);
    let total = 0;
    if (orderItems && orderItems.length > 0) {
      orderItems.forEach((item) => {
        total += item.quantity * item.price;
      });
    }
    setOrderSum(+total.toFixed(2));
    setIsLoading(false);
  }, [orderItems]);

  const handleSubmit = () => {
    setIsLoading(true);
    setTableSum(+(tableSum + orderSum).toFixed(2));
    handleSendOrder();
    setIsLoading(false);
  };

  // TODO: Get accountId from email of user?
  const list = (anchor) => (
    <Box
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
              <Box key={`pending-order-ctn-${item.id}-${index}`}>
                {index !== 0 ? <Divider key={`Divider-${index}`} /> : null}
                <ListItem
                  key={`pending-order-${item}-${index}`}
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
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleRemoveFromCart(index)}
                  />
                </ListItem>
              </Box>
            ))
          : null}
      </List>
      {/* TODO: useState fn to check hasSentOrder - if has sent then
      disable this button and enable the req bill button */}
      <Container sx={{ mt: "0.5rem" }}>
        <Typography align="center">Order Total: ${orderSum}</Typography>
        <Button
          color="secondary"
          disabled={orderItems.length === 0}
          onClick={handleSubmit}
          fullWidth
        >
          Submit order
        </Button>
      </Container>
      <Divider sx={{ borderBottomWidth: 3 }} />
      {loading && <CircularProgress sx={{ alignSelf: "center", mt: "50%" }} />}
      {tableOrders.length !== 0 ? (
        <List>
          {tableOrders.map((order) => (
            <Box key={`order-ctn-${order.id}`}>
              <ListItem key={`order-${order.id}`}>
                <ListItemText primary={`Order ID: ${order.id}`} />
                <ListItemText primary={`$${order.subtotal}`} />
              </ListItem>
              {/* TODO: should show this all the time but isnt
              refreshing sometimes shows it */}
              {order.menuItems && order.menuItems.length !== 0 && (
                <List
                  key={`order-item-list-${order.id}`}
                  sx={{ padding: "0 28px" }}
                >
                  {order.menuItems.map((item) => (
                    <Box key={`order-item-ctn-${item.orderItemId}`}>
                      <ListItemText
                        key={`order-item-${item.orderItemId}`}
                        primary={item.itemName}
                        secondary={`Qty: ${item.quantity}`}
                      />
                      <ListItemText
                        key={`order-item-status-${item.orderItemId}`}
                        secondary={item.status}
                      />
                    </Box>
                  ))}
                </List>
              )}
            </Box>
          ))}
        </List>
      ) : null}
      <Container sx={{ mt: "0.5rem" }}>
        <Typography align="center">Table Total: ${tableSum}</Typography>
        <Button
          color="secondary"
          disabled={tableOrders.length === 0}
          onClick={handleRequestBill}
          fullWidth
        >
          Request Bill
        </Button>
      </Container>
    </Box>
  );

  return (
    <div>
      <Fragment key={"right"}>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          variant='permanent'
          sx={{
            width: "400px",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "400px",
              boxSizing: "border-box",
            },
          }}
        >
          {isLoading ? <CircularProgress /> : list("right")}
        </Drawer>
      </Fragment>
    </div>
  );
};

export default OrderDrawer;
