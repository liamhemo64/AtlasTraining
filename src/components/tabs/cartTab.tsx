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
import DeleteIcon from "@mui/icons-material/Delete";
import productData from "../../data/products.json";
import { useMemo, useState } from "react";
import OrderCompletedDialog from "../OrderCompletedDialog";

const CartTab = () => {
  const { t } = useTranslation(); //rename -- cant...
  const { cart, balance, clearCart, getTotalItems, removeProduct, checkout } =
    useCartStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = () => {
    if (balance < totalPrice) {
      setIsSuccess(false);
      setIsDialogOpen(true);
    } else {
      checkout(totalPrice);
      setIsSuccess(true);
      setIsDialogOpen(true);
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const productDictionary = useMemo(() => {
    return productData.reduce<Record<string, any>>((acc, item) => {
      acc[String(item.id)] = item;
      return acc;
    }, {});
  }, []);

  const totalPrice = useMemo(() => {
    return cart.reduce((total, product) => {
      const productInfo = productDictionary[String(product.id)];
      if (!productInfo) return total;
      return total + productInfo.price * product.amount;
    }, 0);
  }, [cart, productDictionary]);

  return (
    <>
      <Box sx={{ justifyContent: "space-between" }}>
        {cart.map((product) => {
          const productInfo = productDictionary[String(product.id)];

          if (!productInfo) return null;
          return (
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <ListItemAvatar>
                {/* rem */}
                <Avatar src={productInfo.image}></Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{ textAlign: "right" }}
                primary={productInfo.name}
                secondary={`${t("price")}: ${productInfo.price}`}
              />
              <ListItemText
                sx={{ textAlign: "right" }}
                primary={`${t("cart.quantity")}: ${product.amount}`}
                secondary={` ${productInfo.price * product.amount}`}
              />
              <ListItem
                sx={{ width: "0rem" }}
                secondaryAction={
                  <IconButton
                    aria-label="delete"
                    sx={{ color: "red" }}
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
            {t("totalPrice")}: {totalPrice}
          </Typography>
          <Button
            variant="contained"
            onClick={clearCart}
            sx={{ m: "1rem", backgroundColor: "red" }}
          >
            {t("clearCart")}
          </Button>
          <Button
            variant="contained"
            sx={{ m: "1rem" }}
            onClick={() => handleCheckout()}
          >
            {t("checkout")}
          </Button>
        </Box>
      </Box>
      <OrderCompletedDialog
        open={isDialogOpen}
        onClose={handleClose}
        isSuccess={isSuccess}
      />
    </>
  );
};

export default CartTab;
