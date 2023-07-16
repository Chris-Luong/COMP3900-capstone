import * as React from "react";
import { getOrders } from "../Helper";

import Link from "@mui/material/Link";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

// Generate Order Data
function createData(id, date, name, shipTo, status, amount) {
  return { id, date, name, shipTo, status, amount };
}

// TODO: Get all orders and arrange according to their orderId
// Then display batched orders in cards - may need OrderItemCard
// 3 papers with Pending, Preparing and Completed Orders - check discord.

// TODO: Get order everytime orders is updated from menu - cannot use useState?
// useState worked only because Menu was parent but WaitStaff is parent
// Need local storage?
// const orders = await getOrders(); // Use the one for waitstaff
// console.log(orders);

const fakeItems1 = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "Preparing",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "Ready To Serve",
    866.99
  ),
  createData(2, "16 Mar, 2019", "Tom Scholz", "Boston, MA", "Served", 100.81),
];

const fakeItems2 = [
  createData(
    0,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "Ready To Serve",
    654.39
  ),
  createData(
    1,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "Ready To Serve",
    212.79
  ),
];
const orders = [fakeItems1, fakeItems2];

// console.log(orders);
// console.log(
//   orders.map((order, idx) => orders[idx].map((item, idx) => item.name))
// );

const dashboard = (type) => {
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
        color='primary'
        gutterBottom
        sx={{ mb: 3 }}
      >
        {type} Orders
      </Typography>
      <Grid container spacing={2}>
        {/* TODO: check format of orders and orderItems from reqs 
      maybe replace idx with the actual orderId like KitchenStaff
      */}
        {orders.map((order, idx) => (
          <Grid item xs={12} sm={4} md={3} key={idx}>
            <Card
              sx={{
                borderRadius: "15px",
                border: 0.5,
                borderWidth: "0.5px",
              }}
            >
              <CardHeader
                title={`Order ${idx} Table ${orders[idx][idx].id}`}
                subheader={orders[idx][0].id}
              />
              <Divider />
              <CardContent>
                <List>
                  {orders[idx].map((item) => (
                    <>
                      {item.status === type ? (
                        <ListItem
                          key={`${idx}-${item.id}`}
                          onClick={() => handleCompleteItem(idx, item.id)}
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
                            primary={item.name}
                            secondary={item.shipTo}
                          />
                          <Typography align='right'>{item.amount}</Typography>
                        </ListItem>
                      ) : null}
                    </>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Link color='primary' href='#' onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders? Probably just show all in the paper
      </Link>
    </Paper>
  );
};

function preventDefault(event) {
  event.preventDefault();
}

const handleCompleteItem = (orderId, itemId) => {
  console.log("Item clicked");
  console.log(orderId);
  console.log(itemId);
  // TODO: send request to change order item status to Served
  // TODO: loop through each order, count num. items in each status category
  // if num == 0 then do not show order in that status category
};

const OrderDashboard = () => {
  return (
    <>
      {dashboard("Ready To Serve")}
      {dashboard("Preparing")}
      {dashboard("Served")}
    </>
  );
};

export default OrderDashboard;
