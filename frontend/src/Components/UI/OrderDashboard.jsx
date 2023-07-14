import * as React from "react";
import { getOrders } from "../Helper";

import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Typography } from "@mui/material";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

// TODO: Get all orders and arrange according to their orderId
// Then display batched orders in cards - may need OrderItemCard
// 3 papers with Pending, Preparing and Completed Orders.

// TODO: Get order everytime orders is updated from menu - cannot use useState?
// useState worked only because Menu was parent but WaitStaff is parent
// Need local storage?
const orders = await getOrders();
console.log(orders);

const rows = [
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
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

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
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Order Time</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Note</TableCell>
              <TableCell align='right'>Sale Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.shipTo}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell align='right'>{`$${row.amount}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link color='primary' href='#' onClick={preventDefault} sx={{ mt: 3 }}>
          See more orders
        </Link>
      </Paper>
    </React.Fragment>
  );
};

export default OrderDashboard;
