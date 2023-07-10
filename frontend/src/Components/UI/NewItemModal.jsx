// TODO: validate image
import {
  TextField,
  Button,
  Modal,
  Box,
  Stack,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { menuItemSchema, checkboxStyle } from "../Helper";
import { Formik } from "formik";

const NewItemModal = ({ showModal, toggleModal, categories, handleSubmit }) => {
  return (
    <Modal open={showModal}>
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
          validationSchema={menuItemSchema}
          onSubmit={(values) => handleSubmit(values)}
          initialValues={{
            name: "",
            description: "",
            ingredients: "",
            categories: [],
            price: "",
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Stack spacing={3} direction="column" width="100%">
                <Button>Add image here</Button>
                <TextField
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && errors.name}
                  helperText={touched.name && errors.name}
                  required
                />
                <TextField
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && errors.description}
                  helperText={touched.description && errors.description}
                  required
                  fullWidth
                  multiline
                />
                <TextField
                  label="Ingredients"
                  name="ingredients"
                  value={values.ingredients}
                  onChange={handleChange}
                  error={touched.ingredients && errors.ingredients}
                  helperText={touched.ingredients && errors.ingredients}
                  required
                  fullWidth
                  multiline
                />
                <FormControl
                  required
                  error={touched.categories && errors.categories}
                >
                  <FormGroup sx={checkboxStyle}>
                    {categories.map((c) => (
                      <FormControlLabel
                        key={c}
                        control={
                          <Checkbox
                            name="categories"
                            value={c}
                            checked={values.categories.includes(c)}
                            onChange={handleChange}
                          />
                        }
                        label={c}
                      />
                    ))}
                  </FormGroup>
                  {errors.categories && (
                    <FormHelperText>{errors.categories}</FormHelperText>
                  )}
                </FormControl>
                <TextField
                  label="Price $"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  error={touched.price && errors.price}
                  helperText={touched.price && errors.price}
                  required
                />
              </Stack>
              <Button color="success" onClick={handleSubmit}>
                Submit
              </Button>
              <Button color="error" onClick={toggleModal}>
                Close
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default NewItemModal;
