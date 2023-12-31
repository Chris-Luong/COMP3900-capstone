import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const MenuItemCard = ({
  itemId,
  name,
  description,
  price,
  thumbnail,
  onUpdateOrderItems,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // opens and closes
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  function handleAddToCart(event, index) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const note = data.get("note");

    const newOrder = {
      itemId: itemId,
      name: name,
      price: price,
      quantity: quantity,
      note: note,
      thumbnail: thumbnail,
    };

    // Add item to end of order items.
    const updatedOrderItems = (orderItems) => {
      return [...orderItems, newOrder];
    };
    onUpdateOrderItems(updatedOrderItems);
    toggleModal();
  }

  const handleIncrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  return (
    <div>
      <Grid item onClick={toggleModal}>
        <Card
          variant="outlined"
          sx={{
            width: "250px",
            height: "300px",
            margin: "10px",
            cursor: "pointer",
            transition: "all 0.3s ease-out",
            "box-shadow": "0 14px 26px rgba(0, 0, 0, 0.04)",
            "&:hover": {
              transform: "translateY(-5px) scale(1.005) translateZ(0)",
              "box-shadow": "0 12px 24px rgba(156, 39, 176, 0.5)",
            },
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: "250px", height: "150px" }}
            image={thumbnail}
            alt={`${name}-image`}
          />
          <CardHeader title={name} />
          <CardContent>
            <Typography>${price}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Modal
        open={showModal}
        onClose={toggleModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          component="form"
          onSubmit={handleAddToCart}
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
            Price: ${price}
          </Typography>

          <Typography
            variant="body1"
            component="div"
            id="quantity"
            name="quantity"
            mt={2}
          >
            Quantity:
            <Button onClick={handleDecrementQuantity} color="secondary">
              -
            </Button>
            {quantity}
            <Button onClick={handleIncrementQuantity} color="secondary">
              +
            </Button>
          </Typography>

          <TextField
            margin="normal"
            fullWidth
            name="note"
            color="secondary"
            label="Notes for chef"
            type="text"
            id="note"
          />

          <Button
            label="AddItem"
            type="submit"
            variant="contained"
            mt={3}
            color="secondary"
          >
            Add to Cart
          </Button>
          <Grid container justifyContent="flex-end">
            <Button onClick={toggleModal} color="secondary">
              Close
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default MenuItemCard;
