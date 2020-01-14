import React, {useEffect} from 'react';

import { useLazyQuery} from '@apollo/react-hooks';
import {GET_PRODUCTS_LIST} from './../../../../Queries/contentQueries';

import {Grid,Form} from "semantic-ui-react";

import { useAlert } from 'react-alert'

const ProductsSelect = ({productSelecthandler, categoryId=null, disabled}) => {

    // init lazy query to fetch products infos needed  
    const [loadList,{error, data:productsData }] = useLazyQuery(GET_PRODUCTS_LIST,{
      variables: { id:categoryId },
      fetchPolicy:"network-only"
    });

    // load products data if category is defined
    useEffect(()=> {
      if(categoryId) {
        loadList();
      }
    },[categoryId]);

    // init alert from useAlert hook
    const alert = useAlert();

    // print error alert if error 
    if(error !== undefined) {
      alert.error("Il y a eu une erreur pendant la récupération de la liste des produits!");
    }

    //  init select options if datas are received from server
    let selectionOptions = [];
    if(productsData !== undefined) {
      console.log(productsData);
      selectionOptions = productsData.page.products.map((product) => {
        return {key:product.id, value:product.id, text:product.label};
      });
    }
    
    // return statement
    return (
      <Grid> 
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={14}>
            <Form.Select
              fluid
              placeholder="Sélectionner un produit"
              options={selectionOptions}
              onChange={productSelecthandler}
              disabled={disabled}
            />
          </Grid.Column>
          <Grid.Column width={1} />
        </Grid.Row>
      </Grid>
    );
};

export default ProductsSelect;