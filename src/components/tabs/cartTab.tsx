import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useCartStore } from "../../store/CartStore";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import DeleteIcon from "@mui/icons-material/Delete";
import productData from "../../data/products.json";
import { useMemo } from "react";

const CartTab = () => {
  const { t } = useTranslation();
  const { cart, clearCart, getTotalItems, removeProduct } = useCartStore();
  let totalPrice = 0;

  const productDictionary = useMemo(() => {
    return productData.reduce<Record<string, any>>((acc, item) => {
      acc[String(item.id)] = item;
      return acc;
    }, {});
  }, []);

  return (
    <Box sx={{ justifyContent: "space-between" }}>
      {cart.map((product) => {
        const productInfo = productDictionary[String(product.id)];

        if (!productInfo) return null;
        totalPrice += productInfo.price * product.amount;
        return (
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ boxSizing: 5 }} src={productInfo.image}></Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ textAlign: "right" }}
              primary={productInfo.name}
            />
            <ListItemText
              sx={{ textAlign: "right" }}
              primary={`${t("cart.quantity")}: ${product.amount}`}
            />
            <ListItem
              sx={{ width: 0 }}
              secondaryAction={
                <IconButton
                  aria-label="delete"
                  onClick={() => removeProduct(product.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
          </ListItem>
        );
      })}
      <Box
        sx={{
          height: "5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ m: "1rem" }}>
          {t("cart.totalItems")}: {getTotalItems()}
        </Typography>
        <Typography variant="h6" sx={{ m: "1rem" }}>
          {t("totalPrice")}:{totalPrice}
        </Typography>
        <Button
          variant="contained"
          onClick={clearCart}
          sx={{ m: "1rem", backgroundColor: "red" }}
        >
          {t("clearCart")}
        </Button>
        <Button variant="contained" sx={{ m: "1rem" }}>
          {t("checkout")}
        </Button>
      </Box>
    </Box>
  );
};

export default CartTab;
