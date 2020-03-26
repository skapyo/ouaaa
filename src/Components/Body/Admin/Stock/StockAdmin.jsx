import React from 'react';
import {useParams} from "react-router-dom";
import gql from "graphql-tag";
import {useQuery} from '@apollo/react-hooks';
import { Segment,Table,Header } from 'semantic-ui-react';

const GET_PRODUCT_INFOS = gql`
  query getProductInfos ($id:String!) {
    product (id:$id) {
      id,
      label,
      short_description,
      description,
      price,
      isUnlimited,
      qavailable,
      qincart,
      qinorder,
      qsold,
      saleActions {
          id,
          number,
          action,
          actionDate,
          label,
          qavailable,
          qincart,
          qinorder,
          qsold,
          unlimited,
          userId
      }
    }
  }
`;

const StockAdmin = () => {

    const {productId} = useParams();

    const {data, loading, error} = useQuery(GET_PRODUCT_INFOS,{variables:{id:productId}});

    if(error)
        return 'error';

    if(loading)
        return 'loading';

    return (
        <Segment>
            <Header>{`Détails des stocks du produit ${productId}`}</Header>
            <br />
            <Table celled >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>number</Table.HeaderCell>
                        <Table.HeaderCell>action</Table.HeaderCell>
                        <Table.HeaderCell>actionDate</Table.HeaderCell>
                        <Table.HeaderCell>qavailable</Table.HeaderCell>
                        <Table.HeaderCell>qincart</Table.HeaderCell>
                        <Table.HeaderCell>qinorder</Table.HeaderCell>
                        <Table.HeaderCell>qsold</Table.HeaderCell>
                        <Table.HeaderCell>unlimited</Table.HeaderCell>
                        <Table.HeaderCell>userId</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.product.saleActions.map((saleAction) => (
                        <Table.Row>
                            <Table.Cell>{saleAction.number}</Table.Cell>
                            <Table.Cell>{saleAction.action}</Table.Cell>
                            <Table.Cell>{saleAction.actionDate}</Table.Cell>
                            <Table.Cell>{saleAction.qavailable}</Table.Cell>
                            <Table.Cell>{saleAction.qincart}</Table.Cell>
                            <Table.Cell>{saleAction.qinorder}</Table.Cell>
                            <Table.Cell>{saleAction.qsold}</Table.Cell>
                            <Table.Cell>{saleAction.unlimited}</Table.Cell>
                            <Table.Cell>{saleAction.userId}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Segment>
    );
};

export default StockAdmin;