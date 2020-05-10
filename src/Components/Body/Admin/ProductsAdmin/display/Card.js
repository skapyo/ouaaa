import React,{useCallback} from 'react';
import { useHistory } from 'react-router-dom';
import { Card,Header, Icon, Label,Image,Grid } from "semantic-ui-react";
import {Link} from "react-router-dom";
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
  
const ShopCard = ({product,moveCard,findCard,id,updateKeyIndicator}) => {

    const history = useHistory();

    const {label, activated,deleted,pictures} = product;

    var pictureUrl ;
    if(pictures.length!=0) {
        pictureUrl = pictures[0].croppedPicturePath;
    }
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

    const activatedIconCliCkHandler = useCallback(() => {
      updateKeyIndicator(id,'activated',!activated);
    },[id,activated,updateKeyIndicator]);

    const deletedIconCliCkHandler = useCallback(() => {
      updateKeyIndicator(id,'deleted',!deleted);
    },[id,deleted,updateKeyIndicator]);

    const goToProductStockDetails = useCallback(() => {
      const url = `/admin/stock/${id}`;
      history.push(url);
    },[history,id]);
    const imageCss = {
        "image-orientation":"from-image"
    };
    return (
        <div ref={node => drag(drop(node))} className='ui card' style={{ opacity}}>
          <Image  style={imageCss}
          as = {Link}
          to = {`/admin/articles/modify/${id}`}
          src={getImageUrl(pictureUrl)}
          />
          <Card.Content 
          textAlign="center"
          as = {Link}
          to = {`/admin/articles/modify/${id}`}
          >
            <Header >{label}</Header>
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Grid>
              <Grid.Row>
                <Grid.Column width= {2}></Grid.Column>
                <Grid.Column width= {4}>
                  <Icon 
                    fitted 
                    name='shop' 
                    size='large' 
                    color='black'
                    onClick={goToProductStockDetails}
                  />
                </Grid.Column>
                <Grid.Column width= {4}>
                  <Icon 
                    color={activated? 'green' : 'red' } 
                    fitted 
                    name='pin' 
                    size='large' 
                    onClick={activatedIconCliCkHandler}
                  />
                </Grid.Column>
                <Grid.Column width= {4}>
                  <Icon 
                    color={deleted? 'red' : 'black' } 
                    fitted 
                    name='trash' 
                    size='large'
                    onClick={deletedIconCliCkHandler}
                  />
                </Grid.Column>
                <Grid.Column width= {2}></Grid.Column>
              </Grid.Row>
            </Grid> 
          </Card.Content>
        </div>
    );
};

export default ShopCard;