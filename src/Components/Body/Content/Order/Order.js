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
    Label,
    List
} from "semantic-ui-react";
import {CANCEL_ORDER} from '../../../../Queries/contentQueries';
import {useQuery,useMutation} from '@apollo/react-hooks';
import {Breadcrumb} from '../../../Components';
import useWindowSize from '../../../../Hooks/useWindowSize';
import Loader from '../../../Loader/Loader';
import useLoaderState from '../../../../Hooks/useLoaderState';
import {getImageUrl} from '../../../../Utils/utils';


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

const Order = ({ data,loading,error,refetch }) => {

//   const {data,loading,error} = useQuery(GET_CART,{
//     fetchPolicy:"network-only"
//   });

    const [disabled, setDisabledInd] = useState(false);
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
        if(data && data.ordersUserQuery[0].items.length > 0 ) {
            data.ordersUserQuery[0].items.map((item,index) => {
                if(item.product.pictures[0] && item.product.pictures[0].croppedPicturePath) {
                    const img = new Image();
                    addListener(index);
                    img.onload = () => changeListenerValue(index,false);
                    img.src = getImageUrl(item.product.pictures[0].croppedPicturePath);
                }
            });
        }
    },[loading,addListener,changeListenerValue,data]);

    const id = data && data.ordersUserQuery[0].id || null;
    const [cancelOrderMutation,{data:cancelOrdertData, loading:cancelOrderLoading, error:cancelOrderError}] = useMutation(CANCEL_ORDER,{variables:{orderId:id}});

    const cancelOrder = () => {
        cancelOrderMutation();
    };

    useEffect(() => {
        if(cancelOrdertData && cancelOrdertData.cancelOrder)
            refetch();
    },[cancelOrdertData,refetch]);

    const {height} = useWindowSize();
    const midHeight = (height - 230 - 230 - 10) / 2;
    const midHeightString = `${midHeight}px 0 0 0`;

    if(loadingGlobalState)
        return <Loader midHeightString={midHeightString} />;

    return (
        <>
            <Breadcrumb options={[{to:'/commandes',label:'Mes commandes'}]} lastItem={`commande n° ${data.ordersUserQuery[0].id}`} />
            <Header as='h1' style={headerStyle}>Ma commande</Header>
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
                                            {data && data.ordersUserQuery[0].items.length > 0 ?
                                                data.ordersUserQuery[0].items.map((item) => (
                                                    <CartItem
                                                        name={item.product.label}
                                                        price={item.product.price}
                                                        nb={item.quantity}
                                                        src={getImageUrl(item.product.pictures[0].croppedPicturePath)}
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
                                {/* <br/> */}
                                <Header as='h5'>Articles:</Header>
                                <List bulleted>
                                    {data && data.ordersUserQuery[0].items.length > 0 ?
                                        data.ordersUserQuery[0].items.map((item) => (
                                            // <span style={{display:'block'}}>{`${item.product.label}: ${item.quantity} pièces`}</span>
                                            <List.Item>{`${item.product.label}: ${item.quantity} pièces`}</List.Item>
                                        ))
                                        :
                                        'aucun article séléctionné'
                                    }
                                </List>

                                {/* <br/> */}
                                <Header as='h3' >{`Prix total: ${data.ordersUserQuery[0].totalprice}€`}</Header>
                                <br/>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={9}><Header as='h5' >Statut de la commande:</Header></Grid.Column>
                                        {(data && data.ordersUserQuery[0].status != "annulée") && (
                                            <Grid.Column width={7}><Header as='h5' color='teal'>{data.ordersUserQuery[0].status}</Header></Grid.Column>
                                        )}
                                        {(data && data.ordersUserQuery[0].status == "annulée") && (
                                            <Grid.Column width={7}><Header as='h5' color='red'>annulée</Header></Grid.Column>
                                        )}
                                    </Grid.Row>
                                </Grid>
                                <br/>
                                {(data && data.ordersUserQuery[0].status != "annulée") && (
                                    <Button
                                        fluid
                                        color='red'
                                        disabled={data && data.ordersUserQuery[0].items.length > 0 ?false:true}
                                        onClick={cancelOrder}
                                    >
                                        Annuler la commande
                                    </Button>
                                ) }

                                {/* <Message  info>
                          <Header>
                            Information
                          </Header>

                          Il n'a pas de paiement en ligne sur le site. Une fois la commande passée, un email sera envoyé à Elisabeth qui vous contactera.
                        </Message>    */}
                            </Segment>
                        </Sticky>
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        </>
    );
};

export default Order;
