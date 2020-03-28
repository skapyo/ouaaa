import React, {useState,useEffect} from "react";
import { Image, Card, Icon ,Label, Button, Dropdown, Dimmer, Container, Header} from "semantic-ui-react";
import { Link } from "react-router-dom";
import {ADD_LIKED_PRODUCT,REMOVE_LIKED_PRODUCT} from './../../../../Queries/contentQueries';
import {useMutation} from '@apollo/react-hooks';
import {getImageUrl} from './../../../../Utils/utils';


const CardLabel = ({isLiked,onClickHandler}) => {
  return (
  <Label corner="left" color="teal" onClick={onClickHandler}>
    <Icon name="heart" size="large" color={isLiked ? "red" : "grey"}/>
  </Label>
  );
};


const ShopCard = ({product}) => {

  const {id,img,label, price,isLiked} = product;
//debugger;
  const [addLikedPoduct,{data:addData,loading:addLoading,error:addError}] = useMutation(
    ADD_LIKED_PRODUCT,
    {variables:{productId:id}}
    );

  const [removeLikedPoduct,{data:remData,loading:remLoading,error:remError}] = useMutation(
    REMOVE_LIKED_PRODUCT,
    {variables:{productId:id}}
    );

  const [imageLiked, setLikedIndicator] = useState(isLiked);

  const onClickHandler = () => {
    if(!imageLiked) addLikedPoduct();
    else removeLikedPoduct();
  };

  useEffect(() =>  {
    if(addData && !addError)
      setLikedIndicator(true);
  },[addData]);

  useEffect(() =>  {
    if(remData && !remError)
      setLikedIndicator(false);
  },[remData]);
    const imageCss = {
        "image-orientation":"from-image"
    };
  return (
    <Card >
      <CardLabel isLiked={imageLiked} onClickHandler={onClickHandler}  />
      <Image   style={imageCss}
        as = {Link}
        to = {`/produit/${id}`}
        src={img.src}  
      />
      <Card.Content 
        textAlign="center"
        as = {Link}
        to = {`/produit/${id}`}
      >
        <Header >{label}</Header>
      </Card.Content>
      <Card.Content extra textAlign="center">
        <Card.Header>
          <span className="prix">{`${price} €`}</span>
        </Card.Header>    
      </Card.Content>
    </Card>
  );
};

export default ShopCard;
