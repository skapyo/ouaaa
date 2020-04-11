
import React, { useEffect,useCallback } from 'react';
import {Segment,Header, Table,Item,List} from "semantic-ui-react";
import {omitTypename} from './../../../../Utils/utils';
import gql from "graphql-tag";
import {default as useObjectListStateManager} from './../../../../Hooks/useDnDStateManager';
import {useQuery} from '@apollo/react-hooks';
import Moment from 'react-moment';

const GET_ORDERS_LIST = gql`
    query getOrders {
        ordersUserQuery {
            id,
            createdAt,
            user{
                surname,
                lastname,
                email,
                phone,
            },
            ,
            items{
                quantity,
                product{
                    label,
                    price
                }
            },
            totalprice
        }
    }
`;
const OrdersAdmin = () => {

    const {objectsList,initState,isModified,updateKeyIndicator} = useObjectListStateManager();
    const {data,loading,error} = useQuery(GET_ORDERS_LIST);

    useEffect(() => {
        if(data) {
            initState(omitTypename(data.ordersUserQuery));
        }
    },[data,initState]);

    if(error)
    return 'error';

    if(loading || !objectsList)
        return 'loading';

    return (
        <Segment>
            <Header>Gestion des commandes</Header>
            <br />
            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>ID</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Date</Table.HeaderCell>
                        <Table.HeaderCell width={6}>Articles</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Utilisateur</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Prix total</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {objectsList.map((order) => (
                        <Table.Row>
                            <Table.Cell>{order.id}</Table.Cell>
                            <Table.Cell><Moment format="YYYY-MM-DD HH:mm">{new Date(order.createdAt)}</Moment></Table.Cell>
                            <Table.Cell>
                            <List bulleted>
                                    {order.items.map((item) => (
                                    <List.Item>{`${item.product.label}: ${item.quantity} pièces * ${item.product.price}€` }</List.Item>
                            ))
                            }
                            </List>
                            </Table.Cell>
                            <Table.Cell>
                                <List>
                                    <List.Item> {order.user.surname} {order.user.lastname}</List.Item>
                                     <List.Item> {order.user.email} {order.user.phone}</List.Item>
                                </List>
                            </Table.Cell>
                            <Table.Cell>{order.totalprice}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>

            </Table>
        </Segment>
    );
}

export default OrdersAdmin;