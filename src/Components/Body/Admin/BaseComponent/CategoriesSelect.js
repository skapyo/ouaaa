import React from 'react';

import { useQuery} from '@apollo/react-hooks';
import {GET_CATEGORYS_LIST} from './../../../../Queries/contentQueries';

import {Grid,Form} from "semantic-ui-react";

import { useAlert } from 'react-alert'

const CategoriesSelect = React.memo(({categorySelecthandler,defaultValue=null}) => {
    
    // init query to fetch categories infos needed
    const {error, data:categoriesData } = useQuery(GET_CATEGORYS_LIST,{
      fetchPolicy:"network-only"
    });

    // init alert from useAlert hook
    const alert = useAlert();

    // print error alert if error 
    if(error !== undefined) {
      alert.error("Il y a eu une erreur pendant la récupération de la liste des catégories!");
    }
  
    //  init select options if datas are received from server
    let selectionOptions = [];
    if(categoriesData !== undefined) {
      selectionOptions = categoriesData.categorys.map((category) => {
        return {key:category.id, value:category.id, text:category.label};
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
              placeholder="Sélectionner la catégorie"
              options={selectionOptions}
              onChange={categorySelecthandler}
              defaultValue={defaultValue}
            />
          </Grid.Column>
          <Grid.Column width={1} />
        </Grid.Row>
      </Grid>
    );
});
CategoriesSelect.whyDidYouRender = true;
export default CategoriesSelect;