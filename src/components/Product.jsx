import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
export const Product = ({
  id,
  title,
  price,
  description,
  image,
  category,
  toggleFavorites,
  favorites,
  addToCart,
}) => {
  const isFavorite = favorites.some((product) => product.id === id);

  return (
    <Card
      style={{
        width: "13rem",
      }}
      className="product-card"
    >
      <img alt="Sample" src={image} />
      <MdFavorite
        className="favorite-icon"
        onClick={() => toggleFavorites(id)}
        style={{ fill: isFavorite ? "red" : "lightgray" }}
      />
      <CardBody>
        <Link to={`/products/${id}`} className="link">
          <CardTitle tag="h5" className="product-title">
            {title}
          </CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Price: ${price}
          </CardSubtitle>

          <CardText>{description.slice(0, 100)}...</CardText>
        </Link>

        <Button onClick={() => addToCart(id)}>Add to Cart</Button>
      </CardBody>
    </Card>
  );
};
