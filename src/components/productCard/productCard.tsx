import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box, Dialog } from "@mui/material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { useCartStore } from "../../store/CartStore";
import { useState } from "react";
import { Image } from "@mui/icons-material";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = (props: ProductCardProps) => {
  const { name, image, price } = props;
  const { t } = useTranslation();
  const { addProduct } = useCartStore();
  const [open, setOpen] = useState(false);

  const handleMoreDetails = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: "20rem" }}>
        <CardMedia sx={{ height: "9rem" }} image={image} title={name} />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">{name}</Typography>
          <Typography variant="h5">{price}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button size="small" onClick={() => addProduct(props.id)}>
            {t("addToCart")}
            <AddShoppingCartIcon />
          </Button>
          <Button size="small" onClick={handleMoreDetails}>
            {t("moreDetails")}
            <InfoOutlineIcon />
          </Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "30rem",
            width: "25rem",
          }}
        >
          <Box
            sx={{
              height: "20rem",
              width: "20rem",
              alignItems: "right",
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6">{props.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {props.description}
            </Typography>
          </Box>
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <img
              src={props.image}
              alt={props.name}
              style={{ width: "20rem", height: "20rem" }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              sx={{ m: "1rem", width: "10rem" }}
              onClick={() => addProduct(props.id)}
            >
              {t("addToCart")}
              <AddShoppingCartIcon />
            </Button>
            <Button sx={{ m: "1rem" }} onClick={handleClose}>
              {t("close")}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default ProductCard;
