import React, { useState } from "react";
import {
  Card,
  Grid,
  Segment,
  Header,
  Divider,
  Icon,
  Form,
  Checkbox
} from "semantic-ui-react";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import update from "immutability-helper";

const cardGroupStyle = {
  margin: "10px 0px 0px 0px"
};
const cardStyle = {
  margin: "4px 0px"
};

const ItemTypes = {
  CARD: "card"
};

const ITEMS = [
  {
    id: 1,
    text: "Pochette"
  },
  {
    id: 2,
    text: "Pull en laine"
  },
  {
    id: 3,
    text: "Sac"
  },
  {
    id: 4,
    text: "Couverture"
  },
  {
    id: 5,
    text: "Serviette"
  }
];

const CategoryCard = ({ id, name, isActivated, moveCard, findCard }) => {
  // const [activated, setActivatedIndicator] = useState(isActivated);

  // const [hovered, setHoverIndicator] = useState(false);
  // const onHoverHandler = () => {
  //   setHoverIndicator(!hovered);
  // };

  const originalIndex = findCard(id).index;

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, originalIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findCard(id);
        moveCard(draggedId, overIndex);
      }
    }
  });

  const opacity = isDragging ? 0 : 1;

  return (
    <div ref={node => drag(drop(node))} style={{ opacity, width: "100%" }}>
      <Card fluid style={cardStyle}>
        <Card.Content>
          <Grid>
            <Grid.Row>
              <Grid.Column width={14}>
                <Header>{name}</Header>
              </Grid.Column>
              <Grid.Column width={2}>
                <Checkbox toggle defaultChecked={isActivated} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    </div>
  );
};

const CategoriesAdmin = () => {
  const [cards, setCards] = useState(ITEMS);

  const moveCard = (id, atIndex) => {
    const { card, index } = findCard(id);
    setCards(
      update(cards, {
        $splice: [[index, 1], [atIndex, 0, card]]
      })
    );
  };

  const findCard = id => {
    const card = cards.filter(c => `${c.id}` === id)[0];
    return {
      card,
      index: cards.indexOf(card)
    };
  };

  const [, drop] = useDrop({ accept: ItemTypes.CARD });

  return (
    <Segment>
      <Header>Administration des catégories</Header>

      <br />

      <Divider horizontal>
        <Header as="h4">
          <Icon name="add" />
          Ajouter une nouvelle catégorie
        </Header>
      </Divider>

      <Form>
        <Form.Group widths="equal">
          <Form.Input fluid placeholder="Nom de la nouvelle catégorie" />
          <Form.Button fluid>Ajouter</Form.Button>
        </Form.Group>
      </Form>

      <br />

      <Divider horizontal>
        <Header as="h4">
          <Icon name="ordered list" />
          Configurer l'affichage des catégories dans le menu
        </Header>
      </Divider>

      <br />

      <Card.Group ref={drop} style={{ cardGroupStyle, width: "100%" }}>
        {cards.map(card => (
          <CategoryCard
            name={card.text}
            key={card.id}
            id={`${card.id}`}
            text={card.text}
            moveCard={moveCard}
            findCard={findCard}
            isActivated={true}
          />
        ))}
      </Card.Group>
    </Segment>
  );
};

const withDndProvider = Component => () => {
  return (
    <DndProvider backend={Backend}>
      <Component />
    </DndProvider>
  );
};

export default withDndProvider(CategoriesAdmin);
