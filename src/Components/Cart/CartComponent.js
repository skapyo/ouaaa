import _ from "lodash";
import React, { useState } from "react";
import {
  Button,
  Item,
  Sidebar,
  Icon,
  Segment,
  Image,
  Container,
  Dropdown,
  Grid
} from "semantic-ui-react";

const getOptions = (number, prefix = "Choice ") =>
  _.times(number, index => ({
    key: index,
    text: `${prefix}${index}`,
    value: index
  }));

const CartItem = ({ name, price, nb }) => {
  return (
    <Item>
      <Item.Image src="cartImage.jpg" size="tiny" />
      <Item.Content>
        <Item.Header>{name}</Item.Header>
        <Item.Description>
          <Grid>
            <Grid.Row>
              <Grid.Column width={12}>
                <Dropdown
                  placeholder={nb}
                  compact
                  selection
                  options={getOptions(10, "")}
                />
              </Grid.Column>
              <Grid.Column width={4} style={{ "line-height": "30px" }}>
                {price}€
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Item.Description>
      </Item.Content>
    </Item>
  );
};

const CartComponent = ({ cartVisible }) => {
  const [isCloseButtonHovered, setCloseButtonHoverInd] = useState(false);
  const closeHoveredHandler = () => {
    setCloseButtonHoverInd(!isCloseButtonHovered);
  };

  return (
    <Sidebar
      as={Segment}
      visible={cartVisible}
      width="very wide"
      direction="right"
      animation="overlay"
      style={{ height: "100vh", padding: "0", border: "0" }}
      divided="vertically"
    >
      <div
        style={{ height: "30px", verticalAlign: "middle", textAlign: "center" }}
      >
        <Segment
          basic
          floated="right"
          style={{ padding: "0", border: "0", margin: "5px 5px 0px 0px" }}
        >
          <Icon
            name="close"
            size="large"
            color={isCloseButtonHovered ? "teal" : "grey"}
            onMouseEnter={closeHoveredHandler}
            onMouseLeave={closeHoveredHandler}
          />
        </Segment>
      </div>
      <div
        style={{
          width: "100%",
          position: "absolute",
          top: "30px",
          bottom: "100px"
        }}
      >
        <Segment basic style={{ margin: "50px 20px 30px 20px" }}>
          <Item.Group divided>
            <CartItem name="produit 1" price={100} nb={1} />
            <CartItem name="produit 2" price={100} nb={2} />
            <CartItem name="produit 3" price={58} nb={4} />
            <CartItem name="produit 4" price={1} nb={1} />
            <CartItem name="produit 5" price={100} nb={1} />
          </Item.Group>
        </Segment>
      </div>
      <div
        style={{
          width: "100%",
          height: "100px",
          position: "absolute",
          bottom: "0",
          verticalAlign: "middle",
          textAlign: "center"
        }}
      >
        <Grid>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={14}>
              <Button basic fluid as="a" color="teal" size="large">
                Passer la commande
              </Button>
            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
        </Grid>
      </div>
    </Sidebar>
  );
};

export default CartComponent;
