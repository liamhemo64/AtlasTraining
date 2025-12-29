import {
  Avatar,
  Box,
  Button,
  Dialog,
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
import { useMemo, useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const CartTab = () => {
  const { t } = useTranslation();
  const { cart, clearCart, getTotalItems, removeProduct, money, checkout } =
    useCartStore();

  const handleCheckout = () => {
    if (money < totalPrice) {
      setOpenError(true);
    } else {
      checkout(totalPrice);
      setOpenSuccess(true);
    }
  };
  const handleClose = () => {
    setOpenError(false);
    setOpenSuccess(false);
  };

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  let totalPrice = 0;

  const productDictionary = useMemo(() => {
    return productData.reduce<Record<string, any>>((acc, item) => {
      acc[String(item.id)] = item;
      return acc;
    }, {});
  }, []);

  return (
    <>
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
                secondary={`${t("price")}: ${productInfo.price}`}
              />
              <ListItemText
                sx={{ textAlign: "right" }}
                primary={`${t("cart.quantity")}: ${product.amount}`}
                secondary={` ${productInfo.price * product.amount}`}
              />
              <ListItem
                sx={{ width: 0 }}
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

      <Dialog open={openError} onClose={handleClose}>
        <Box
          sx={{
            alignItems: "center",
            minWidth: 300,
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 50, color: "red" }} />
          <Typography variant="h6">{t("notEnoughMoney")}</Typography>
          <Typography variant="body2" color="text.secondary">
            {t("pleaseAddMoney")}
          </Typography>
        </Box>
      </Dialog>
      <Dialog open={openSuccess} onClose={handleClose}>
        <Box
          sx={{
            alignItems: "center",
            minWidth: 300,
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6">{t("purchaseSuccessful")}</Typography>
          <Typography variant="body2" color="text.secondary">
            {t("thankYouForYourPurchase")}
          </Typography>
        </Box>
      </Dialog>
    </>
  );
};

export default CartTab;
