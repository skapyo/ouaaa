import React, {useState,useEffect} from "react";
import { Image, Card, Icon ,Label, Button, Dropdown, Dimmer, Container, Header} from "semantic-ui-react";
import { Link } from "react-router-dom";

const CardLabel = ({isLiked,onClickHandler}) => {

  return (
  <Label corner="left" color="teal" onClick={onClickHandler}>
    <Icon name="heart" size="large" color={isLiked ? "red" : "grey"}/>
  </Label>
  );

};

const ShopCard = ({isLiked, imageURL, id}) => {

  console.log('ShopCard');

  const [imageLiked, setLikedIndicator] = useState(isLiked);

  const onClickHandler = () => {
    setLikedIndicator(!imageLiked);
  };

  return (
    <Card >
      <CardLabel isLiked={imageLiked} onClickHandler={onClickHandler}  />
      <Image 
        as = {Link}
        to = {`/produit/${id}`}
        src={imageURL}  
        // size='small'
      />
      <Card.Content 
        textAlign="center"
        as = {Link}
        to = {`/produit/${id}`}
      >
        <Card.Header>Pochette</Card.Header>
        <Card.Description>
          Pochette en tissu croisé rouge
        </Card.Description>
      </Card.Content>
      <Card.Content extra textAlign="center">
        <Card.Header>
          <span className="prix">15 €</span>
        </Card.Header>    
      </Card.Content>
    </Card>
  );
};

export default ShopCard;
