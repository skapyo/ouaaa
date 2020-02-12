import React, {useEffect,useState} from 'react';
import {useParams} from "react-router-dom";
import {useQuery,useMutation} from '@apollo/react-hooks';
import {
    GET_PRODUCT,
    ADD_LIKED_PRODUCT,
    REMOVE_LIKED_PRODUCT,
    ADD_PRODUCT_CART
} from './../../../../Queries/contentQueries';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { Grid , Header ,Divider,Sticky, Segment, Form,Input,Select,Button,Icon,Container,Message} from 'semantic-ui-react';
import Loader from './../../../Loader/Loader';
import useLoaderState from './../../../../Hooks/useLoaderState';
import useWindowSize from './../../../../Hooks/useWindowSize';
import {Breadcrumb} from '../../../Components/';
import isNumber from 'is-number';
import { BreakingChangeType } from 'graphql';
import {getImageUrl} from './../../../../Utils/utils';



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

const spanEspace = {
    width:'20px'
};

const formValuesInit = {
    quantity:''
}

const ProductPage = () => {

    const {productId} = useParams();

    const {data, loading, error,refetch} = useQuery(GET_PRODUCT,{variables:{id:productId}});

    
    const [submitListener, setListenerValue] = useState(false);

    const [formValues,setFormValue] = useState(formValuesInit);

    const formChangeHandler = (e,data) => {
        setFormValue({ ...formValues, [data.name]: data.value });
    };

    useEffect(() => {
        if(formValues) {
            if(isNumber(formValues.quantity) && formValues.quantity != 0 ) setListenerValue(true);
            else setListenerValue(false);
        }
    },[formValues])


    const [dataToRender, setdataToRender] = useState();

    const [loadingGlobalState, 
        { 
            addListener, 
            changeListenerValue 
        }
    ] = useLoaderState();

    useEffect(() =>{  
        if(!loading && data && data.product.pictures) {
          setdataToRender( data.product.pictures.map((picture, index) => {
            const img = new Image();
            addListener(index);
            img.onload = () => changeListenerValue(index,false);
            img.src = getImageUrl(picture.croppedPicturePath);
            return {
                original: img.src,
                thumbnail: img.src,
            };
          }));
        }
    },[loading]);

    const [addLikedPoduct,{data:addData,loading:addLoading,error:addError}] = useMutation(
        ADD_LIKED_PRODUCT,
        {variables:{productId:productId}}
        );
    
    const [removeLikedPoduct,{data:remData,loading:remLoading,error:remError}] = useMutation(
        REMOVE_LIKED_PRODUCT,
        {variables:{productId:productId}}
        );

    const [productLiked, setLikedIndicator] = useState();
    
    console.log(productLiked);

    const onHeartClickHandler = () => {
        if(!productLiked) addLikedPoduct();
        else removeLikedPoduct();
    };

    useEffect(() => {
        if(data) {
            setLikedIndicator(data.product.isLiked);
        }
    },[data]);

    useEffect(() =>  {
        if(addData && !addError)
        setLikedIndicator(true);
    },[addData]);

    useEffect(() =>  {
        if(remData && !remError)
        setLikedIndicator(false);
    },[remData]);

    const [addProductInCart,{data:cartActionData,loading:cartActionLoading,error:cartActionError}] = useMutation(
        ADD_PRODUCT_CART,
        {variables:{productId:productId,quantity:formValues.quantity}}
    );

    const [cartLoading, setCartLoadingInd] = useState(false);

    const formSubmitHandler = () => {
        setCartLoadingInd(true);
        addProductInCart();
    };

    useEffect(() => {
        if(cartActionData && cartActionData.addProductInCart.success) {
            refetch();
        }
    },[cartActionData])


    const [selectOptions,setSelectOptions] = useState();

    useEffect(() => {
        if(!loading && data) {
            if(!data.product.isUnlimited) {
                let selectOptionsTemp = [];
                for (let i = 0; i <= data.product.qavailable; i++) {
                    selectOptionsTemp.push({
                        key:i,
                        value:i,
                        text:i
                    })
                }
                setSelectOptions(selectOptionsTemp);
            }
            if(cartLoading) setCartLoadingInd(false);
        }
    },[data,cartActionData]);


    const {height} = useWindowSize();
    const midHeight = (height - 230 - 230 - 10) / 2;
    const midHeightString = `${midHeight}px 0 0 0`;

    if (loadingGlobalState)
        return <Loader midHeightString={midHeightString} />;

    if (error) 
        return 'error';

    return (
        <>  
            <Breadcrumb options={[{to:`/categorie/${data.product.page.id}`,label:data.product.page.label}]} lastItem={data.product.label} />
            <Header as='h1' style={headerStyle}>{data.product.label}</Header>
            <br />
            <br />
            <Grid>
                <Grid.Row>
                    <Grid.Column width={11}>
                        <ImageGallery 
                            items={dataToRender} 
                            thumbnailPosition = 'left'
                            showFullscreenButton = {false}
                            showPlayButton = {false}
                            showNav = {false}
                            slideOnThumbnailOver = {true}
                        />
                    </Grid.Column>
                    <Grid.Column width={5}>                     
                        <Sticky offset={100}>
                            <Segment>
                                <Segment floated='right' basic style={{padding:0,margin:0}}>
                                    <Icon 
                                        name='heart' 
                                        color={productLiked ? 'red':'grey'} 
                                        size='large'
                                        
                                        />
                                </Segment>
                                <Form onSubmit={formSubmitHandler}>
                                    <Header onClick={onHeartClickHandler} as='h1' style={StrickyHeaderStyle}>{data.product.label}</Header>
                                    <br/>
                                    {data.product.isUnlimited ?
                                        'Quantité illimitée'
                                        : 
                                        `Quantité restante: ${data.product.qavailable} pièces`
                                    }
                                    <br/>
                                    <br/>
                                    <br/>
                                    <Form.Group style={{padding:'5px'}} widths='equal'>
                                        {data.product.isUnlimited ? 
                                        (<Form.Field fluid >
                                            <Input 
                                                name='quantity' 
                                                fluid 
                                                placeholder='Quantité'
                                                onChange={formChangeHandler}
                                                value={formValues.name}
                                            />
                                        </Form.Field>) 
                                        :
                                        (<Form.Field fluid >
                                            <Select 
                                                name='quantity' 
                                                fluid 
                                                placeholder='Quantité'
                                                onChange={formChangeHandler}
                                                value={formValues.name}
                                                options={selectOptions}
                                            />
                                        </Form.Field>)
                                        }
                                        <Form.Field fluid>
                                            <Button 
                                                fluid 
                                                color='teal' 
                                                animated='vertical' 
                                                name='submit'
                                                disabled={!submitListener}
                                                loading={cartLoading}
                                            >
                                            <Button.Content hidden>Ajouter au panier</Button.Content>
                                            <Button.Content visible>
                                                <Icon name='cart' color='white'/>
                                            </Button.Content>
                                            </Button>
                                        </Form.Field>
                                    </Form.Group>
                                </Form>      
                                <Message  info>
                                <Header>
                                    Information
                                </Header>
                                    Il n'a pas de paiement en ligne sur le site. Une fois la commande validée dans le panier, un email sera envoyé à Elisabeth qui vous contactera.
                                </Message>                      
                            </Segment>
                            
                        </Sticky>

                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={12}>   
                        <br/>                  
                        <Header style={headerStyle} >Description: </Header>
                        <br/>
                        {data.product.description.split('\n').map( (it, i) => <div key={'x'+i}>{it}</div> )}
                        <br />
                    </Grid.Column>
                    <Grid.Column width={4}>                     
        
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    );
};
export default ProductPage;