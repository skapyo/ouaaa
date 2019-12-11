import React, { useState, useEffect } from "react";
import {Button,Card,Grid,Segment,Header,Divider,Icon,Form,Checkbox} from "semantic-ui-react";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import update from "immutability-helper";

import { withApollo } from '@apollo/react-hoc';
import { useQuery ,useMutation} from '@apollo/react-hooks';
import {GET_PAGES_LIST,MODIFY_PAGE_INFORMATIONS,ADD_NEW_PAGE} from './../../../Queries/contentQueries';

import { useAlert } from 'react-alert'

const cardGroupStyle = {
  margin: "10px 0px 0px 0px"
};
const cardStyle = {
  margin: "4px 0px"
};

const ItemTypes = {
  CARD: "card"
};

const CategoryCard = ({ id, name, isActivated, moveCard, findCard, client,activatedSwitchHandler }) => {

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
                <Checkbox toggle onChange={() => activatedSwitchHandler(id)} defaultChecked={isActivated} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    </div>
  );
};

const CategoriesAdmin = ({initData,client,refetch}) => {

  // alert hook
  // const alert = useAlert()

  // Init cards content
  const [cards, setCards] = useState(initData);
  // refresh cards content if props change (from INIT component)
  useEffect(() => {
    setCards(initData);
  }, [initData])

  const [newPageName, setNewPageNameValue] = useState();
  // Mutation to add a new page
  const [addNewPage,{data:newPageData, loading:newPageDataLoading, error:newPageError}] = useMutation(ADD_NEW_PAGE);

  if(newPageError) {
    //console.log(newPageError);
    // alert.show(newPageError.message);
  }

  const newPageInputChangeHandler = (e,{value}) => {
    setNewPageNameValue(value);
  };

  const addNewPageHandler = () => {

    const execute = async (variables) => {
      const result = await addNewPage({variables:variables});
      return result;
    };

    const variables = {label:newPageName,description:''};
    execute(variables);
    setNextPageMutationNB(addNewPageMutationNB+1);
  };

  const [addNewPageMutationNB, setNextPageMutationNB] = useState(0);
    
  useEffect(() => {
    if(addNewPageMutationNB!==0) {
      refetch();
    }
  },[addNewPageMutationNB]);

  // function to activate / desactivate a card in the state
  const updateActiveIndicator = (id) => {
    const { card, index } = findCard(id);
    setCards(
      update(cards,{
        $splice:[[index,1,{...card, activated:!card.activated}]]
      })
    );
  };

  // function to move a card to another position in the state
  const moveCard = (id, atIndex) => {

    console.log(`move card from ${id} to ${atIndex}`)

    const { card, index } = findCard(id);
    setCards(
      update(cards, {
        $splice: [[index, 1], [atIndex, 0, card]]
      })
    );
  };

  // function to find the card in the state
  const findCard = id => {
    const card = cards.filter(c => `${c.id}` === id)[0];
    return {
      card,
      index: cards.indexOf(card)
    };
  };

  const [, drop] = useDrop({ accept: ItemTypes.CARD });

  /* save data after clicking the save button */
 
  // Save modifications 
  const [saveChanges, {loading }] = useMutation(MODIFY_PAGE_INFORMATIONS);
  
  const saveButtonHandler = (event) => {

    const execute = async (variables) => {
        const result = await saveChanges({ variables:{pages:variables}});
        return result;
    };

    event.preventDefault();
    const cardsValuesUpdated = cards.map((card, index) => {
      return {...card, position:index};
    });

    execute(cardsValuesUpdated);

    setNextQueryNumber(queryNumber+1);
  };

    // Refresh if modifications saved before => don't refresh at first rendering
    const [queryNumber, setNextQueryNumber] = useState(0);
    
    useEffect(() => {
      if(queryNumber!==0) {
        refetch();
      }

    },[queryNumber]);

  /* //// ---- //// */


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

      <Form onSubmit={addNewPageHandler}>
        <Form.Group widths="equal">
          <Form.Input name = 'newPage' onChange={newPageInputChangeHandler} fluid placeholder="Nom de la nouvelle catégorie" />
          <Form.Button fluid loading={newPageDataLoading} content='Submit'>Ajouter</Form.Button>
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
            activatedSwitchHandler={updateActiveIndicator}
          />
        ))}
      </Card.Group>

      <br />

      <Grid>
        <Grid.Row>
          <Grid.Column width={4}></Grid.Column>
          <Grid.Column width={8}>
            <Button fluid loading={loading} onClick={(e) => saveButtonHandler(e)}>Sauvegarder</Button>
          </Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid.Row>
      </Grid>

    </Segment>
  );
};

const InitComponent = (props) => {

  const { loading, error, data, refetch } = useQuery(GET_PAGES_LIST,{ fetchPolicy: "network-only" });

  if (loading) return null;
  if (error) return null;

  let dataWithoutTypename = null; 
  if(data) {
    const omitTypename = (key, value) => (key === '__typename' ? undefined : value)
    dataWithoutTypename = JSON.parse(JSON.stringify(data.pages), omitTypename)
  }

  return(
    <CategoriesAdmin {...props} initData={dataWithoutTypename} refetch={refetch}/>
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
