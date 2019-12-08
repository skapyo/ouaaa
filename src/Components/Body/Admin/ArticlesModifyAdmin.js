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

const ArticlesModifyAdmin = () => {
  const [isCategorySelected, setCategorySelect] = useState(false);
  const categorySelecthandler = (event, { value }) => {
    if (!(typeof value === "undefined")) setCategorySelect(true);
    else setCategorySelect(false);
  };

  const [isArticleSelected, setArticleSelect] = useState(false);
  const articleSelecthandler = (event, { value }) => {
    if (!(typeof value === "undefined")) setArticleSelect(true);
    else setArticleSelect(false);
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
          <Header as="h4">Selectionner l'articler à modifier</Header>
        </Divider>

        <Grid>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={14}>
              <Form.Group>
                <Form.Select
                  width={8}
                  fluid
                  placeholder="Séléctionner la catégorie"
                  options={ITEMS}
                  onChange={categorySelecthandler}
                />
                <Form.Select
                  width={8}
                  fluid
                  placeholder="Séléctionner l'article"
                  options={ITEMS}
                  onChange={articleSelecthandler}
                  disabled={isCategorySelected ? false : true}
                />
              </Form.Group>
            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
        </Grid>

        <Divider horizontal>
          <Header as="h4">
            <Icon name="setting" />
            Modifier l'article séléctionné
          </Header>
        </Divider>

        <Grid>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={14}>
              <Form.Group>
                <Form.Field
                  width={12}
                  disabled={isArticleSelected ? false : true}
                >
                  <label>Nom de l'article</label>
                  <input
                    placeholder="Nom de l'article"
                    name="name"
                    onChange={formChangeHandler}
                    value={formValues.name}
                  />
                </Form.Field>
                <Form.Field disabled={isArticleSelected ? false : true}>
                  <label>Prix en euros</label>
                  <input
                    placeholder="Prix en euros"
                    name="price"
                    onChange={formChangeHandler}
                    value={formValues.price}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Field disabled={isArticleSelected ? false : true}>
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
                disabled={isArticleSelected ? false : true}
                placeholder="Description longue"
                control={TextArea}
                name="longdescr"
                onChange={formChangeHandler}
                value={formValues.longdescr}
              />
              <Form.Button
                content="Submit"
                width={16}
                disabled={isArticleSelected ? false : true}
              >
                Modifier l'article
              </Form.Button>
            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
        </Grid>
      </Form>
    </Segment>
  );
};

export default ArticlesModifyAdmin;
