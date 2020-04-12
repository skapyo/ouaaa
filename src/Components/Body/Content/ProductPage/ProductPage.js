import React, {useEffect,useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {useQuery,useMutation} from '@apollo/react-hooks';
import {
    GET_PRODUCT,
    ADD_LIKED_PRODUCT,
    REMOVE_LIKED_PRODUCT,
    ADD_PRODUCT_CART
} from './../../../../Queries/contentQueries';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { Grid , Header ,Divider,Sticky, Segment, Form,Input,Select,Button,Icon,Container,Message,List} from 'semantic-ui-react';
import Loader from './../../../Loader/Loader';
import useLoaderState from './../../../../Hooks/useLoaderState';
import useWindowSize from './../../../../Hooks/useWindowSize';
import {Breadcrumb} from '../../../Components/';
import isNumber from 'is-number';
import { BreakingChangeType } from 'graphql';
import {getImageUrl,buildQuantitySelectOptions} from './../../../../Utils/utils';
import{useSessionState} from './../../../../Session/session';
import cogoToast from 'cogo-toast';


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

const formValuesInit = {
    quantity:''
};

const ProductPage = () => {

    const {productId} = useParams();

    const session = useSessionState();

    const [submitListener, setListenerValue] = useState(false);
    const [formValues,setFormValue] = useState(formValuesInit);
    const [dataToRender, setdataToRender] = useState();
    const [productLiked, setLikedIndicator] = useState();
    const [cartLoading, setCartLoadingInd] = useState(false);
    const [selectOptions,setSelectOptions] = useState();
    const [firstLoading, setFirstLoadingInd] = useState(true);

    const [loadingGlobalState,
        {
            addListener,
            changeListenerValue,
            resetListenersList
        }
    ] = useLoaderState();

    const {data, loading, error,refetch} = useQuery(GET_PRODUCT,{variables:{id:productId}});

    const [addLikedPoduct,{data:addData,loading:addLoading,error:addError}] = useMutation(
        ADD_LIKED_PRODUCT,
        {variables:{productId:productId}}
    );
    const [removeLikedPoduct,{data:remData,loading:remLoading,error:remError}] = useMutation(
        REMOVE_LIKED_PRODUCT,
        {variables:{productId:productId}}
    );
    const [addProductInCart,{data:cartActionData,loading:cartActionLoading,error:cartActionError}] = useMutation(
        ADD_PRODUCT_CART,
        {variables:{productId:productId,quantity:formValues.quantity}}
    );

    const formChangeHandler = (e,data) => {
        setFormValue({ ...formValues, [data.name]: data.value });
    };

    const onHeartClickHandler = () => {
        if(!productLiked) addLikedPoduct();
        else removeLikedPoduct();
    };

    const formSubmitHandler = () => {
        setCartLoadingInd(true);
        addProductInCart();
    };

    useEffect(() => {
        if(formValues) {
            if(isNumber(formValues.quantity) && formValues.quantity != 0 ) setListenerValue(true);
            else setListenerValue(false);
        }
    },[formValues]);

    useEffect(() =>{
        if(!loading && data ) {
            if (data.product.pictures && data.product.pictures.length!=0){
                setdataToRender(data.product.pictures.map((picture, index) => {

                    const img = new Image();
                    // addListener(index);debugger;
                    changeListenerValue(index, false);
                    img.src = getImageUrl(picture.croppedPicturePath);
                    return {
                        original: img.src,
                        thumbnail: img.src,
                    };
                }));
            }else{
                setdataToRender([""].map((picture, index) => {

                    // addListener(index);debugger;
                    changeListenerValue(index, false);
                    return {
                        original: null,
                        thumbnail: null,
                    };
                }));
            }
        }
    },[loading,addListener,changeListenerValue,data]);

    useEffect(() => {
        if(data) {
            setLikedIndicator(data.product.isLiked);
        }
    },[data]);

    useEffect(() =>  {
        if(addData && !addError)
            setLikedIndicator(true);
    },[addData,setLikedIndicator,addError]);

    useEffect(() =>  {
        if(remData && !remError)
            setLikedIndicator(false);
    },[remData,setLikedIndicator,remError]);

    useEffect(() => {

        if(cartActionData && cartActionData.addProductInCart) {
            cogoToast.success("L'article a bien été ajouté dans le panier.",{position:'top-right'});
            // resetListenersList();
            refetch();
        }
    },[cartActionData,refetch,resetListenersList]);

    useEffect(() => {
        if(cartActionError) {
            cogoToast.error("Veuillez vous authentifier avant d'ajouter un article au panier.", {position: 'top-right'});
        refetch();
}

},[cartActionError]);



    useEffect(() => {
        if(!loading && data) {
            if(!data.product.isUnlimited) {
                // let selectOptionsTemp = [];
                // for (let i = 0; i <= data.product.qavailable; i++) {
                //     selectOptionsTemp.push({
                //         key:i,
                //         value:i,
                //         text:i
                //     });
                // }
                setSelectOptions(buildQuantitySelectOptions(data.product.qavailable));
            }
            if(cartLoading) setCartLoadingInd(false);
        }
    },[data,cartActionData,cartLoading,loading]);

    const {height} = useWindowSize();
    const midHeight = (height - 230 - 230 - 10) / 2;
    const midHeightString = `${midHeight}px 0 0 0`;

    function Description() {

        if (data.product.description!=null) {
            return (<Grid.Row>
                <Grid.Column width={12}>
                    <br/>
                    <Header style={headerStyle} >Description: </Header>
                    <br/>
                    {data.product.description==null?"":data.product.description.split('\n').map( (it, i) => <div key={'x'+i}>{it}</div> )}
                    <br />
                </Grid.Column>
                <Grid.Column width={4}>

                </Grid.Column>
            </Grid.Row>);
        }
        return null;
    }



    if (loadingGlobalState)
        return <Loader midHeightString={midHeightString} />;

    if (error)
        return 'error';
    return (
        <>

            <Breadcrumb options={[{to:`/categorie/${data.product.category.id}`,label:data.product.category.label}]} lastItem={data.product.label} />
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
                            hidden= {true}
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
                                    Il n'a pas de paiement en ligne sur le site. Une fois la commande validée dans le panier, un email sera envoyé à Schipper Horticulture qui vous contactera.
                                </Message>
                            </Segment>

                        </Sticky>

                    </Grid.Column>
                </Grid.Row>

                <Description/>
        <Grid.Row>
            <List bulleted>
            { data.product.conditionnement!=null && (
                    <List.Item>Conditionnement : {data.product.conditionnement}</List.Item>
        ) }
            { data.product.fleurie!=null && (
                    <List.Item>Fleurie : {data.product.fleurie}</List.Item>
        ) }
                    { data.product.resitance!=null && (
                            <List.Item>Resistance : {data.product.resitance}</List.Item>
                ) }
                    { data.product.couleur!=null && (
                            <List.Item>Couleur : {data.product.couleur}</List.Item>
                ) }
                    { data.product.type!=null && (
                            <List.Item>Type : {data.product.type}</List.Item>
                ) }
                { data.product.hauteur!=null && (
                        <List.Item>Hauteur : {data.product.hauteur}</List.Item>
                ) }
                { data.product.feuillage!=null && (
                <List.Item>Feuillage : {data.product.feuillage}</List.Item>
                ) }
                { data.product.urlPdf!=null && (
                <List.Item><a target="_blank" href={data.product.urlPdf}>Fiche pdf</a></List.Item>
                ) }
        { data.product.temperature!=null && (
        <List.Item>Temperature : {data.product.temperature}</List.Item>
        ) }
        { data.product.hauteurAdulte!=null && (
        <List.Item>Hauteur Adulte : {data.product.hauteurAdulte}</List.Item>
        ) }
        { data.product.largeurAdulte!=null && (
        <List.Item>Largeur Adulte : {data.product.largeurAdulte}</List.Item>
        ) }
        { data.product.startFloraison!=null && (
        <List.Item>Début de floraison : {data.product.startFloraison}</List.Item>
        ) }
        { data.product.endFloraison!=null && (
        <List.Item>Fin de floraison : {data.product.endFloraison}</List.Item>
        ) }
        { data.product.sol!=null && (
        <List.Item>Sol : {data.product.sol}</List.Item>
        ) }
        { data.product.exposition!=null && (
        <List.Item>Exposition : {data.product.exposition}</List.Item>
        ) }


            </List>

        </Grid.Row>
        <Grid.Row> </Grid.Row>
            </Grid>
        </>
    );
};
export default ProductPage;