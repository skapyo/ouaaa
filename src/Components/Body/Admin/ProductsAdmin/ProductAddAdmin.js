import React, { useState, useEffect, useCallback } from "react";

import {GET_PAGES_LIST,MODIFY_PAGE_INFORMATIONS,ADD_NEW_PAGE} from '../../../../Queries/contentQueries';

import { useQuery ,useMutation} from '@apollo/react-hooks';

import {
  Segment,
  Header,
  Divider,
  Icon,
  Select,
  Grid,
  Form,
  Image,
  Button,
  TextArea,
  Placeholder
} from "semantic-ui-react";

const ITEMS = [
  {
    key: 1,
    value: 1,
    text: "Pochette"
  },
  {
    key: 2,
    value: 2,
    text: "Pull en laine"
  },
  {
    key: 3,
    value: 3,
    text: "Sac"
  },
  {
    key: 4,
    value: 4,
    text: "Couverture"
  },
  {
    key: 5,
    value: 5,
    text: "Serviette"
  }
];

const stateInit = {
  name: "",
  price: "",
  shortdescr: "",
  longdescr: ""
};

const CategoriesSelect = ({categorySelecthandler}) => {

  console.log("CategoriesSelect render");

  const {error, data:categoriesData } = useQuery(GET_PAGES_LIST);

  let selectionOptions = [];
  if(categoriesData !== undefined) {
    console.log(categoriesData);
    selectionOptions = categoriesData.pages.map((category) => {
      return {key:category.id, value:category.id, text:category.label};
    });
  }

  return (
    <>
      <Divider horizontal>
        <Header as="h4">Selectionner la catégorie</Header>
      </Divider>
      <Grid>
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={14}>
            <Form.Select
              fluid
              placeholder="Sélectionner la catégorie"
              options={selectionOptions}
              onChange={categorySelecthandler}
            />
          </Grid.Column>
          <Grid.Column width={1} />
        </Grid.Row>
      </Grid>
    </>
  );
};

const CategoryInformationsInputs = ({formChangeHandler,formValues}) => {
  return (
    <>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="add" />
          Ajouter un article dans la catégorie
        </Header>
      </Divider>
      <Grid>
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={14}>
            <Form.Group>
              <Form.Field
                width={12}
              >
                <label>Nom de l'article</label>
                <input
                  placeholder="Nom de l'article"
                  name="name"
                  onChange={formChangeHandler}
                  value={formValues.name}
                />
              </Form.Field>
              <Form.Field>
                <label>Prix en euros</label>
                <input
                  placeholder="Prix en euros"
                  name="price"
                  onChange={formChangeHandler}
                  value={formValues.price}
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>Description courte</label>
              <input
                placeholder="Description courte"
                name="shortdescr"
                onChange={formChangeHandler}
                value={formValues.shortdescr}
              />
            </Form.Field>
            <Form.Field
              label="Description longue"
              placeholder="Description longue"
              control={TextArea}
              name="longdescr"
              onChange={formChangeHandler}
              value={formValues.longdescr}
            />
            <Form.Button
              content="Submit"
              width={16}
            >
              Créer l'article
            </Form.Button>
          </Grid.Column>
          <Grid.Column width={1} />
        </Grid.Row>
      </Grid>
    </>
  );
};


const ProductAddAdmin = () => {

  const [isCategorySelected, setCategorySelectInd] = useState(false);
  const [formValues, setFormValue] = useState(stateInit);
  console.log(formValues);

  const categorySelecthandler = useCallback((event, { value }) => {
    if (!(typeof value === "undefined")) setCategorySelectInd(true);
    else setCategorySelectInd(false);
  });

  const formChangeHandler = useCallback(e => {
    const { name, value } = e.target;
    setFormValue({ ...formValues, [name]: value });
  });

  const formSubmitHandler = () => {
    console.log(formValues);
  };

  return (
    <Segment>
      <Header>Administration des articles</Header>
      <br />
      <Form onSubmit={formSubmitHandler}>
        <CategoriesSelect categorySelecthandler={categorySelecthandler} />
        <br />
        <br />
        {isCategorySelected ? (
          <CategoryInformationsInputs formChangeHandler={formChangeHandler} formValues={formValues}/>
          )
          :
          null
        }
      </Form>
    </Segment>
  );
};

export default ProductAddAdmin;
