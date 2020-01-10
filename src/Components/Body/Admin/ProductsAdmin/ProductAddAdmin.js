import React, { useState, useEffect, useCallback, useRef } from "react";
import {useDropArea} from 'react-use';

import {GET_PAGES_LIST,ADD_NEW_PRODUCT} from '../../../../Queries/contentQueries';

import { useQuery ,useMutation} from '@apollo/react-hooks';

import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import update from "immutability-helper";
import gql from "graphql-tag";
import { useAlert } from 'react-alert'

import useDnDStateManager from './../../../../Hooks/useDnDStateManager';
import useImageReader from './../../../../Hooks/useImageReader';

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
  Card, Ref, MountNode
} from "semantic-ui-react";

const ItemTypes = {
  PIC: "pic"
};


const stateInit = {
  name: "",
  price: null,
  shortdescr: "",
  longdescr: "",
  nolimit:true,
  nb_products:null
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

const CategoryInformations = ({formChangeHandler,formValues,checkBoxChangeHandler}) => {
  return (
    <>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="info" />
          Les informations de l'article
        </Header>
      </Divider>
      <CategoryInformationsInputs checkBoxChangeHandler={checkBoxChangeHandler} formChangeHandler={formChangeHandler} formValues={formValues}/>
    </>
  );
};


const CategoryInformationsInputs = ({formChangeHandler,formValues,checkBoxChangeHandler}) => {
  
  const [isChecked, setIsChecked] = useState(true);

  const checkBoxChangeStateHandler = (e, value) => {
    setIsChecked(value.checked);
    checkBoxChangeHandler(e,value);
  };
  
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={1} />
        <Grid.Column width={14}>
          <Form.Group>
            <Form.Field width={12}>
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
          <br/>

          <Form.Checkbox 
            label='Article en quantité illimitée' 
            onChange={checkBoxChangeStateHandler}
            checked={isChecked?true:false}
            // value={formValues.nolimit}
          />

          <Form.Field width={6} disabled={isChecked?true:false}>
            <label>Nombre d'articles disponibles</label>
            <input
              placeholder="Nombre d'articles disponibles"
              name="nb_products"
              onChange={formChangeHandler}
              value={formValues.nb_products}
            />
          </Form.Field>
          
          <br />

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
        </Grid.Column>
        <Grid.Column width={1} />
      </Grid.Row>
    </Grid>
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

const ImagesDisplay = ({cards,moveCard,findCard,updateActiveIndicator,updateDeletedIndicator}) => {
  
  // const [cards,moveCard,findCard,updateActiveIndicator,updateDeletedIndicator] = useDnDStateManager(files);
 
  const [, drop] = useDrop({ accept: ItemTypes.PIC });

  return (
   <Grid>
    <Grid.Column width='1'></Grid.Column>
    <Grid.Column width='14'>
      <Card.Group ref={drop} itemsPerRow={3}>
        {
          cards.map((file) => (
            <ImagePrev 
              id={file.id}
              key={`image${file.id}`}
              src={file.img}
              moveCard={moveCard}
              findCard={findCard}  
              activatedSwitchHandler={updateActiveIndicator}
              deletedIconClickHandler={updateDeletedIndicator}
              deleted = {file.deleted}
              activated = {file.activated}
            />
          ))
        }
      </Card.Group>
    </Grid.Column>
    <Grid.Column width='1'></Grid.Column>
   </Grid>
  );
  
};

const ImagePrev = ({src,moveCard,findCard,id,activatedSwitchHandler,deletedIconClickHandler,deleted,activated}) => {

  // console.log("ImagePrev render");

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
    <div className='card' ref={node => drag(drop(node))} style={{ opacity}} >
      <Card.Content style={{padding:'0'}}>
        <Image src={src}/>
      </Card.Content>
      <Card.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column width= {2}></Grid.Column>
            <Grid.Column width= {4}>
              <Icon fitted name='resize vertical' size='large' onClick={() => null}/>
            </Grid.Column>
            <Grid.Column width= {4}>
              <Icon color={activated? 'green' : 'red' } fitted name='pin' size='large' onClick={() => activatedSwitchHandler(id)}/>
            </Grid.Column>
            <Grid.Column width= {4}>
              <Icon color={deleted? 'red' : 'black' } fitted name='trash' size='large' onClick={() => deletedIconClickHandler(id)}/>
            </Grid.Column>
            <Grid.Column width= {2}></Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </div>
  );

};


const ProductAddAdmin = () => {

  const [categorySelected, setCategorySelectInd] = useState(false);
  const [formValues, setFormValue] = useState(stateInit);

  console.log(formValues);

  const [setImagesList, loading, result,imagesListState] = useImageReader();

  const {
    objectsList,
    moveObject,
    findObject,
    updateActiveIndicator,
    updateDeletedIndicator,
    initState
  } = useDnDStateManager();

  const [addNewProduct,{data:newProductData, loading:newProductDataLoading, error:newProductError}] = useMutation(ADD_NEW_PRODUCT);

  // alert hook
  const alert = useAlert()

  useEffect(() => {
    if(result)
      initState(result);
  },result)

  // actions handlers
  const categorySelecthandler = useCallback((event, {value}) => {
    if (!(typeof value === "undefined")) setCategorySelectInd(value);
    else setCategorySelectInd(false);
  });

  const formChangeHandler = useCallback(e => {
    const { name, value } = e.target;
    setFormValue({ ...formValues, [name]: value });
  });

  const checkBoxChangeHandler = (e,value) => {
    setFormValue({ ...formValues, nolimit: value.checked });
  };


  const formSubmitHandler = () => {
    console.log(formValues);
    console.log(objectsList);
    let files = null;
    if(objectsList)
      files = objectsList.map((object) =>{console.log(object.file); return object.file})
    const variables = {
      label:formValues.name,
      short_description:formValues.shortdescr,
      description:formValues.longdescr,
      price:formValues.price,
      pageId:categorySelected,
      limitedQuantity:formValues.nolimit,
      quantity:formValues.nb_products,
      files:files
    };
    addNewProduct({variables:variables});

  };

  const onDropHandler = useCallback((files) => {
    setImagesList(files);
  });

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

        {categorySelected ? (
          <CategoryInformations checkBoxChangeHandler={checkBoxChangeHandler} formChangeHandler={formChangeHandler} formValues={formValues}/>
          )
          :
          null
        }
        <br />

        {categorySelected ? (
          <>
            <Divider horizontal>
              <Header as="h4">
                <Icon name="image" />
                Les images de l'article
              </Header>
            </Divider>
            <br />
            {!loading && result && objectsList? 
              < ImagesDisplay   
                cards = {objectsList}
                moveCard = {moveObject}
                findCard = {findObject}
                updateActiveIndicator = {updateActiveIndicator}
                updateDeletedIndicator = {updateDeletedIndicator}
              /> : null }
            < ImagesDropZone onDropHandler={onDropHandler} />
          </>
          )
          :
          null
        }

        <br />
        {categorySelected ? (
          <Button fluid loading={false} content='Submit'>Sauvegarder</Button>
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
