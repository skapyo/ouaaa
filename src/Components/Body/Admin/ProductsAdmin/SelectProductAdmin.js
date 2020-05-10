import React, {useState, useCallback} from 'react';

import CategoriesSelect from './../BaseComponent/CategoriesSelect';
import ProductsSelect from './../BaseComponent/ProductsSelect';

import {
    Segment,
    Header,
    Divider,
    Form,
    Button
  } from "semantic-ui-react";
import { useHistory } from 'react-router-dom';

const SelectProductAdmin = () => {

    // init states to store selected category id
    const [categorySelected, setCategorySelectInd] = useState(false);
     // init states to store selected product id
    const [productSelected, setProductSelectInd] = useState(false);

    // store selected category id in state
    const categorySelecthandler = (event, {value}) => {
        if (!(typeof value === "undefined")) setCategorySelectInd(value);
        else setCategorySelectInd(false);
    };
    // store selected product id in state
    const productSelecthandler = (event, {value}) => {
        if (!(typeof value === "undefined")) setProductSelectInd(value);
        else setProductSelectInd(false);
    };

    // init history to redirect on submit
    const history = useHistory();

    // handler submit button click
    const formSubmitHandler = (event) => {
        event.preventDefault();
        history.push(`/admin/articles/modify/${productSelected}`);
    };
    
    // return statement
    return (
        <Segment>
            <Header>Séléctionner l'article à modifier</Header>
            <br />
            <Form onSubmit={formSubmitHandler}>
                <Divider horizontal>
                    <Header as="h4">Selectionner la catégorie</Header>
                </Divider>
                <CategoriesSelect categorySelecthandler={categorySelecthandler} />
                
                <br />
                <Divider horizontal>
                    <Header as="h4">Selectionner le produit</Header>
                </Divider>
                <ProductsSelect 
                    productSelecthandler={productSelecthandler} 
                    categoryId={categorySelected} 
                    disabled={categorySelected ? false : true}
                />

                <br />
                <br />
                <Button 
                    fluid 
                    loading={false} 
                    content='Submit' 
                    disabled={categorySelected && productSelected ? false : true}
                >
                    Séléctionner 
                </Button>
            </Form>
        </Segment>
    );

}

export default SelectProductAdmin;