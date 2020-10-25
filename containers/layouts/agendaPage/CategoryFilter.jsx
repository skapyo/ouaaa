import React from 'react';
import {useQuery}  from '@apollo/client';
import {Container} from "@material-ui/core";
import gql from "graphql-tag";
import {makeStyles} from '@material-ui/core/styles';
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
    activated ,
    subCategories {
      id
      label
      icon
  }
  }
}
`;

const CategoryFilter = (refetch) => {
  
  const classes = useStyles()
  const {data: categoryData, loading, error} = useQuery(
    GET_CATEGORIES
  )

  const [state, setState] = React.useState({})

  const handleChange = (category, event) => {
    setState({ ...state, [category.id.toString()]: event.target.checked });

    const categoriesChecked = [];
    categoryData && categoryData.categories.map((categoryiterator) =>{
      //State are stored checkbox changed, it not contain all checkbox state at initalisation
      let t = state[categoryiterator.id];
      //set state is not yet set for the current category checked
      if(categoryiterator.id==category.id){
        t=event.target.checked;
      }


      if (!(t !== undefined && !t)) {
        //Add subCategory
        categoryiterator.subCategories.map((subcategoryiterator) =>{
          categoriesChecked.push(subcategoryiterator.id);
        });

        categoriesChecked.push(categoryiterator.id);
      }
    });

    refetch.refetch.refetch({categories:categoriesChecked})

  }

  return (
    <Container>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          {
            categoryData && categoryData.categories.map((category) =>
              <FormControlLabel
                control={<Checkbox defaultChecked checked={state[category.id.toString()]}  onChange={(e) => handleChange(category, e)} name={category.label} />}
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