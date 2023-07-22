import { Typography } from "@mui/material";
import OrderDashboard from "../UI/OrderDashboard";
import { PREPARING_STATUS, READY_STATUS } from "../Helper";
import ReservationDashboard from "../UI/ReservationDashboard";

const WaitStaff = () => {
  // TODO: make a reservation dashboard
  // GET request with current date to return list of bookings
  const data = [
    {
      tableId: 1,
      numGuests: 1,
      tableCapacity: 1,
      accountId: 1,
      time: "",
    },
    {
      tableId: 2,
      numGuests: 2,
      tableCapacity: 2,
      accountId: 2,
      time: "",
    },
    {
      tableId: 3,
      numGuests: 3,
      tableCapacity: 3,
      accountId: 3,
      time: "",
    },
  ];
  return (
    <>
      <Typography
        component='h1'
        variant='h2'
        color='primary'
        gutterBottom
        sx={{ mb: 3 }}
      >
        Wait Staff Dashboard
      </Typography>
      <OrderDashboard status={READY_STATUS} />
      <ReservationDashboard status={PREPARING_STATUS} />
    </>
  );
};

export default WaitStaff;
