import { useState, useEffect } from "react";
import { getAllMenuItems, getAllCategories, addItem } from "../Helper";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import sendRequest from "../Utils/Request";
import { fileToDataUrl } from "../Helper";
import NewItemModal from "../UI/NewItemModal";
import ManageMenuItemCard from "../UI/ManageMenuItemCard";

const Manager = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [triggerRerender, setTriggerRerender] = useState(false);

  const toggleNewItemModal = () => {
    setShowNewItemModal(!showNewItemModal);
  };

  const handleNewItemSubmit = async (values) => {
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

  useEffect(() => {
    setLoading(true);
    const getMenuData = async () => {
      let itemsData = await getAllMenuItems();
      setMenuItems(itemsData);
      let categoriesData = await getAllCategories();
      let categoriesArr = [];
      categoriesData.forEach((c) => {
        categoriesArr.push(c.name);
      });
      setCategories(categoriesArr);
      setLoading(false);
    };
    getMenuData();
  }, [triggerRerender]);

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && (
        <>
          <Typography variant="h3">Hi Manager</Typography>
          <Typography variant="h5">Manage the menu here</Typography>
          <Button
            variant="outlined"
            sx={{ mb: 1, mt: 1 }}
            onClick={toggleNewItemModal}
          >
            Add New Menu Item
          </Button>
          <Grid container spacing={2} sx={{ display: "flex" }}>
            {menuItems.map((item) => (
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
        </>
      )}
    </>
  );
};

export default Manager;
