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
  const handleMoreDetails = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 140 }} image={image} title={name} />
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
            alignItems: "center",
            minWidth: 300,
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6">{props.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </Box>
      </Dialog>
    </>
  );
};

export default ProductCard;
