import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import sendRequest from "../Utils/Request";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

// TODO: Check if formatting requires props.key rather than just key
const MenuItemCard = ({
  itemId,
  name,
  description,
  price,
  availability,
  orderItems,
  onUpdateOrderItems,
}) => {
  // console.log(itemId, name, description, price, availability);
  // TODO: add item image
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  async function handleAddToCart(event, index) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log(quantity);
    console.log(data.get("note"));

    const note = data.get("note");

    const newOrder = {
      // TODO: accountId and tableId here
      itemId: itemId,
      quantity: quantity,
      note: note,
    };

    // TODO: Will need to pass the list of orderitems to orderDrawer in menu
    // https://stackoverflow.com/questions/70061442/how-to-pass-a-value-for-usestate-hook-from-another-component-in-reactjs

    // Add item to end of order items.
    const updatedOrderItems = (orderitems) => {
      return [...orderitems, newOrder];
    };
    onUpdateOrderItems(updatedOrderItems);
    // try {
    //   const response = await sendRequest("/orderItem/add", "POST", body);
    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log(data.message);
    //     alert(data.message);
    //   } else {
    //     throw new Error("Failed to add item to cart");
    //   }
    // } catch (error) {
    //   alert(error);
    //   console.log(error);
    // }
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
            variant='outlined'
            sx={{ width: "200px", height: "150px", margin: "auto" }}
            style={{ cursor: "pointer" }}
            className='highlight-card-on-hover'
          >
            <CardHeader title={name} />
            <CardContent>
              <Typography>${price}</Typography>
            </CardContent>
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
              <Typography variant='body2' color='text.secondary'>
                {description}
              </Typography>
              <Typography>${price}</Typography>
            </CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
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
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <Box
          component='form'
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
          <Typography id='modal-title' variant='h6' component='h2'>
            {name}
          </Typography>

          <Typography id='modal-description' variant='body1' mt={2}>
            {description}
          </Typography>

          <Typography variant='body1' mt={2}>
            Price: ${price}
          </Typography>

          <Typography
            variant='body1'
            component='div'
            id='quantity'
            name='quantity'
            mt={2}
          >
            Quantity:
            <Button onClick={handleDecrementQuantity}>-</Button>
            {quantity}
            <Button onClick={handleIncrementQuantity}>+</Button>
          </Typography>

          <TextField
            margin='normal'
            fullWidth
            name='note'
            label='Notes for chef'
            type='text'
            id='note'
          />

          <Button
            disabled={availability === 0}
            label='AddItem'
            type='submit'
            variant='contained'
            mt={3}
          >
            Add to Cart
          </Button>
          <Grid container justifyContent='flex-end'>
            <Button onClick={closeModal}>Close</Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default MenuItemCard;
