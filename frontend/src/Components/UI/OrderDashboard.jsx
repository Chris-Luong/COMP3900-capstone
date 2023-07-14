import * as React from "react";
import { getOrders } from "../Helper";

import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
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
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
];

const fakeItems2 = [
  createData(
    0,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    1,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];
const orders = [fakeItems1, fakeItems2];

console.log(orders);
console.log(
  orders.map((order, idx) => orders[idx].map((item, idx) => item.name))
);

function preventDefault(event) {
  event.preventDefault();
}

const OrderDashboard = () => {
  return (
    <React.Fragment>
      <Paper
        elevation={6}
        sx={{ p: 2, display: "flex", flexDirection: "column" }}
      >
        <Typography component='h2' variant='h6' color='primary' gutterBottom>
          Pending Orders
        </Typography>
        {/* TODO: Map cards of orders instead? */}
        {/* <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Order Time</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Note</TableCell>
              <TableCell align='right'>Sale Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody> */}
        {/* {fakeItems1.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.shipTo}</TableCell>
            <TableCell>{item.paymentMethod}</TableCell>
            <TableCell align='right'>{`$${item.amount}`}</TableCell>
          </TableRow>
        ))} */}
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
                  title={`Order ${idx} Table ${orders[idx].id}`}
                  subheader={orders[idx][0].id}
                />
                <Divider />
                <CardContent>
                  <List>
                    {orders[idx].map((item) => (
                      <ListItem
                        key={`${idx}-${item.id}`}
                        onClick={() => {
                          console.log("updating status!");
                        }}
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
                          primary={`${item.amount} ${item.name}`}
                          secondary={item.shipTo}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* </TableBody>
        </Table> */}
        <Link color='primary' href='#' onClick={preventDefault} sx={{ mt: 3 }}>
          See more orders
        </Link>
      </Paper>
    </React.Fragment>
  );
};

export default OrderDashboard;
