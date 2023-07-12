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

// TODO: Check if formatting requires props.key rather than just key
const MenuItemCard = ({
  itemId,
  name,
  description,
  price,
  thumbnail,
  onUpdateOrderItems,
}) => {
  const [showModal, setShowModal] = useState(false);
  // NOTE: might have to llft this state up so orderDrawer can update quantity
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

    // TODO: Will need to pass the list of orderitems to orderDrawer in menu
    // https://stackoverflow.com/questions/70061442/how-to-pass-a-value-for-usestate-hook-from-another-component-in-reactjs

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
          variant='outlined'
          sx={{ width: "250px", height: "300px", margin: "10px" }}
          style={{ cursor: "pointer" }}
          className='highlight-card-on-hover'
        >
          <CardHeader title={name} />
          <CardMedia
            component='img'
            sx={{ width: "250px", height: "150px" }}
            image={thumbnail}
            alt={`${name}-image`}
          />
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
      </Grid>

      <Modal
        open={showModal}
        onClose={toggleModal}
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

          <Button label='AddItem' type='submit' variant='contained' mt={3}>
            Add to Cart
          </Button>
          <Grid container justifyContent='flex-end'>
            <Button onClick={toggleModal}>Close</Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default MenuItemCard;
