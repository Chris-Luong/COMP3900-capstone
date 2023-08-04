import {
  TextField,
  Button,
  Modal,
  Box,
  Stack,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { newCategorySchema } from "../Helper";
import { Formik } from "formik";

// ManageCategoryModal component that displays a modal for managing categories
const ManageCategoryModal = ({
  showModal, 
  toggleModal, 
  categories, 
  handleDelete, 
  handleSubmit, 
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
          validationSchema={newCategorySchema}
          onSubmit={(values) => handleSubmit(values)}
          initialValues={{
            name: "",
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <>
              {/* Heading for managing existing categories */}
              <Typography align="center" variant="h5">
                Manage Existing Categories
              </Typography>
              <List>
                {/* List of existing categories */}
                {Object.keys(categories).map((key) => (
                  <ListItem key={key}>
                    <ListItemText primary={categories[key].name} />
                    {/* Delete button for each category */}
                    <Button onClick={handleDelete} value={categories[key].id}>
                      Delete
                    </Button>
                  </ListItem>
                ))}
              </List>

              {/* Form for creating a new category */}
              <form onSubmit={handleSubmit} noValidate>
                {/* Heading for creating a new category */}
                <Typography align="center" variant="h5">
                  Create New Category
                </Typography>
                <Stack spacing={3} direction="column" width="100%">
                  {/* Input field for entering the new category name */}
                  <TextField
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && errors.name}
                    helperText={touched.name && errors.name}
                    required
                  />
                </Stack>

                {/* Create button for submitting the new category */}
                <Button color="success" onClick={handleSubmit}>
                  Create
                </Button>

                {/* Close button for closing the modal */}
                <Button color="error" onClick={toggleModal}>
                  Close
                </Button>
              </form>
            </>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ManageCategoryModal;