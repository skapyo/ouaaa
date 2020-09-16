import React, { useState } from 'react';
import {useMutation, useQuery} from "@apollo/react-hooks";
import { Container } from "@material-ui/core";
import gql from "graphql-tag";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({

})

const GET_CATEGORIES = gql`
query categories {
  categories {
    id,
    label,
    activated
  }
}
`;

const CategoryFilter = () => {
  
  const classes = useStyles()
  const {data: categoryData, loading, error} = useQuery(
    GET_CATEGORIES,
    {}
  )
/*
  categoryData.categories.map((category) => {
    category.activated = true
  })
*/
  const handleChange = (event, category) => {
    category.activated = event.target.checked
  }

  return (
    <Container>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          {
            categoryData && categoryData.categories.map((category) => {
              <FormControlLabel
                control={<Checkbox checked={category.activated} onChange={handleChange(event, category)} name="alimentation" />}
                label={category.label}
              />
            })
          }
        </FormGroup>
      </FormControl>
    </Container>
  )
}

export default CategoryFilter