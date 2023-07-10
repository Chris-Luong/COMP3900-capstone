import { Fragment, useState, useEffect } from "react";
import { Button, CircularProgress, Grid } from "@mui/material";
import { getAllMenuItems, getAllCategories, applyFilters } from "../Helper";
import FilterModal from "../UI/FilterModal";
import MenuItemCard from "../UI/MenuItemCard";
import OrderDrawer from "../UI/OrderDrawer";

const sortByValues = {
  1: {
    by: "name",
    label: "Alphabetical (ASC)",
    order: "ASC",
  },
  2: {
    by: "name",
    label: "Alphabetical (DESC)",
    order: "DESC",
  },
  3: {
    by: "price",
    label: "Price (ASC)",
    order: "ASC",
  },
  4: {
    by: "price",
    label: "Price (DESC)",
    order: "DESC",
  },
};

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [searchString, setSearchString] = useState("");
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState([0, 100]);
  const [sort, setSort] = useState(1);
  const [orderItems, setOrderItems] = useState([]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleFilters = async () => {
    setLoading(true);
    let itemsData = await applyFilters(
      searchString,
      selectedCategory,
      price[0],
      price[1],
      sortByValues[sort].by,
      sortByValues[sort].order
    );
    console.log(itemsData);
    setMenuItems(itemsData);

    toggleFilter();
    setLoading(false);
  };

  const clearFilters = async () => {
    setSelectedCategory("");
    setSearchString("");
    setPrice([0, 100]);
    setSort(1);
    setLoading(true);
    let itemsData = await getAllMenuItems();
    setMenuItems(itemsData);
    toggleFilter();
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const getMenuData = async () => {
      let itemsData = await getAllMenuItems();
      setMenuItems(itemsData);
      let categoriesData = await getAllCategories();
      let categoriesObject = {};
      categoriesData.forEach((c) => {
        // categories have id:name key:value pairs
        categoriesObject[c.id] = c.name;
      });
      setCategories(categoriesObject);
      setLoading(false);
    };
    getMenuData();
  }, []);

  const handleUpdateOrderItems = (updatedOrderItems) => {
    setOrderItems(updatedOrderItems);
  };

  // Remove order item from cart given index.
  // TODO: each item (orderItem object thing) in cart should have its own index
  // Each menu item could also have a unique key so that changing its quantity
  // through the MenuItemCard just changes the quantity in the cart instead of
  // adding it to the cart (duplicating items with different quantities = bad UI)
  const handleRemoveOrderItem = (index) => {
    setOrderItems((prevArray) => {
      return prevArray.filter((item, i) => i !== index);
    });
  };

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && (
        <>
          <Button variant='contained' onClick={toggleFilter}>
            Filter
          </Button>
          <Grid container>
            {menuItems.map((item) => (
              <MenuItemCard
                // TODO: add image with base64 string - need helper fn to convert
                itemId={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                availability={item.availability}
                orderItems={orderItems}
                onUpdateOrderItems={handleUpdateOrderItems}
              />
            ))}
            <FilterModal
              showFilter={showFilter}
              toggleFilter={toggleFilter}
              searchString={searchString}
              setSearchString={setSearchString}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              price={price}
              setPrice={setPrice}
              sortByValues={sortByValues}
              sort={sort}
              handleSortChange={handleSortChange}
              clearFilters={clearFilters}
              onSubmit={handleFilters}
            />
          </Grid>
          <OrderDrawer
            orderItems={orderItems}
            setOrderItems={setOrderItems}
            // deleteItem={handleRemoveOrderItem()}
          />
        </>
      )}
    </>
  );
};

export default Menu;
