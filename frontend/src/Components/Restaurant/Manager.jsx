import { useState, useEffect } from "react";
import { getAllMenuItems, getAllCategories, addItem } from "../Helper";
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import sendRequest from "../Utils/Request";
import { fileToDataUrl } from "../Helper";
import NewItemModal from "../UI/NewItemModal";
import ManageMenuItemCard from "../UI/ManageMenuItemCard";
import ManageCategoryModal from "../UI/ManageCategoryModal";

const Manager = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [showManageCategoryModal, setShowManageCategoryModal] = useState(false);
  const [categories, setCategories] = useState({});
  const [triggerRerender, setTriggerRerender] = useState(false);
  const [searchString, setSearchString] = useState("");

  const toggleNewItemModal = () => {
    setShowNewItemModal(!showNewItemModal);
  };

  const handleNewItemSubmit = async (values) => {
    try {
      let fileToUrl = await fileToDataUrl(values.thumbnail);
      console.log(values);
      const body = {
        ...values,
        price: parseFloat(values.price).toFixed(2),
        thumbnail: fileToUrl,
      };

      let message = await addItem(body);
      alert(message);
      setTriggerRerender(!triggerRerender);
      toggleNewItemModal();
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const handleItemDelete = async (id) => {
    try {
      const res = await sendRequest("/menu/remove", "DELETE", { id: id });
      alert(res.message);
      setTriggerRerender(!triggerRerender);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  const toggleManageCategoryModal = () => {
    setShowManageCategoryModal(!showManageCategoryModal);
  };

  const handleDeleteCategory = async (e) => {
    try {
      const res = await sendRequest("/categories/remove", "DELETE", {
        id: e.target.value,
      });
      alert(res.message);
      toggleManageCategoryModal();
      setTriggerRerender(!triggerRerender);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  const handleNewCategorySubmit = async (values) => {
    const name = values.name.charAt(0).toUpperCase() + values.name.slice(1);
    try {
      const res = await sendRequest("/categories/add", "POST", { name });
      alert(`Created new category with id ${res}`);
      toggleManageCategoryModal();
      setTriggerRerender(!triggerRerender);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    const getMenuData = async () => {
      try {
        let itemsData = await getAllMenuItems();
        setMenuItems(itemsData);
        let categoriesData = await getAllCategories();
        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    };
    getMenuData();
  }, [triggerRerender]);

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && (
        <>
          <Typography
            component="h1"
            variant="h2"
            color="secondary"
            gutterBottom
            sx={{ mb: 3 }}
          >
            Manager Dashboard
          </Typography>
          <Typography component="h2" variant="h5" gutterBottom sx={{ mb: 3 }}>
            Manage the menu here
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ margin: "5px 5px 5px 0" }}
            onClick={toggleNewItemModal}
          >
            Add New Menu Item
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ margin: "5px 5px 5px 0" }}
            onClick={toggleManageCategoryModal}
          >
            Manage Categories
          </Button>
          <TextField
            size="small"
            color="secondary"
            placeholder="Search by name"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <Grid container spacing={2} sx={{ display: "flex" }}>
            {menuItems
              .filter((item) =>
                searchString
                  ? item.name.toLowerCase().includes(searchString.toLowerCase())
                  : true
              )
              .map((item) => (
                <ManageMenuItemCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  ingredients={item.ingredients}
                  price={item.price}
                  thumbnail={item.thumbnail}
                  handleItemDelete={handleItemDelete}
                  categories={categories}
                  triggerRerender={triggerRerender}
                  setTriggerRerender={setTriggerRerender}
                />
              ))}
          </Grid>
          {showNewItemModal && (
            <NewItemModal
              showModal={showNewItemModal}
              toggleModal={toggleNewItemModal}
              categories={categories}
              handleSubmit={handleNewItemSubmit}
            />
          )}
          {showManageCategoryModal && (
            <ManageCategoryModal
              showModal={showManageCategoryModal}
              toggleModal={toggleManageCategoryModal}
              categories={categories}
              handleDelete={handleDeleteCategory}
              handleSubmit={handleNewCategorySubmit}
            />
          )}
        </>
      )}
    </>
  );
};

export default Manager;
