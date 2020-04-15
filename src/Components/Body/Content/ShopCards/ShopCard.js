import React, {useState,useEffect} from "react";
import {
    Image,
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
import { Link } from "react-router-dom";
import {ADD_LIKED_PRODUCT, ADD_PRODUCT_CART, REMOVE_LIKED_PRODUCT} from './../../../../Queries/contentQueries';
import {useMutation} from '@apollo/react-hooks';
import {getImageUrl} from './../../../../Utils/utils';
import {useSessionState,useSessionDispatch} from "./../../../../Session/session";
import isNumber from "is-number";
import cogoToast from "cogo-toast";

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
const ShopCard = ({product}) => {

  const {id,img,label, price,isLiked,isUnlimited} = product;
//debugger;
  const [addLikedPoduct,{data:addData,loading:addLoading,error:addError}] = useMutation(
    ADD_LIKED_PRODUCT,
    {variables:{productId:id}}
    );

  const [removeLikedPoduct,{data:remData,loading:remLoading,error:remError}] = useMutation(
    REMOVE_LIKED_PRODUCT,
    {variables:{productId:id}}
    );
    const [selectOptions,setSelectOptions] = useState();
    const [submitListener, setListenerValue] = useState(false);
    const [cartLoading, setCartLoadingInd] = useState(false);
    const [formValues,setFormValue] = useState(formValuesInit);
  const [imageLiked, setLikedIndicator] = useState(isLiked);
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
  const onClickHandler = () => {
    if(!imageLiked) addLikedPoduct();
    else removeLikedPoduct();
  };
    useEffect(() => {

        if(cartActionData && cartActionData.addProductInCart) {
            cogoToast.success("L'article a bien été ajouté dans le panier.",{position:'top-right'});
            // resetListenersList();
            setCartLoadingInd(false);
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
            setCartLoadingInd(false);
        }

    },[cartActionError]);

    useEffect(() =>  {
    if(addData && !addError)
      setLikedIndicator(true);
  },[addData]);

  useEffect(() =>  {
    if(remData && !remError)
      setLikedIndicator(false);
  },[remData]);
  return (
    <Card >
      {state && (
      <CardLabel isLiked={imageLiked} onClickHandler={onClickHandler}  />
)}
      <Image
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
                            to = {`/produit/${id}`}

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
