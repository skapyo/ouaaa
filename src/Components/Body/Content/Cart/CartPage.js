import _ from "lodash";
import React, { useState ,useEffect} from "react";
import {
  Button,
  Item,
  Segment,
  Grid,
  Header,
  Form,
  Sticky,
  Message
} from "semantic-ui-react";
import {GET_CART} from './../../../../Queries/contentQueries';
import {useQuery,useMutation} from '@apollo/react-hooks';
import {Breadcrumb} from './../../../Components';
import useWindowSize from './../../../../Hooks/useWindowSize';
import Loader from './../../../Loader/Loader';
import useLoaderState from './../../../../Hooks/useLoaderState';


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
  console.log(src);
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

  const {data,loading,error} = useQuery(GET_CART,{
    fetchPolicy:"network-only"
  });

  const [isCloseButtonHovered, setCloseButtonHoverInd] = useState(false);
  const closeHoveredHandler = () => {
    setCloseButtonHoverInd(!isCloseButtonHovered);
  };

  // const [dataToRender, setdataToRender] = useState();

  const [loadingGlobalState, 
      { 
          addListener, 
          changeListenerValue 
      }
  ] = useLoaderState();

  useEffect(() => {  
    if(data && data.cartQuery.items.length > 0 ) {
      data.cartQuery.items.map((item,index) => {
        if(item.product.pictures[0] && item.product.pictures[0].croppedPicturePath) {
          const img = new Image();
          addListener(index);
          img.onload = () => changeListenerValue(index,false);
          img.src = item.product.pictures[0].croppedPicturePath;
        }
      })
    }
  },[loading]);

  const {height} = useWindowSize();
  const midHeight = (height - 230 - 230 - 10) / 2;
  const midHeightString = `${midHeight}px 0 0 0`;

  if(loadingGlobalState) 
    return <Loader midHeightString={midHeightString} />;

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
                        {data && data.cartQuery.items.length > 0 ?
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
                        {data && data.cartQuery.items.length > 0 ? 
                          data.cartQuery.items.map((item) => (
                            <span style={{display:'block'}}>{`${item.product.label}: ${item.quantity} pièces`}</span>
                          ))
                         :
                         'aucun article séléctionné'
                        }
                        <br/>
                      <Header as='h3' >{`Prix total: ${data.cartQuery.totalprice}€`}</Header>
                        <br/>
                        <Button fluid color='teal' disabled={data && data.cartQuery.items.length > 0 ?false:true}>
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
