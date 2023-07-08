import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { useState } from "react";
import sendRequest from "../Utils/Request";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const MenuItemCard = ({
  key,
  name,
  description,
  price,
  availability,
  onClick,
}) => {
  // TODO: add item image
  // for now, display all this info in the card, but for final version, will only
  // want to show name, image and price. description will be added in modal
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const openModal = () => {
    setShowModal(true);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  async function handleAddToCart(values) {
    // TODO: include values.orderId in the body
    // Need to implement in a way such that an order is created and the orderId is forwarded
    const body = {
      itemId: key,
      quantity: values.quantity,
    };

    try {
      const response = await sendRequest("/orderItem/add", "POST", body);

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        alert(data.message);
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }
  const handleIncrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };
  return (
    <div>
      <Grid item onClick={openModal}>
        {availability === 1 && (
          <Card
            variant="outlined"
            sx={{ width: "200px", height: "150px", margin: "auto" }}
            style={{ cursor: "pointer" }}
            className="highlight-card-on-hover"
          >
            <CardHeader title={name} />
            <CardContent>
              <Typography>${price}</Typography>
            </CardContent>
            {/* add to order should be in the modal */}
            {/*<CardActions>
            <Button size="small">Add to Order</Button>
      </CardActions> */}
            <style>
              {`
              .highlight-card-on-hover:hover {
                outline: 2px solid blue;
              }
            `}
            </style>
          </Card>
        )}
        {/* TODO: remove availability */}
        {availability === 0 && (
          <Card>
            <CardHeader title={name} />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
              <Typography>{price}</Typography>
            </CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Not available
            </Typography>
          </Card>
        )}
      </Grid>

      <Modal
        open={showModal}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {name}
          </Typography>

          <Typography id="modal-description" variant="body1" mt={2}>
            {description}
          </Typography>

          <Typography variant="body1" mt={2}>
            Price: {price}
          </Typography>

          <Typography variant="body1" component="div" mt={2}>
            Quantity:
            <Button onClick={handleDecrementQuantity}>-</Button>
            {quantity}
            <Button onClick={handleIncrementQuantity}>+</Button>
          </Typography>

          <Button variant="contained" onClick={handleAddToCart} mt={3}>
            Add to Cart
          </Button>
          <Grid container justifyContent="flex-end">
            <Button onClick={closeModal}>Close</Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default MenuItemCard;
