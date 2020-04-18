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
import{useSessionState} from '../../../../Context/Session/session';
import cogoToast from 'cogo-toast';
import {useDeviceContext} from './../../../../Context/Device/device';



const headerStyle = {
    "font-family": "Ubuntu', sans-serif",
    "font-size": "30px",
    "font-weight": "lighter",
    color: "#009C95"
};

const StrickyHeaderStyle = {
    "font-famiselectOptionsly": "Ubuntu', sans-serif",
    "font-size": "20px",
    "font-weight": "lighter",
    color: "#009C95"
};

const formValuesInit = {
    quantity:1
};

const ProductPage = ({location}) => {

    const {productId} = useParams();

    const session = useSessionState();

    const [submitListener, setListenerValue] = useState(false);
    const [formValues,setFormValue] = useState(formValuesInit);
    const [dataToRender, setdataToRender] = useState();
    const [productLiked, setLikedIndicator] = useState();
    const [cartLoading, setCartLoadingInd] = useState(false);
    const [selectOptions,setSelectOptions] = useState();
    const [firstLoading, setFirstLoadingInd] = useState(true);
    const [imageLoadingError, setImgLoadingError] = useState(false);

    const [loadingGlobalState,
        {
            addListener,
            changeListenerValue,
            resetListenersList
        }
    ] = useLoaderState();
    const device = useDeviceContext();

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
            cogoToast.success("L'article a bien été ajouté dans le panier.",{position:device.toastPosition});
            refetch();
        }
    },[cartActionData,refetch,resetListenersList,device]);


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

    const breadcrumbTo = location.state?.from ? location.state.from : `/categorie/${data.product.category.id}`;

    return (
        <>

            <Breadcrumb options={[{to:breadcrumbTo,label:data.product.category.label}]} lastItem={data.product.label} />
            <Header as='h1' style={headerStyle}>{data.product.label}</Header>
            <br />
            <br />
            <Grid stackable>
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
                        <Description/>
                        <ul>
                            { data.product.conditionnement!=null && (
                                   <li>Conditionnement : {data.product.conditionnement}</li>
                        ) }
                            { data.product.fleurie!=null && (
                            <li>Fleurie : {data.product.fleurie}</li>
                            ) }
                            { data.product.resitance!=null && (
                            <li>Resistance : {data.product.resitance}</li>
                            ) }
                            { data.product.couleur!=null && (
                            <li>Couleur : {data.product.couleur}</li>
                            ) }
                            { data.product.type!=null && (
                            <li>Type : {data.product.type}</li>
                            ) }
                            { data.product.hauteur!=null && (
                            <li>Hauteur : {data.product.hauteur}cm</li>
                            ) }
                            { data.product.feuillage!=null && (
                            <li>Feuillage : {data.product.feuillage}</li>
                            ) }
                            { data.product.urlPdf!=null && (
                            <li><a target="_blank" href={data.product.urlPdf}>Fiche pdf</a></li>
                            ) }
                            { data.product.temperature!=null && (
                            <li>Température gel : {data.product.temperature}&deg;</li>
                            ) }
                            { data.product.hauteurAdulte!=null && (
                            <li>Hauteur adulte : {data.product.hauteurAdulte}m</li>
                            ) }
                            { data.product.largeurAdulte!=null && (
                            <li>Largeur adulte : {data.product.largeurAdulte}m</li>
                            ) }
                            { data.product.startFloraison!=null && (
                            <li>Début de floraison : {data.product.startFloraison}</li>
                            ) }
                            { data.product.endFloraison!=null && (
                            <li>Fin de floraison : {data.product.endFloraison}</li>
                            ) }
                            { data.product.sol!=null && (
                            <li>Sol : {data.product.sol}</li>
                            ) }
                            { data.product.exposition!=null && (
                            <li>Exposition : {data.product.exposition}</li>
                            ) }


                        </ul>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Sticky offset={100} active={device.isMobileOnly?false:true}>
                            <Segment>

                                <Segment floated='right' basic style={{padding:0,margin:0}}>

                                 { session && (<Icon
                                        name='heart'
                                        color={productLiked ? 'red':'grey'}
                                        size='large'

                                    />
                                 )}
                                </Segment>

                                <Form onSubmit={formSubmitHandler}>
                                    <Header onClick={onHeartClickHandler} as='h1' style={StrickyHeaderStyle}>{data.product.label}</Header>
                                    <br/>
                                    {false &&(data.product.isUnlimited ?
                                        'Quantité illimitée'
                                        :
                                        `Quantité restante: ${data.product.qavailable} pièces`)
                                    }
                                        {data.product.price!=null ?
                                            'Prix Unitaire : '+data.product.price+'€'
                                                :
                                                'Pas de prix disponible'
                                        }
                                    <br/>
                                    <br/>
                                    <br/>
                                    <Form.Group style={{padding:'5px'}} widths='equal'>
                                        {data.product.isUnlimited ?
                                            (<Form.Field fluid >
                                                <Input
                                                    name='quantity'
                                                    label='Quantité'

                                                    fluid
                                                    placeholder='Quantité'
                                                    onChange={formChangeHandler}
                                                    value={formValues.quantity}
                                                />
                                            </Form.Field>)
                                            :
                                            (<Form.Field fluid >
                                                <Select
                                                    name='quantity'

                                                    label='Quantité'
                                                    fluid
                                                    placeholder='Quantité'
                                                    onChange={formChangeHandler}
                                                    value={formValues.quantity}
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

            </Grid>
        </>
    );
};
export default ProductPage;