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
import {
  PAID_STATUS,
  Request,
  createWaiterRequest,
  deleteBooking,
  deleteBookingByAccount,
  deleteTableOrders,
  deleteUser,
  updateOrderPayStatus,
} from "../Helper";
import sendRequest from "../Utils/Request";

const OrderDrawer = ({
  orderItems,
  onDelete,
  handleSendOrder,
  tableOrders,
  loading,
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
  const [loyaltyDiscount, setLoyaltyDiscount] = useState(0);
  const [hasRequestedBill, setHasRequestedBill] = useState(
    localStorage.getItem("billRequested")
  );
  const [hasPaid, setHasPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleRemoveFromCart = (index) => {
    onDelete(index);
  };

  const handleRequestBill = async () => {
    try {
      const orderIdArr = tableOrders.map((tableOrder) => tableOrder.id);
      let res = await updateOrderPayStatus(orderIdArr, PAID_STATUS.Requesting);
      alert(`${res.message}. Staff will be with you soon.`);
      localStorage.setItem("billRequested", true);
      const tableId = localStorage.getItem("tableId");
      res = await createWaiterRequest(tableId, Request.Type.Bill);
      setHasRequestedBill(true);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const handleRequestAssistance = async () => {
    const tableId = localStorage.getItem("tableId");
    try {
      const res = await createWaiterRequest(tableId, Request.Type.Assistance);
      alert(`${res.message}. We will be with you soon.`);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const handleCheckOut = async () => {
    // if guest check in, delete that account and all bookings associated
    // otherwise, for a regular customer who may have other bookings, just delete
    // their current booking
    try {
      if (localStorage.getItem("isGuest")) {
        // delete all table orders before clearing local storage
        await deleteTableOrders();
        await deleteBookingByAccount(localStorage.getItem("accountId"));
        await deleteUser(localStorage.getItem("accountId"));
      } else {
        // update loyalty points here
        if (localStorage.getItem("isLoyaltyMember")) {
          const loyaltyUpdateRes = await sendRequest(
            `/loyalty/update`,
            "POST",
            {
              accountId: localStorage.getItem("accountId"),
              tableId: localStorage.getItem("tableId"),
            }
          );
          console.log(loyaltyUpdateRes);
        }
        await deleteTableOrders();
        await deleteBooking(localStorage.getItem("bookingId"));
      }
      alert("Thank you for dining with us!");
      checkIn.setIsCheckedIn(false);
      localStorage.removeItem("token");
      localStorage.removeItem("isLoyaltyMember");
      localStorage.removeItem("checkedIn");
      localStorage.removeItem("bookingId");
      localStorage.removeItem("isGuest");
      localStorage.removeItem("tableId");
      localStorage.removeItem("billRequested");
      localStorage.removeItem("accountId");
      navigate("/restaurant");
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  // Updated order total everytime the order is updated
  useEffect(() => {
    setIsLoading(true);
    // get loyalty discount if it exists
    const getLoyaltyStatus = async () => {
      try {
        const loyaltyRes = await sendRequest(
          `/loyalty/status/${localStorage.getItem("accountId")}`,
          "GET"
        );
        console.log(loyaltyRes);
        if (loyaltyRes.isMember) {
          localStorage.setItem("isLoyaltyMember", "true");
        }
        if (loyaltyRes.isMember && loyaltyRes.discountPercentage > 0) {
          setLoyaltyDiscount(loyaltyRes.discountPercentage);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getLoyaltyStatus();
    let total = 0;
    if (orderItems && orderItems.length > 0) {
      orderItems.forEach((item) => {
        total += item.quantity * item.price;
      });
    }
    let tableTotal = 0;
    if (tableOrders.length > 0) {
      tableOrders.forEach((tableOrder) => {
        tableTotal += tableOrder.subtotal;
      });
    }
    setTableSum(tableTotal);
    setOrderSum(+total.toFixed(2));
    setIsLoading(false);
  }, [orderItems, tableOrders]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connection established with websocket");
    };

    // Event listener for WebSocket events
    // note that useEffect runs twice due to StrictMode
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (
        data.type === "billPaid" &&
        data.accountId === localStorage.getItem("accountId")
      ) {
        alert(data.message);
        setHasPaid(true);
      }
    };

    return () => {
      // Clean up WebSocket connection when the component is unmounted/rerendered
      if (socket.readyState === 1) {
        socket.close();
      }
    };
  }, []);

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
      {hasRequestedBill ? null : (
        <>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ margin: "10px" }}
          >
            Current Order
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
        </>
      )}
      <Divider sx={{ borderBottomWidth: 3 }} />
      {loading && <CircularProgress sx={{ alignSelf: "center", mt: "50%" }} />}
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ margin: "10px" }}
      >
        Order History
      </Typography>
      {tableOrders.length !== 0 ? (
        <List>
          {tableOrders.map((order) => (
            <Box key={`order-ctn-${order.id}`}>
              <ListItem key={`order-${order.id}`}>
                <ListItemText primary={`Order ID: ${order.id}`} />
                <ListItemText primary={`$${order.subtotal}`} />
              </ListItem>
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
        {loyaltyDiscount ? (
          <>
            <Typography align="center" sx={{ textDecoration: "line-through" }}>
              Table Total: ${tableSum.toFixed(2)}
            </Typography>
            <Typography align="center">
              Table Total: $
              {(tableSum * (1 - loyaltyDiscount / 100)).toFixed(2)}
            </Typography>
            <Typography align="center" color="text.secondary">
              Thanks to loyalty perks, you get a ${loyaltyDiscount}% discount!
            </Typography>
          </>
        ) : (
          <Typography align="center">
            Table Total: ${tableSum.toFixed(2)}
          </Typography>
        )}

        {hasRequestedBill ? (
          <>
            {hasPaid ? (
              <Button
                color="secondary"
                disabled={tableOrders.length === 0}
                onClick={handleCheckOut}
                fullWidth
              >
                Check Out
              </Button>
            ) : (
              <Typography
                variant="body1"
                gutterBottom
                align="center"
                sx={{ margin: "10px" }}
              >
                Bill has been requested...
              </Typography>
            )}
          </>
        ) : (
          <Button
            color="secondary"
            disabled={tableOrders.length === 0}
            onClick={handleRequestBill}
            fullWidth
          >
            Request Bill
          </Button>
        )}
        <Button color="secondary" onClick={handleRequestAssistance} fullWidth>
          Request Assistance
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
          variant="permanent"
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
