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
  categories: {
    fontFamily: "Roboto",
    fontWeight: "100",
  },
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
    GET_CATEGORIES
  )

  const [state, setState] = React.useState({})

  const handleChange = (category, event) => {
    setState({ ...state, [category.id.toString()]: event.target.checked });
  }

  return (
    <Container>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          {
            categoryData && categoryData.categories.map((category) =>
              <FormControlLabel
                control={<Checkbox defaultChecked checked={state[category.id.toString()]} onChange={(e) => handleChange(category, e)} name={category.label} />}
                label={
                  <span className={classes.categories}>
                    {category.label}
                  </span>
                }
              />
            )
          }
        </FormGroup>
      </FormControl>
    </Container>
  )
}

export default CategoryFilter