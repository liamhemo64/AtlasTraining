import { Box, Dialog, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface OrderCompletedDialogProps {
  open: boolean;
  onClose: () => void;
  isSuccess: boolean;
}

const OrderCompletedDialog = ({
  open,
  onClose,
  isSuccess,
}: OrderCompletedDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          alignItems: "center",
          minWidth: "18.75rem",
          p: "1.25rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isSuccess ? (
          <>
            <CheckCircleOutlineIcon
              sx={{ fontSize: "4rem", color: "green" }}
            />
            <Typography variant="h6">{t("purchaseSuccessful")}</Typography>
            <Typography variant="body2" color="text.secondary">
              {t("thankYouForYourPurchase")}
            </Typography>
          </>
        ) : (
          <>
            <ErrorOutlineIcon sx={{ fontSize: "4rem", color: "red" }} />
            <Typography variant="h6">{t("notEnoughMoney")}</Typography>
            <Typography variant="body2" color="text.secondary">
              {t("pleaseAddMoney")}
            </Typography>
          </>
        )}
      </Box>
    </Dialog>
  );
};

export default OrderCompletedDialog;
