import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {GET_ALL_ORDERS} from '../../../../Queries/contentQueries';
import useLoaderState from '../../../../Hooks/useLoaderState';
import Loader from '../../../Loader/Loader';
import useWindowSize from '../../../../Hooks/useWindowSize';
import { Breadcrumb } from '../../../Components';
import {Header,Card, List, Segment} from "semantic-ui-react";
import { Link } from 'react-router-dom';

const headerStyle = {
    "font-family": "Ubuntu', sans-serif",
    "font-size": "30px",
    "font-weight": "lighter",
    color: "#009C95"
};

const OrdersPage = () => {

    const {data,loading,error} = useQuery(GET_ALL_ORDERS,{fetchPolicy:"network-only"});

    if (loading)
        return 'loading';

    return (
        <>
            <Breadcrumb  lastItem='Mes commandes' />
            <Header as='h1' style={headerStyle}>Mes commandes</Header>
            <br />
            <br />
            <div>
                {data.ordersUserQuery.map((item,index) => {
                    return (
                        <Segment disabled={item.status=='annulée'?true:false}>
                            <Header as={Link} to={`/commande/${item.id}`}>Commande n°: {item.id}</Header>
                            <Segment basic floated='right' textAlign='right'>
                                {item.status == 'annulée' && (
                                    <Header as='h5' color='red'>Statut: <span>{item.status}</span></Header>
                                )}
                                {item.status != 'annulée' && (
                                    <Header as='h5' color='teal'>Statut: <span>{item.status}</span></Header>
                                )}
                                <Header as='h5'>Prix total: <span>{`${item.totalprice}€`}</span></Header>
                            </Segment>
                            <Header as='h4' color='teal'>Article(s) de la commande:</Header>
                            <List bulleted>
                                {item.items.map((product,index) => {
                                    return (
                                        <List.Item key={`orders-${item.id}-${product.id}`}>
                                            {`Produit: ${product.product.label} , quantité: ${product.quantity}`}
                                        </List.Item>
                                    );
                                })}
                            </List>

                        </Segment>
                    );
                })}
            </div>

        </>
    );

};

export default OrdersPage;