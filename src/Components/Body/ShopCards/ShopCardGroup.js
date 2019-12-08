import React from "react";
import ShopCard from "./ShopCard";
import { Card } from "semantic-ui-react";

const ShopCardGroup = ({ itemsPerRow }) => (
  <Card.Group itemsPerRow={itemsPerRow}>
    <ShopCard imageURL="cartImage.jpg" isLiked />
    <ShopCard imageURL="Test2.jpg" isLiked />
    <ShopCard imageURL="Test3.jpg" />
    <ShopCard imageURL="cartImage.jpg" />
    <ShopCard imageURL="Test3.jpg" isLiked />
    <ShopCard imageURL="Test2.jpg" />
    <ShopCard imageURL="cartImage.jpg" isLiked />
  </Card.Group>
);

export default ShopCardGroup;
