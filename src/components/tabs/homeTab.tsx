import ProductCard from "../productCard/productCard";

const HomeTab = () => {
  return (
    <ProductCard
      id={1}
      name="liam"
      description="description of liam"
      image="src/images/liam.jpg"
      price={29.99}
      category="Food & Drink"
    />
  );
};
export default HomeTab;
