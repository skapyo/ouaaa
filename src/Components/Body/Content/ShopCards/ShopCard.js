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

  const [imageLiked, setLikedIndicator] = useState(isLiked);

  const onClickHandler = () => {
    setLikedIndicator(!imageLiked);
  };

  const [isDimmed,setDimmed] = useState(false);
  const handleShow = () => setDimmed(true);
  const handleHide = () => setDimmed(false);

  return (
    <Card >

      <CardLabel isLiked={imageLiked} onClickHandler={onClickHandler}  />
      
      {/* <Dimmer.Dimmable as ={Container} dimmed={isDimmed} onMouseEnter={handleShow}  onMouseLeave={handleHide}> */}
        <Image 
          as = {Link}
          to = {`/produit/${id}`}
          src={imageURL}  
          // size='small'
        />

        {/* <Dimmer active={isDimmed} inverted> */}
          
        {/* <Button  color="teal" size="large"> */}
          {/* <Button.Content hidden>Shop</Button.Content> */}
          {/* <Button.Content visible> */}
            {/* <Icon name='search' size='large' color='teal' /> */}
          {/* </Button.Content>
        </Button> */}
      
        {/* </Dimmer> */}

      {/* </Dimmer.Dimmable> */}

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
