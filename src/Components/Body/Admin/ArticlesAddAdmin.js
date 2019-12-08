import React, { useState } from "react";
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
  TextArea
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

const ArticlesAddAdmin = () => {
  const [isCategorySelected, setCategorySelect] = useState(false);
  const categorySelecthandler = (event, { value }) => {
    if (!(typeof value === "undefined")) setCategorySelect(true);
    else setCategorySelect(false);
  };

  const [formValues, setFormValue] = useState(stateInit);

  console.log(formValues);

  const formChangeHandler = e => {
    const { name, value } = e.target;
    setFormValue({ ...formValues, [name]: value });
  };

  const formSubmitHandler = () => {
    console.log(formValues);
  };

  return (
    <Segment>
      <Header>Administration des articles</Header>

      <br />
      <Form onSubmit={formSubmitHandler}>
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
                options={ITEMS}
                onChange={categorySelecthandler}
              />
            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
        </Grid>

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
                  disabled={isCategorySelected ? false : true}
                >
                  <label>Nom de l'article</label>
                  <input
                    placeholder="Nom de l'article"
                    name="name"
                    onChange={formChangeHandler}
                    value={formValues.name}
                  />
                </Form.Field>
                <Form.Field disabled={isCategorySelected ? false : true}>
                  <label>Prix en euros</label>
                  <input
                    placeholder="Prix en euros"
                    name="price"
                    onChange={formChangeHandler}
                    value={formValues.price}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Field disabled={isCategorySelected ? false : true}>
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
                disabled={isCategorySelected ? false : true}
                placeholder="Description longue"
                control={TextArea}
                name="longdescr"
                onChange={formChangeHandler}
                value={formValues.longdescr}
              />
              <Form.Button
                content="Submit"
                width={16}
                disabled={isCategorySelected ? false : true}
              >
                Créer l'article
              </Form.Button>
            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
        </Grid>
      </Form>
    </Segment>
  );
};

export default ArticlesAddAdmin;
