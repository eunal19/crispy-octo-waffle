import { Product } from "./Product";
export const List = ({
  renderedProducts,
  toggleFavorites,
  favorites,
  addToCart,
}) => {
  return (
    <div className="products-wrapper">
      {renderedProducts.map((product) => {
        return (
          <Product
            {...product}
            toggleFavorites={toggleFavorites}
            favorites={favorites}
            addToCart={addToCart}
          />
        );
      })}
    </div>
  );
};
