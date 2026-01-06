import ProductCard from "../productCard/ProductCard";
import productData from "../../data/products.json";
import { Box } from "@mui/material";

const HomeTab = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {productData.map((product) => (
        <ProductCard
          id={product.id}
          name={product.name}
          description={product.description}
          image={product.image}
          price={product.price}
          category={product.category}
        />
      ))}
    </Box>
  );
};
export default HomeTab;
