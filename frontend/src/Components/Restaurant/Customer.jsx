import {
  Box,
  Button,
  FormHelperText,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import OrderDashboard from "../UI/OrderDashboard";
import { useState } from "react";
import NewItemModal from "../UI/NewItemModal";
import { Formik } from "formik";

const Customer = () => {
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const toggleNewItemModal = () => {
    setShowNewItemModal(!showNewItemModal);
  };

  const handleSubmit = () => {
    console.log("Hello Customer");
  };

  // NOTE: UAC for booking:
  // Users can choose the specific date and time they want to book
  // users input the number of guests
  // the system displays the available date and time in a dropdown box

  const data = {
    date: "",
    time: "",
    guests: 0,
  };
  // Returns bookingId
  return (
    <>
      <Typography
        component='h1'
        variant='h2'
        color='secondary'
        gutterBottom
        sx={{ mb: 3 }}
      >
        Customer Dashboard
      </Typography>
      <Button
        variant='outlined'
        color='secondary'
        sx={{ margin: "5px 5px 5px 0" }}
        onClick={toggleNewItemModal}
      >
        Make a reservation
      </Button>
      {/* TODO: make a separate dashboard for customer */}
      {/* Maybe map each dashboard to an order and clean up dashboard UI */}
      <OrderDashboard />
      {showNewItemModal && (
        <Modal open={showNewItemModal}>
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
            <Formik
              // validationSchema={createMenuItemSchema}
              onSubmit={(values) => handleSubmit(values)}
              initialValues={{
                name: "",
                description: "",
                ingredients: "",
                categories: [],
                price: "",
                thumbnail: null,
              }}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                errors,
                touched,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Stack spacing={3} direction='column' width='100%'>
                    <TextField
                      label='Name'
                      name='name'
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && errors.name}
                      helperText={touched.name && errors.name}
                      required
                    />
                    <TextField
                      label='Description'
                      name='description'
                      value={values.description}
                      onChange={handleChange}
                      error={touched.description && errors.description}
                      helperText={touched.description && errors.description}
                      required
                      fullWidth
                      multiline
                    />
                    <TextField
                      label='Ingredients'
                      name='ingredients'
                      value={values.ingredients}
                      onChange={handleChange}
                      error={touched.ingredients && errors.ingredients}
                      helperText={touched.ingredients && errors.ingredients}
                      required
                      fullWidth
                      multiline
                    />
                    <TextField
                      label='Price $'
                      name='price'
                      value={values.price}
                      onChange={handleChange}
                      error={touched.price && errors.price}
                      helperText={touched.price && errors.price}
                      required
                    />
                  </Stack>
                  <Button color='success' onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Button color='error' onClick={toggleNewItemModal}>
                    Close
                  </Button>
                </form>
              )}
            </Formik>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Customer;
