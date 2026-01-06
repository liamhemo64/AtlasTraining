import { useState, type SyntheticEvent } from "react";
import { Tab, Box } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import HomeTab from "./tabs/HomeTab";
import CartTab from "./tabs/CartTab";

const AtlasTabs = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box
          sx={{
            ":dir": "rtl",
            borderBottom: "10.5rem",
            borderColor: "divider",
          }}
        >
          <TabList onChange={handleChange}>
            <Tab icon={<HomeIcon />} value="1" />
            <Tab icon={<ShoppingCartIcon />} value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <HomeTab />
        </TabPanel>
        <TabPanel value="2">
          <CartTab />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default AtlasTabs;
