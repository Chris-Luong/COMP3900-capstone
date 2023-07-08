import { useState, useEffect } from "react";
import { Button, CircularProgress, Grid } from "@mui/material";
import { getAllMenuItems, getAllCategories, applyFilters } from "../Helper";
import FilterModal from "../UI/FilterModal";
import MenuItemCard from "../UI/MenuItemCard";

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

  const demoItems = [
    {
      id: "demo1",
      name: "Demo Item 1",
      description: "This is a demo item.",
      price: "9.99",
      availability: 1,
      imageUrl: "/path/to/image1.jpg"
    },
    {
      id: "demo2",
      name: "Demo Item 2",
      description: "This is another demo item.",
      price: "14.99",
      availability: 0,
      imageUrl: "/path/to/image2.jpg"
    },
  ];

  const allItems = [...menuItems, ...demoItems];

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && (
        <>
          <Button variant="contained" onClick={toggleFilter}>
            Filter
          </Button>
          <Grid container>
            {menuItems.map((item) => (
              <MenuItemCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                availability={item.availability}
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
        </>
      )}
    </>
  );
};

export default Menu;
