import React, { useState, useEffect } from "react";
import {Button,Card,Grid,Segment,Header,Divider,Icon,Form,Checkbox} from "semantic-ui-react";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import update from "immutability-helper";

import { withApollo } from '@apollo/react-hoc';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {GET_PAGES_LIST,MODIFY_PAGE_POSITION} from './../../../Queries/contentQueries';

const cardGroupStyle = {
  margin: "10px 0px 0px 0px"
};
const cardStyle = {
  margin: "4px 0px"
};

const ItemTypes = {
  CARD: "card"
};

const CategoryCard = ({ id, name, isActivated, moveCard, findCard, client }) => {

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

const CategoriesAdmin = ({initData,client}) => {


  const [cards, setCards] = useState(initData);

  console.log(cards);


  const moveCard = (id, atIndex) => {

    console.log(`move card from ${id} to ${atIndex}`)

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

  /* save data after clicking the save button */

  const [saveLoading, setSaveLoading] = useState(false);
  const [queryNumber, setNextQueryNumber] = useState(0);

  useEffect(() => {
      const fetch = async () => { 
        setSaveLoading(true);
        const resultPromises = cards.map((card, position) => {
          const variables = {id:card.id, position:position};
          const resultPromise = client.mutate({mutation:MODIFY_PAGE_POSITION,variables});
          return resultPromise;
        });
        await Promise.all(resultPromises);
        setSaveLoading(false);
      }

      if(queryNumber != 0) {
        fetch();
      }

    }, [queryNumber]);
    
  /* --- */

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
            name={card.label}
            key={card.id}
            id={`${card.id}`}
            text={card.label}
            moveCard={moveCard}
            findCard={findCard}
            isActivated={card.activated}
            client={client}
          />
        ))}
      </Card.Group>

      <br />

      <Grid>
        <Grid.Row>
          <Grid.Column width={4}></Grid.Column>
          <Grid.Column width={8}>
            <Button fluid loading={saveLoading} onClick={() => setNextQueryNumber(queryNumber+1)}>Sauvegarder</Button>
          </Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid.Row>
      </Grid>

    </Segment>
  );
};

const InitComponent = (props) => {

  const { loading, error, data } = useQuery(GET_PAGES_LIST,{ fetchPolicy: "network-only" });

  if (loading) return null;
  if (error) return null;

  return(
    <CategoriesAdmin {...props} initData={data.pages}/>
  );
}



const withDndProvider = Component => () => {
 
  return (
    <DndProvider backend={Backend}>
      <Component />
    </DndProvider>
  );
};

export default withDndProvider(withApollo(InitComponent));
