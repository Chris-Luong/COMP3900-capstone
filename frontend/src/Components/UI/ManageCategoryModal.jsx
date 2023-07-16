import {
  TextField,
  Button,
  Modal,
  Box,
  Stack,
  List,
  Divider,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { newCategorySchema } from "../Helper";
import { Formik } from "formik";

const ManageCategoryModal = ({
  showModal,
  toggleModal,
  categories,
  handleDelete,
  handleSubmit,
}) => {
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
          validationSchema={newCategorySchema}
          onSubmit={(values) => handleSubmit(values)}
          initialValues={{
            name: "",
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <>
              <Typography align="center" variant="h5">
                Manage Existing Categories
              </Typography>
              <List>
                {Object.keys(categories).map((key) => (
                  <ListItem key={key}>
                    <ListItemText primary={categories[key].name} />
                    <Button onClick={handleDelete} value={categories[key].id}>
                      Delete
                    </Button>
                  </ListItem>
                ))}
              </List>
              <form onSubmit={handleSubmit} noValidate>
                <Typography align="center" variant="h5">
                  Create New Category
                </Typography>
                <Stack spacing={3} direction="column" width="100%">
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
                <Button color="success" onClick={handleSubmit}>
                  Create
                </Button>
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
