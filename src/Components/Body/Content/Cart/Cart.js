import React, { useState ,useEffect, useCallback} from "react";
import {
  Button,
  Item,
  Segment,
  Grid,
  Header,
  Sticky,
  Message,
  Dropdown
} from "semantic-ui-react";
// import {GET_CART,SUBMIT_ORDER} from '../../../../Queries/contentQueries';
import {useQuery,useMutation} from '@apollo/react-hooks';
import {Breadcrumb} from '../../../Components';
import useWindowSize from '../../../../Hooks/useWindowSize';
import Loader from '../../../Loader/Loader';
import useLoaderState from '../../../../Hooks/useLoaderState';
import {getImageUrl,buildQuantitySelectOptions} from '../../../../Utils/utils';
import { useHistory } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import gql from "graphql-tag";


const headerStyle = {
  "font-family": "Ubuntu', sans-serif",
  "font-size": "30px",
  "font-weight": "lighter",
  color: "#009C95"
};

const StrickyHeaderStyle = {
  "font-family": "Ubuntu', sans-serif",
  "font-size": "20px",
  "font-weight": "lighter",
  color: "#009C95"
  };

const FloatedSegmentStyle = {
  "padding": "0"
  };


  /* queries .. */
  const GET_CART= gql`
  {
    cartQuery {
      id,
      status,
      totalprice,
      items {
        id,
        quantity,
        product {
          id,
          label,
          short_description,
          price,
          pictures {
            id,
            croppedPicturePath
          }
        }
      }
    }
  }
`;

const SUBMIT_ORDER= gql`
  mutation submitOrder {
    submitOrder
  }
`;

const UPDATE_PRODUCT_QUANTITY = gql`
  mutation delProductInCart($productId:Int!,$quantity:Int!) {
    delProductInCart(productId:$productId,quantity:$quantity)
  }
`;

const CartItem = ({ name, price, nb,src,id,refetch }) => {

  const [updateQuantiyMutation,{data:updateQuantitytData, loading:updateQuantityLoading, error:updateQuantityError}] = useMutation(UPDATE_PRODUCT_QUANTITY);

  const quantityChangeHandler = useCallback((e,data) => {
    updateQuantiyMutation(
      {variables:{
        productId:id,
        quantity:data.value
      }
    });
  },[updateQuantiyMutation,id]);

  useEffect(() => {
    if(updateQuantitytData && updateQuantitytData.delProductInCart)
      refetch();
  },[updateQuantitytData,refetch]);

  return (
    <Item as ={Segment}>
      <Item.Image src={src} size="small" />
      <Item.Content verticalAlign='middle'>
        <Segment
          style={FloatedSegmentStyle}
          basic
          floated='right'
        >
          {`Prix: ${nb} x ${price}€ = `}<span style={StrickyHeaderStyle}>{`${nb*price}€`}</span>
          <br />
          <br />
          Quantité:&nbsp;&nbsp;&nbsp;
          <Dropdown
            basic
            inline
            options={buildQuantitySelectOptions(nb)}
            onChange={quantityChangeHandler}
            defaultValue={nb}
            value={nb}
            loading={updateQuantityLoading}
          />
        </Segment>
        <Item.Header>{name}</Item.Header>
        {/* <Item.Description>{`Quantité: ${nb}`}</Item.Description> */}
        <Item.Description>{`Prix unitaire: ${price}€`}</Item.Description>
      </Item.Content>
    </Item>
  );
};

const Cart = () => {

  const [loadingGlobalState, { addListener, changeListenerValue }] = useLoaderState();
  const [firstLoading, setFirstLoadingInd] = useState(true);

  const {data,loading,error,refetch} = useQuery(GET_CART,{fetchPolicy:"no-cache"});
  const [submitOrderMutation,{data:orderSubmitData, loading:orderSubmitLoading, error:orderSubmitError}] = useMutation(SUBMIT_ORDER);


  useEffect(() => {

    if(data?.cartQuery)
    {
        setFirstLoadingInd(false); // dont activate the loader for next refreshs
    }

    if(data?.cartQuery?.items?.length > 0 && firstLoading) {
      data.cartQuery.items.map((item,index) => {
        if(item.product.pictures[0] && item.product.pictures[0].croppedPicturePath) {
          const img = new Image();
          addListener(index);
          img.onload = () => changeListenerValue(index,false);
          img.src = getImageUrl(item.product.pictures[0].croppedPicturePath);
        }else{
            addListener(index);
            changeListenerValue(index,false);
        }
      });
    };
    if(data?.cartQuery?.items?.length == 0 && firstLoading) {
      addListener(1);
      changeListenerValue(1,false);
    };
  },[loading,addListener,changeListenerValue,data,firstLoading]);

  const history = useHistory();

  useEffect(() => {
    if(orderSubmitData?.submitOrder ) {
      cogoToast.success("La commande a bien été transmise.",{position:'top-right'});
      history.push(`/commande/${orderSubmitData.submitOrder}`);

    };
  },[orderSubmitData,history]);

  const submitOrder = () => {
    submitOrderMutation();
  };

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
                        {data.cartQuery && data.cartQuery.items.length > 0 ?
                        data.cartQuery.items.map((item) => (
                          <CartItem
                            name={item.product.label}
                            price={item.product.price}
                            nb={item.quantity}
                            src={getImageUrl(item.product.pictures.length!=0?item.product.pictures[0].croppedPicturePath:null)}
                            id={item.product.id}
                            refetch={refetch}
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
                      {data.cartQuery && data.cartQuery.items.length > 0 ?
                        data.cartQuery.items.map((item) => (
                          <span style={{display:'block'}}>{`${item.product.label}: ${item.quantity} pièces`}</span>
                        ))
                        :
                        'aucun article séléctionné'
                      }
                      <br/>
                      {data.cartQuery && data.cartQuery.totalprice!=null && data.cartQuery.totalprice!=0 && (
                        <Header as='h3' >{`Prix total: ${data.cartQuery.totalprice}€`}</Header>
                      )}
                      <br/>
                      <Button
                        fluid
                        color='teal'
                        disabled={data.cartQuery && data.cartQuery.items.length > 0 ? false : true}
                        onClick={submitOrder}
                      >
                          Passer commande
                      </Button>
                      <Message  info>
                        <Header>
                          Information
                        </Header>
                        Il n'a pas de paiement en ligne sur le site. Une fois la commande passée, un email sera envoyé à Schipper Horticulture qui vous contactera.
                      </Message>
                    </Segment>
                  </Sticky>
              </Grid.Column>
          </Grid.Row>
      </Grid>
    </>
  );
};

export default Cart;
