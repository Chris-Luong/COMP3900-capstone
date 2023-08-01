import * as React from "react";
import {
  retrieveOrdersByStatus,
  READY_STATUS,
  SERVED_STATUS,
  updateOrderItemStatus,
  PREPARING_STATUS,
} from "../Helper";
import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import toast, { Toaster } from "react-hot-toast";

// TODO: adjust duration of toast and see if you can add a timer bar for all components
const OrderDashboard = (props) => {
  const status = props.status;
  const newStatus = status === PREPARING_STATUS ? READY_STATUS : SERVED_STATUS;
  const dashboardHeading =
    status === PREPARING_STATUS ? "Orders To Prepare" : "Orders Ready To Serve";

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState({});
  const [triggerRerender, setTriggerRerender] = useState(false);

  const handleStatusUpdate = async (orderItemId) => {
    setLoading(true);
    console.log(orderItemId);
    try {
      const res = await updateOrderItemStatus(orderItemId, newStatus);
      // alert(res.message);
      toast.success(res.message, {
        duration: 6000,
      });
      setTriggerRerender(!triggerRerender);
    } catch (err) {
      console.log(err);
      // alert(err);
      // TODO: make error colour
      toast.error(err, {
        duration: 6000,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const retrieveOrders = async () => {
      try {
        const orderData = await retrieveOrdersByStatus(status);
        setOrders(orderData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        // alert(err);
        // TODO: make error colour
        toast.error(err, {
          duration: 6000,
        });
      }
    };
    retrieveOrders();
  }, [status, triggerRerender]);

  return (
    <Paper
      elevation={6}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        padding: 5,
        margin: 5,
      }}
    >
      <Typography
        component='h2'
        variant='h5'
        color='secondary'
        gutterBottom
        sx={{ mb: 3 }}
      >
        {dashboardHeading}
      </Typography>
      {Object.keys(orders).length === 0 ? (
        <Typography sx={{ mt: "35px" }}>No orders 🥳</Typography>
      ) : (
        <Grid container spacing={2}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {Object.keys(orders).map((orderId) => (
                <Grid item xs={12} sm={4} md={3} key={orderId}>
                  <Card
                    sx={{
                      width: "100%",
                      height: "100%",
                      margin: "10px",
                      cursor: "pointer",
                      border: 1,
                      borderColor: "rgba(216, 206, 222, 0.8)",
                      transition: "all 0.3s ease-out",
                      boxShadow: "0 14px 26px rgba(0, 0, 0, 0.04)",
                      "&:hover": {
                        transform:
                          "translateY(-5px) scale(1.005) translateZ(0)",
                        boxShadow: "0 12px 24px rgba(156, 39, 176, 0.5)",
                      },
                    }}
                  >
                    <CardHeader
                      title={`Order ${orders[orderId].orderNumber} Table ${orders[orderId].tableId}`}
                      subheader={`${orders[orderId].orderTime}${
                        orders[orderId].isPriority === 1 ? " (Priority)" : ""
                      }`}
                    />
                    <Divider />
                    <CardContent>
                      <List>
                        {orders[orderId].items.map((item, index) => (
                          <ListItem
                            key={`${orderId}-${item.itemId}-${index}`}
                            onClick={() => handleStatusUpdate(item.orderItemId)}
                            sx={{
                              "&:hover": {
                                backgroundColor: "rgba(125, 50, 168)",
                                color: "white",
                                cursor: "pointer",
                              },
                              borderRadius: "5px",
                            }}
                          >
                            <ListItemText
                              disableTypography
                              primary={
                                <Typography>
                                  {item.quantity} {item.itemName}
                                </Typography>
                              }
                              secondary={
                                <Typography>
                                  {item.note ? `Note: ${item.note}` : null}
                                </Typography>
                              }
                            />
                            {/* <Typography align='right'>{item.amount}</Typography> */}
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      )}
      <Toaster />
    </Paper>
  );
};

export default OrderDashboard;
