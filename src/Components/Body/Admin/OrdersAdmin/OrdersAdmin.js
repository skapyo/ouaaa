import React from 'react';
import {Segment,Header, Table} from "semantic-ui-react";


const OrdersAdmin = () => {

    return (
        <Segment>
            <Header>Gestion des commandes</Header>
            <br />
            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={2}>ID</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Date</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Statut</Table.HeaderCell>
                        <Table.HeaderCell width={7}>Utilisateur</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Prix total</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>1</Table.Cell>
                        <Table.Cell>01/02/20</Table.Cell>
                        <Table.Cell>En cours</Table.Cell>
                        <Table.Cell>Christophe Guerlus</Table.Cell>
                        <Table.Cell>50€</Table.Cell>
                    </Table.Row>
                </Table.Body>

            </Table>
        </Segment>
    );
}

export default OrdersAdmin;