import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardImg, CardText } from "reactstrap";
export const FullProductPage = ({ products }) => {
  const { id } = useParams();
  const { title, price, image, description, rating } = products.find(
    (item) => item.id === Number(id)
  );

  return (
    <Card className="my-2 full-product">
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <CardText>{description}</CardText>
        <CardText>
          <small className="text-muted">
            rating: {rating.rate}, Price: ${price}
          </small>
        </CardText>
      </CardBody>
      <div className="image-wrapper">
        <CardImg
          alt="Card image cap"
          bottom
          src={image}
          style={{
            width: 100,
          }}
        />
      </div>
    </Card>
  );
};
