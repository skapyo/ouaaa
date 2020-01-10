import React, { useState, useEffect } from "react";
import {Button,Card,Grid,Segment,Header,Divider,Icon,Form,Checkbox} from "semantic-ui-react";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import update from "immutability-helper";

import { useQuery ,useMutation} from '@apollo/react-hooks';
import {GET_PAGES_LIST,MODIFY_PAGE_INFORMATIONS,ADD_NEW_PAGE} from '../../../../Queries/contentQueries';

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

const CategoryCard = ({ id, name, isActivated, moveCard, findCard,activatedSwitchHandler,deletedIconClickHandler }) => {

  const [isDeleted, setDeletedInd] = useState(false);

  const trashIconClickHander = (event) => {
    event.preventDefault();
    deletedIconClickHandler(id);
    setDeletedInd(!isDeleted);
  };

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
              <Grid.Column width={13}>
                <Header>{name}</Header>
              </Grid.Column>
              <Grid.Column width={2}>
                <Checkbox toggle onChange={() => activatedSwitchHandler(id)} defaultChecked={isActivated} />
              </Grid.Column>
              <Grid.Column width={1}>
                <Icon onClick={trashIconClickHander} color={isDeleted?'red':'grey'} size='large' name="trash alternate outline" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    </div>
  );
};

const CategoriesAdmin = ({initData,client,refetch}) => {

  const alert = useAlert()

  // Init cards content
  const [cards, setCards] = useState(initData);
  // refresh cards content if props change (from INIT component)
  useEffect(() => {
    setCards(initData);
  }, [initData])

  console.log(cards);

  const [newPageName, setNewPageNameValue] = useState();
  // Mutation to add a new page
  const [addNewPage,{data:newPageData, loading:newPageDataLoading, error:newPageError}] = useMutation(ADD_NEW_PAGE);

  const newPageInputChangeHandler = (e,{value}) => {
    setNewPageNameValue(value);
  };

  const addNewPageHandler = () => {
    const variables = {label:newPageName,description:''};
    addNewPage({variables:variables});
  };

  // refresh the category list if add category mutation is OK
  useEffect(() => {
    if(newPageData !== undefined) {
      alert.success("La nouvelle catégorie a bien été ajoutée!");
      refetch();
    } 
  },[newPageData]);

  // print error alert if error in new category creation 
  useEffect(() => {
    if(newPageError !== undefined) {
      // if the category name already exists
      if(newPageError.graphQLErrors[0] && newPageError.graphQLErrors[0].statusCode === '1001') 
        alert.error("La catégorie existe déjà, veuillez rééssayer avec un autre nom");
      else
        alert.error("Il y a eu une erreur à la création de la catégorie!");
    }
  },[newPageError]);

  // function to activate / desactivate a card in the state
  const updateActiveIndicator = (id) => {
    const { card, index } = findCard(id);
    setCards(
      update(cards,{
        $splice:[[index,1,{...card, activated:!card.activated}]]
      })
    );
  };
    
  // function to activate / desactivate the deleted indicator
  const updateDeletedIndicator = (id) => {
    const { card, index } = findCard(id);
    setCards(
      update(cards,{
        $splice:[[index,1,{...card, deleted:!card.deleted}]]
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
  const [saveChanges, {loading,data, error }] = useMutation(MODIFY_PAGE_INFORMATIONS);
  
  const saveButtonHandler = (event) => {
    event.preventDefault();
    const cardsValuesUpdated = cards.map((card, index) => {
      return {...card, position:index};
    });
    saveChanges({ variables:{pages:cardsValuesUpdated}})
  };
  
  useEffect(() => {
    if(data !== undefined) {
      alert.success("La modification de l'affichage des catégories a été sauvegardée !");
      refetch();
    } 
  },[data]);

  useEffect(() => {
    if(error !== undefined)
      alert.error("Il y eu une erreur lors de la modification de l'affichage des catégories.");  
  },[error]);
 
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
            activatedSwitchHandler={updateActiveIndicator}
            deletedIconClickHandler={updateDeletedIndicator}
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

export default withDndProvider(InitComponent);
