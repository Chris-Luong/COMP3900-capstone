import * as React from "react";
import {
  retrieveOrdersByStatus,
  READY_STATUS,
  SERVED_STATUS,
  updateOrderItemStatus,
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

// TODO: Get order everytime orders is updated from menu - cannot use useState?
// useState worked only because Menu was parent but WaitStaff is parent
// Need local storage?
// const orders = await getOrders(); // Use the one for waitstaff
// console.log(orders);

const OrderDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState({});
  const [triggerRerender, setTriggerRerender] = useState(false);

  const handleStatusUpdate = async (orderItemId) => {
    setLoading(true);
    console.log(orderItemId);
    const res = await updateOrderItemStatus(orderItemId, SERVED_STATUS);
    alert(res.message);
    setTriggerRerender(!triggerRerender);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const retrieveOrders = async () => {
      const orderData = await retrieveOrdersByStatus(READY_STATUS);
      console.log(orderData);
      setOrders(orderData);
      setLoading(false);
    };
    retrieveOrders();
  }, [triggerRerender]);

  console.log(orders);
  return (
    <>
      {loading && <CircularProgress />}
      {!loading && (
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
            component="h2"
            variant="h5"
            color="primary"
            gutterBottom
            sx={{ mb: 3 }}
          >
            Ready To Serve Orders
          </Typography>
          <Grid container spacing={2}>
            {Object.keys(orders).map((orderId) => (
              <Grid item xs={12} sm={4} md={3} key={orderId}>
                <Card
                  sx={{
                    borderRadius: "15px",
                    border: 0.5,
                    borderWidth: "0.5px",
                  }}
                >
                  <CardHeader
                    title={`Order ${orderId} Table ${orders[orderId].tableId}`}
                    subheader={orders[orderId].orderTime}
                  />
                  <Divider />
                  <CardContent>
                    <List>
                      {orders[orderId].items.map((item) => (
                        <ListItem
                          key={`${orderId}-${item.itemId}`}
                          onClick={() => handleStatusUpdate(item.orderItemId)}
                          sx={{
                            "&:hover": {
                              backgroundColor: "orange",
                              border: 1,
                              borderColor: "black",
                              cursor: "pointer",
                            },
                            borderRadius: "15px",
                            border: 1,
                            borderColor: "white",
                          }}
                        >
                          <ListItemText
                            primary={`${item.quantity} ${item.itemName}`}
                            secondary={item.note ? `Note: ${item.note}` : null}
                          />
                          {/* <Typography align='right'>{item.amount}</Typography> */}
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default OrderDashboard;
