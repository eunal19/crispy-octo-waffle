import {
  ListGroup,
  ListGroupItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export const Cart = ({ cart, updateQuantity, deleteFromCart }) => {
  const numOfListItems = [];
  for (let i = 1; i <= 10; i++) {
    numOfListItems.push(i);
  }
  return (
    <div className="cart-wrapper">
      <h2>Cart</h2>
      <ListGroup>
        {cart.map(({ title, price, image, quantity, id }) => {
          return (
            <ListGroupItem className="cart-row">
              <img src={image} height={50} width={100} />
              <p className="cart-row-title">{title}</p>
              <p>${price}</p>

              <UncontrolledDropdown>
                <DropdownToggle caret color="dark">
                  {quantity} {quantity === 1 ? "item" : "items"}
                </DropdownToggle>
                <DropdownMenu dark>
                  {numOfListItems.map((num) => {
                    return (
                      <DropdownItem onClick={() => updateQuantity(id, num)}>
                        {num} {num === 1 ? "item" : "items"}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
              <p style={{ fontWeight: "bold" }}>${price * quantity}</p>
              <Button
                color="danger"
                size="sm"
                className="cart-row-delete"
                onClick={() => deleteFromCart(id)}
              >
                Delete
              </Button>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
};
