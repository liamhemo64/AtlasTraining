import AppBar from "@mui/material/AppBar";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { useCartStore } from "../../store/CartStore";

const AtlasAppBar = () => {
  const { t } = useTranslation();
  const { money } = useCartStore();

  return (
    <AppBar position="static">
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, padding: "0.5rem" }}
      >
        {t("amountOfMoney") + ": " + money}
      </Typography>
    </AppBar>
  );
};

export default AtlasAppBar;
