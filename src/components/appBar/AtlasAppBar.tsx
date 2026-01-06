import AppBar from "@mui/material/AppBar";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { useCartStore } from "../../store/CartStore";
import i18n from "../../i18n";

const AtlasAppBar = () => {
  const { t } = useTranslation();
  const { balance } = useCartStore();

  return (
    <AppBar position="static">
      <Typography variant="h6" component="div" sx={{ padding: "0.5rem" }}>
        {t("amountOfMoney") + ": " + balance}
      </Typography>
    </AppBar>
  );
};

export default AtlasAppBar;
