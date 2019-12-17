import React, { useState, useEffect, useCallback } from "react";
import {useDropArea} from 'react-use';

import {GET_PAGES_LIST,MODIFY_PAGE_INFORMATIONS,ADD_NEW_PAGE} from '../../../../Queries/contentQueries';

import { useQuery ,useMutation} from '@apollo/react-hooks';

import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import update from "immutability-helper";

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
  Placeholder,
  Card
} from "semantic-ui-react";

const ItemTypes = {
  PIC: "pic"
};


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
  );
};

const CategoryInformations = ({formChangeHandler,formValues}) => {
  return (
    <>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="add" />
          Ajouter un article dans la catégorie
        </Header>
      </Divider>
      <CategoryInformationsInputs formChangeHandler={formChangeHandler} formValues={formValues}/>
    </>
  );
};


const CategoryInformationsInputs = ({formChangeHandler,formValues}) => {
  return (
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
          {/* <Form.Button
            content="Submit"
            width={16}
          >
            Créer l'article
          </Form.Button> */}
        </Grid.Column>
        <Grid.Column width={1} />
      </Grid.Row>
    </Grid>
  );
};

const useImageReader = () => {

  const [imagesListState, setImagesListState] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  const [resultState, setResultState] = useState(null);

  const setImagesList = (images) => {
    setLoadingState(true);
    setImagesListState(images);
  }

  useEffect(() => {
    if(imagesListState) {
      const result = imagesListState.map((img, index) => {
        return {id:index, img:URL.createObjectURL(img)};
      })
      setResultState(result);
      setLoadingState(false);
    }
  },[imagesListState]);
  
  return [setImagesList, loadingState, resultState];

};

const ImageAdminLayout = () => {

  const [setImagesList, loading, result] = useImageReader();

  const onDropHandler = useCallback((files) => {
    setImagesList(files);
  });

  return (
    <>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="image" />
          Ajouter des images
        </Header>
      </Divider>
      {!loading && result ? < ImagesDisplay files={result} /> : null }
      < ImagesDropZone onDropHandler={onDropHandler} />
    </>
  );
};


const ImagesDropZone = ({onDropHandler}) => {
  
  const [bond, state] = useDropArea({
    onFiles: files => onDropHandler(files)
  });

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width='1'></Grid.Column>
        <Grid.Column width='14'>
          <Segment size='small' placeholder style={{minHeight:'10rem'}} {...bond}>
            <h1 align="center">
              <Icon name='file image outline' size='big' style={{height:'0.5em'}}/>
            </h1>
            <h1 align="center">
              Déposer les images ici...
            </h1>
          </Segment>
        </Grid.Column>
        <Grid.Column width='1'></Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const ImagesDisplay = ({files}) => {

  // console.log("files:");
  // console.log(files);
  // console.log("--files--");
  
  // Init cards content
  const [cards, setCards] = useState(files);
  // refresh cards content if props change (from INIT component)
  useEffect(() => {
    setCards(files);
  }, [files])

  console.log("cards:");
  console.log(cards);
  console.log("--cards--");

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
    // console.log('find card');
    // console.log(id);
    const card = cards.filter(c => `${c.id}` === id)[0];
    // console.log(card);
    // console.log('--find card--');
    return {
      card,
      index: cards.indexOf(card)
    };
  };

  const [, drop] = useDrop({ accept: ItemTypes.PIC });

  return (
   <Grid>
    <Grid.Column width='1'></Grid.Column>
    <Grid.Column width='14'>
      <Image.Group ref={drop} size='small'>
        {
          cards.map((file) => (
            <ImagePrev 
              id={`${file.id}`}
              key={`image${file.id}`}
              src={file.img}
              moveCard={moveCard}
              findCard={findCard}  
            />
          ))
        }
      </Image.Group>
    </Grid.Column>
    <Grid.Column width='1'></Grid.Column>
   </Grid>
  );
  
};

const ImagePrev = ({src,moveCard,findCard,id}) => {

  const originalIndex = findCard(id).index;

  console.log(originalIndex);

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.PIC, id, originalIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: ItemTypes.PIC,
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
    // <div >
      <img ref={node => drag(drop(node))} style={{ opacity}} src={src} style={{maxWidth: '150px'}}/>
    // </div>
    
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
        <Divider horizontal>
          <Header as="h4">Selectionner la catégorie</Header>
        </Divider>
        <CategoriesSelect categorySelecthandler={categorySelecthandler} />
        <br />
        <br />

        {isCategorySelected ? (
          <CategoryInformations formChangeHandler={formChangeHandler} formValues={formValues}/>
          )
          :
          null
        }
        <br />
        {isCategorySelected ? (
          <ImageAdminLayout/>
          )
          :
          null
        }
      </Form>
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

export default withDndProvider(ProductAddAdmin);
