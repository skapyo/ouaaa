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
  Grid,
  Header,
  Form,
  Sticky,
  Message
} from "semantic-ui-react";
import {GET_CART} from './../../../../Queries/contentQueries';
import {useQuery,useMutation} from '@apollo/react-hooks';
import {Breadcrumb} from './../../../Components';

const getOptions = (number, prefix = "Choice ") =>
  _.times(number, index => ({
    key: index,
    text: `${prefix}${index}`,
    value: index
  }));

  
const headerStyle = {
  "font-family": "Ubuntu', sans-serif",
  "font-size": "30px",
  // 'font-style': 'normal',
  "font-weight": "lighter",
  color: "#009C95"
};

const StrickyHeaderStyle = {
  "font-family": "Ubuntu', sans-serif",
  "font-size": "20px",
  // 'font-style': 'normal',
  "font-weight": "lighter",
  color: "#009C95"
  };

const CartItem = ({ name, price, nb,src }) => {
  return (
    
    <Item>
      <Item.Image src={src} size="small" />
      <Item.Content verticalAlign='middle'>
      <Item.Header>{name}</Item.Header>
        <Item.Description>{`Quantité: ${nb}`}</Item.Description>
        <Item.Description>{`Prix unitaire: ${price}€`}</Item.Description>
        <Item.Extra >
  <Segment basic floated='right'>{`Prix: ${nb} x ${price}€ = `}<span style={StrickyHeaderStyle}>{`${nb*price}€`}</span></Segment>
        </Item.Extra>
      </Item.Content>
    </Item>
    // </Grid>

  );
};

const CartPage = ({ cartVisible }) => {

  const {data,loading,error} = useQuery(GET_CART);

  console.log(data);

  const [isCloseButtonHovered, setCloseButtonHoverInd] = useState(false);
  const closeHoveredHandler = () => {
    setCloseButtonHoverInd(!isCloseButtonHovered);
  };

  if(loading) 
    return 'loading';

  return (
    <>
      <Breadcrumb lastItem='Mon panier' />
      <Header as='h1' style={headerStyle}>Mon panier</Header>
      <br />
      <br />
      <Grid stackable>
          <Grid.Row>
              <Grid.Column width={11}>
              <Grid stackable textAlign='center' verticalAlign='middle'>
                
                <Grid.Column style={{ maxWidth: '80vh' }}>
                  
                  
                <Grid verticalAlign='left'>
                  <Grid.Column width='16'>
                      <Item.Group divided relaxed >
                        {data && data.cartQuery.items ?
                        data.cartQuery.items.map((item) => (
                          <CartItem 
                            name={item.product.label} 
                            price={item.product.price} 
                            nb={item.quantity} 
                            src={item.product.pictures[0].croppedPicturePath}
                          />
                        ))
                        :
                        'le panier est vide'
                        }
                      </Item.Group>
                    </Grid.Column>
                </Grid>
              
                </Grid.Column>
              </Grid>
              </Grid.Column>
              <Grid.Column width={5}>                     
                  <Sticky offset={100}>
                      <Segment>
                        <Header as='h1' style={StrickyHeaderStyle}>Résumé de la commande:</Header>
                        <br/>
                        {data && data.cartQuery.items ? 
                          data.cartQuery.items.map((item) => (
                            <span style={{display:'block'}}>{`${item.product.label}: ${item.quantity} pièces`}</span>
                          ))
                         :
                         'aucun article séléctionné'
                        }
                        <br/>
                      <Header as='h3' >{`Prix total: ${data.cartQuery.totalprice}€`}</Header>
                        <br/>
                        <Button fluid color='teal'>
                            Passer commande
                        </Button>
                        <Message  info>
                          <Header>
                            Information
                          </Header>
                          
                          Il n'a pas de paiement en ligne sur le site. Une fois la commande passée, un email sera envoyé à Elisabeth qui vous contactera.
                        </Message>   
                      </Segment>
                  </Sticky>
              </Grid.Column>
          </Grid.Row>
          
      </Grid>
    </>
  );
};

export default CartPage;
