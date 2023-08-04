import {
  TextField,
  Button,
  Typography,
  Modal,
  Box,
  Stack,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { Formik } from "formik";
import { checkboxStyle, editMenuItemSchema } from "../Helper";

// ManageItemModal component that displays a modal for managing item details
const ManageItemModal = ({
  inputChanged,
  showModal,
  handleSubmit,
  handleClear,
  setItemValues, 
  itemValues, 
  categories, 
}) => {
  return (
    <Modal open={showModal}>
      {/* Modal content */}
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
          validationSchema={editMenuItemSchema}
          onSubmit={(values) => handleSubmit(values)}
          initialValues={{
            name: itemValues.name,
            description: itemValues.description,
            ingredients: itemValues.ingredients,
            categories: itemValues.checkedCategories,
            price: itemValues.price,
            thumbnail: itemValues.thumbnail,
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
              <Stack spacing={3} direction="column" width="100%">
                {/* Change image button */}
                <Button variant="contained" component="label">
                  Change Image
                  <input
                    type="file"
                    accept="image/*"
                    name="thumbnail"
                    onChange={(e) => {
                      setItemValues({
                        ...itemValues,
                        thumbnail: e.target.files[0],
                      });
                      setFieldValue("thumbnail", e.currentTarget.files[0]);
                    }}
                    hidden
                  />
                </Button>
                {/* Success message when thumbnail is uploaded */}
                {touched.thumbnail && !errors.thumbnail ? (
                  <Typography variant="caption" sx={{ color: "green" }}>
                    Uploaded!
                  </Typography>
                ) : null}
                {/* Error message for thumbnail */}
                {touched.thumbnail && errors.thumbnail ? (
                  <Typography variant="caption" sx={{ color: "red" }}>
                    {errors.thumbnail}
                  </Typography>
                ) : null}

                {/* Input field for item name */}
                <TextField
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={(e) => {
                    setItemValues({
                      ...itemValues,
                      name: e.target.value,
                    });
                    handleChange(e);
                  }}
                  error={touched.name && errors.name}
                  helperText={touched.name && errors.name}
                />

                {/* Input field for item description */}
                <TextField
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={(e) => {
                    setItemValues({
                      ...itemValues,
                      description: e.target.value,
                    });
                    handleChange(e);
                  }}
                  error={touched.description && errors.description}
                  helperText={touched.description && errors.description}
                  fullWidth
                  multiline
                />

                {/* Input field for item ingredients */}
                <TextField
                  label="Ingredients"
                  name="ingredients"
                  value={values.ingredients}
                  onChange={(e) => {
                    setItemValues({
                      ...itemValues,
                      ingredients: e.target.value,
                    });
                    handleChange(e);
                  }}
                  error={touched.ingredients && errors.ingredients}
                  helperText={touched.ingredients && errors.ingredients}
                  fullWidth
                  multiline
                />

                {/* Checkbox group for selecting item categories */}
                <FormControl
                  required
                  error={touched.categories && errors.categories}
                >
                  <FormGroup sx={checkboxStyle}>
                    {Object.keys(categories).map((key) => (
                      <FormControlLabel
                        key={key}
                        control={
                          <Checkbox
                            name="categories"
                            value={categories[key].name}
                            checked={values.categories.includes(
                              categories[key].name
                            )}
                            onChange={(e) => {
                              setItemValues({
                                ...itemValues,
                                checkedCategories: e.target.value,
                              });
                              handleChange(e);
                            }}
                          />
                        }
                        label={categories[key].name}
                      />
                    ))}
                  </FormGroup>
                  {/* Error message for categories */}
                  {errors.categories && (
                    <FormHelperText>{errors.categories}</FormHelperText>
                  )}
                </FormControl>

                {/* Input field for item price */}
                <TextField
                  label="Price $"
                  name="price"
                  value={values.price}
                  onChange={(e) => {
                    setItemValues({ ...itemValues, price: e.target.value });
                    handleChange(e);
                  }}
                  error={touched.price && errors.price}
                  helperText={touched.price && errors.price}
                />
              </Stack>
              {/* Submit button */}
              {inputChanged && (
                <Button color="success" onClick={handleSubmit}>
                  Submit
                </Button>
              )}

              {/* Close button */}
              <Button color="error" onClick={handleClear}>
                Close
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ManageItemModal;