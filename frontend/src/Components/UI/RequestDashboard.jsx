import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  PAID_STATUS,
  Request,
  completeWaiterRequest,
  getWaiterRequests,
  retrieveOrdersWithTableId,
  updateOrderPayStatus,
} from "../Helper";

const RequestCard = ({ request, onCompleted }) => {
  const { id, tableId, timestamp, status, type } = request;
  const [completed, setCompleted] = useState(status === "Completed");

  const handleCompleted = () => {
    setCompleted(true);
    onCompleted(id, tableId, type);
  };

  return (
    <Card sx={{ minWidth: 275, marginBottom: 4 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Request ID: {id}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Table ID: {tableId}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Timestamp: {timestamp}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Type: {type}
        </Typography>
        <Typography
          variant="body2"
          color={completed ? "text.secondary" : "error"}
          gutterBottom
        >
          Status: {completed ? "Completed" : "Waiting"}
        </Typography>
        {!completed && (
          <Button variant="contained" onClick={handleCompleted}>
            Mark as Completed
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const RequestDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const completeRequestHandler = async (requestId, tableId, type) => {
    // if request is for a bill, update the paid status of all its orders
    if (type === Request.Type.Bill) {
      const orders = await retrieveOrdersWithTableId(tableId);
      const accountId = orders[0].accountId;
      const orderIdArr = orders.map((order) => order.id);
      const res = await updateOrderPayStatus(
        orderIdArr,
        PAID_STATUS.Paid,
        accountId
      );
      console.log(res);
    }
    await completeWaiterRequest(requestId);
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connection established with websocket");
    };

    // Event listener for WebSocket events
    // note that useEffect runs twice due to StrictMode
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "orderReady" || data.type === "newRequest") {
        alert(data.message);
      }
    };

    setIsLoading(true);
    const getRequests = async () => {
      let res = await getWaiterRequests();
      console.log(res);
      setRequests(res);
    };
    getRequests();
    setIsLoading(false);
    return () => {
      // Clean up WebSocket connection when the component is unmounted
      if (socket.readyState === 1) {
        socket.close();
      }
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Accordion
          elevation={6}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            margin: 5,
            "&.Mui-expanded": {
              margin: 5,
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              // Style for the AccordionSummary
              "&.Mui-expanded": {
                minHeight: "48px", // Override height when expanded to match Paper
              },
            }}
          >
            <Typography component="h2" variant="h5" color="primary">
              Requests
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              {requests.length === 0 ? (
                <Typography sx={{ mt: "35px" }}>No requests</Typography>
              ) : (
                <>
                  {requests.map((requestObj) => (
                    <RequestCard
                      key={`request-${requestObj.id}`}
                      request={requestObj}
                      onCompleted={completeRequestHandler}
                    />
                  ))}
                </>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};

export default RequestDashboard;
