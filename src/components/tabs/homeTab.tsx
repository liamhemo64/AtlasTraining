import ProductCard from "../productCard/ProductCard";
import productData from "../../data/products.json";
import { Box } from "@mui/material";
import { useCartStore } from "../../store/CartStore";

const HomeTab = () => {
  const {} = useCartStore();
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: "repeat(5, 1fr)",
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
