import React, {useState,useEffect, useCallback} from "react";
import {
    Image as ImageSemantic,
    Card,
    Icon,
    Grid,
    Label,
    Button,
    Dropdown,
    Dimmer,
    Container,
    Header,
    Form,
    Popup,
    Input, Select
} from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import {ADD_LIKED_PRODUCT, ADD_PRODUCT_CART, REMOVE_LIKED_PRODUCT} from './../../../../Queries/contentQueries';
import {useMutation} from '@apollo/react-hooks';
import {getImageUrl} from './../../../../Utils/utils';
import {useSessionState} from "../../../../Context/Session/session";
import isNumber from "is-number";
import cogoToast from "cogo-toast";
import ReactGA from 'react-ga';

const CardLabel = ({isLiked,onClickHandler}) => {
  return (
  <Label corner="left" color="teal" onClick={onClickHandler}>
    <Icon name="heart" size="large" color={isLiked ? "red" : "grey"}/>
  </Label>
  );
};
const formValuesInit = {
    quantity:1
};

const margin = {
    "margin-top": "-1em"
};
const ShopCard = ({product,refetch}) => {

    const {id,label, price,isLiked} = product;

    const [loading, setLoadingInd] = useState(true);
    const [imageLiked, setLikedIndicator] = useState(isLiked);

    const session = useSessionState();
    const isServer = typeof window === 'undefined';
    if(isServer) {
        const location = useLocation();
    }else{
        const location = "";
    }
    const [addLikedPoduct,{data:addData,error:addError}] = useMutation(
        ADD_LIKED_PRODUCT,
        {variables:{productId:id}}
    );

    const [removeLikedPoduct,{data:remData,error:remError}] = useMutation(
        REMOVE_LIKED_PRODUCT,
        {variables:{productId:id}}
    );
    /* if product change: reset loading indicator */
    useEffect(() => {
        setLoadingInd(true);
    },[product]);

    const [selectOptions,setSelectOptions] = useState();
    const [submitListener, setListenerValue] = useState(false);
    const [cartLoading, setCartLoadingInd] = useState(false);
    const [formValues,setFormValue] = useState(formValuesInit);
  const state = useSessionState();
    const formChangeHandler = (e,data) => {
        setFormValue({ ...formValues, [data.name]: data.value });
    };
    const formSubmitHandler = () => {

        setCartLoadingInd(true);
        addProductInCart();
    };
    const [addProductInCart,{data:cartActionData,loading:cartActionLoading,error:cartActionError}] = useMutation(
        ADD_PRODUCT_CART,
        {variables:{productId:id,quantity:formValues.quantity}}
    );

    useEffect(() => {

        if(cartActionData && cartActionData.addProductInCart) {
            cogoToast.success("L'article a bien été ajouté dans le panier.",{position:'top-right'});
            // resetListenersList();
            setCartLoadingInd(false);
            ReactGA.event({
                category: "add product to cart",
                action: "User add a product to cart",
            });
        }
    },[cartActionData]);

    useEffect(() => {

        if(formValues) {
            if(isNumber(formValues.quantity) && formValues.quantity != 0 ) setListenerValue(true);
            else setListenerValue(false);
        }
    },[formValues]);


    useEffect(() => {
        if(cartActionError) {
            cogoToast.error("Veuillez vous authentifier avant d'ajouter un article au panier.", {position: 'top-right'});
            ReactGA.event({
                category: "no logged add to cart",
                action: "User not loggued try to add product to cart",
            });
            setCartLoadingInd(false);
        }

    },[cartActionError]);

    /* set liked ind to true */
    useEffect(() =>  {
        if(addData && !addError)
            refetch();
    },[addData,addError,refetch]);


    /* set liked ind to false */
    useEffect(() =>  {
        if(remData && !remError)
            refetch();
    },[remData,remError,refetch]);

    /* reset liked state if prop changes */
    useEffect(() => {
        setLikedIndicator(isLiked);
    },[isLiked]);

    /* liked heart icon click handler */
    const onClickHandler = useCallback(() => {
        if(!isLiked) addLikedPoduct();
        else removeLikedPoduct();
    },[addLikedPoduct,removeLikedPoduct,isLiked]);

    return (
    <Card >
        {session && (<CardLabel isLiked={isLiked} onClickHandler={onClickHandler}  />)}

      <ImageSemantic
        as = {Link}
        to ={{
            pathname:`/produit/${id}`,
            state:{from : location.pathname}
        }}
        src={getImageUrl(product.pictures!=null && product.pictures[0]!=null ?product.pictures[0].croppedPicturePath:null)}
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
        {price!=null && (
        <span >{`${price} €`}</span>
        )}

                <Form >
                    <Form.Group style={{padding:'5px'}} widths='equal'>
                        <Button
                            fluid
                            color='yellow'
                            animated='horizontal'
                            name='ss'
                            as = {Link}
                            to = {{
                                pathname:`/produit/${id}`,
                                state:{from : location.pathname}
                            }}
                        >
                            <Button.Content hidden  style={{"margin-top": "-1em"}}>
                                En savoir plus
                            </Button.Content>
                            <Button.Content visible>
                                <Icon name='info circle' color='white'/>
                            </Button.Content>
                        </Button>
                        {(<Form.Field fluid  widths='2'>
                                <Popup content='Quantité' trigger={<Input
                                    name='quantity'
                                    fluid
                                    placeholder='Quantité'
                                    onChange={formChangeHandler}
                                    value={formValues.quantity}
                                />} />
                            </Form.Field>
                            )
                        }
                        <Form.Field fluid>
                            <Button
                                fluid
                                color='teal'
                                animated='vertical'
                                name='submit'
                                disabled={!submitListener}
                                loading={cartLoading}
                                onClick={formSubmitHandler}
                            >
                                <Button.Content hidden  style={{"margin-top": "-1em"}}>Ajouter au panier</Button.Content>
                                <Button.Content visible>
                                    <Icon name='cart' color='white'/>
                                </Button.Content>
                            </Button>
                        </Form.Field>
                    </Form.Group>
                </Form>
        </Card.Header>    
      </Card.Content>
    </Card>
  );
};

export default ShopCard;
