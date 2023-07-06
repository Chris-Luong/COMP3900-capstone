import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

const MenuItemCard = ({ name, description, price, availability, onClick }) => {
  // TODO: add item image
  // for now, display all this info in the card, but for final version, will only
  // want to show name, image and price. description will be added in modal

  return (
    <Grid item onClick={onClick}>
      {availability === 1 && (
        <Card
          variant="outlined"
          sx={{ width: "200px", height: "150px", margin: "auto" }}
          style={{ cursor: "pointer" }}
          className="highlight-card-on-hover"
        >
          <CardHeader title={name} />
          <CardContent>
            <Typography>${price}</Typography>
          </CardContent>
          {/* add to order should be in the modal */}
          {/* <CardActions>
            <Button size="small">Add to Order</Button>
          </CardActions> */}
          <style>
            {`
              .highlight-card-on-hover:hover {
                outline: 2px solid blue;
              }
            `}
          </style>
        </Card>
      )}
      {availability === 0 && (
        <Card>
          <CardHeader title={name} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Typography>{price}</Typography>
          </CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Not available
          </Typography>
        </Card>
      )}
    </Grid>
  );
};

export default MenuItemCard;
