import React from 'react';
import { Card,Header, Icon, Label,Image } from "semantic-ui-react";
import {useParams,Link} from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";
import {getImageUrl} from './../../../../../Utils/utils';


const CardLabel = ({isLiked,onClickHandler}) => {
    return (
    <Label corner="left" color="teal" onClick={onClickHandler}>
      <Icon name="heart" size="large" color={isLiked ? "red" : "grey"}/>
    </Label>
    );
};


const ItemTypes = {
    CARD: "card"
  };
  
const ShopCard = ({product,moveCard,findCard,id}) => {

    const {label, price,isLiked,pictures} = product;

    const originalIndex = findCard(id).index;

    const [{ isDragging }, drag] = useDrag({
      item: { type: ItemTypes.CARD, id, originalIndex },
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    });
  
    const [, drop] = useDrop({
      accept: ItemTypes.CARD,
      canDrop: () => false,
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      }
    });
  
    const opacity = isDragging ? 0 : 1;

    return (
        <div ref={node => drag(drop(node))} style={{ opacity}}>
            <Card style={{margin:"0px 12.250px"}}> 
                {/* <CardLabel   /> */}
                <Image 
                as = {Link}
                to = {`/admin/articles/modify/${id}`}
                src={getImageUrl(pictures[0].croppedPicturePath)}  
                />
                <Card.Content 
                textAlign="center"
                as = {Link}
                to = {`/admin/articles/modify/${id}`}
                >
                <Header >{label}</Header>
                </Card.Content>
                <Card.Content extra textAlign="center">
                <Card.Header>
                    <span className="prix">{`${price} €`}</span>
                </Card.Header>    
                </Card.Content>
            </Card>
        </div>
    );
};

export default ShopCard;