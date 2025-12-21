import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import CartTab from "./tabs/cartTab";
import HomeTab from "./tabs/homeTab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const MainPage = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ ":dir": "rtl", borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={selectedTab} aria-label="main page tabs">
          <Tab icon={<HomeIcon />} onClick={() => setSelectedTab(0)} />
          <Tab icon={<ShoppingCartIcon />} onClick={() => setSelectedTab(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={selectedTab} index={0}>
        <HomeTab />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={1}>
        <CartTab />
      </CustomTabPanel>
    </Box>
  );
};

export default MainPage;
