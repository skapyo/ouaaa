import React, { useState, useEffect, useCallback, useRef } from "react";
import {useDropArea} from 'react-use';
import {MODIFY_PRODUCT,ADD_NEW_PRODUCT} from '../../../../Queries/contentQueries';
import { useQuery ,useMutation} from '@apollo/react-hooks';
import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";
import gql from "graphql-tag";
import { useAlert } from 'react-alert'
import useDnDStateManager from '../../../../Hooks/useDnDStateManager';
import useImageReader from '../../../../Hooks/useImageReader';
import withDndProvider from './../../../../Hoc/withDnDProvider';
import CategoriesSelect from './../BaseComponent/CategoriesSelect';
import { useHistory } from 'react-router-dom';
import ImageCropper from './../BaseComponent/ImageCropper/ImageCropper';
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
  Card, Ref, MountNode, Modal
} from "semantic-ui-react";
import {getImageUrl} from './../../../../Utils/utils';


const optionsResistance = [
  { key: 'v', text: 'Vivace', value: 'VIVACE' }
]
const optionsType = [
  { key: 'rg', text: 'ROSIER GRIMPANT', value: 'ROSIER GRIMPANT' },
  { key: 'rp', text: 'ROSIER PAYSAGER A PORT ETALE', value: 'ROSIER PAYSAGER A PORT ETALE' },
  { key: 'vd', text: 'VEGETAUX DE HAIES', value: 'VEGETAUX DE HAIES' },
  { key: 'af', text: 'ARBUSTES A FLEURS ET A FEUILLAGE', value: 'ARBUSTES A FLEURS ET A FEUILLAGE' },
  { key: 'ac', text: 'ARBUSTES COUVRE SOL', value: 'ARBUSTES COUVRE SOL' },
  { key: 'co', text: 'CONIFERES', value: 'CONIFERES' },
  { key: 'ej', text: 'ERABLE DU JAPON', value: 'ERABLE DU JAPON' },
  { key: 'ao', text: 'ARBRE D\'ORNEMENT', value: 'ARBRE D\'ORNEMENT' },
  { key: 'af', text: 'ARBRE FRUITIER', value: 'ARBRE FRUITIER' },
  { key: 'pa', text: 'PALMIER', value: 'PALMIER' },
  { key: 'pg', text: 'plante grimpantes', value: 'plante grimpantes' },
  { key: 'to', text: 'TOPIAIRES', value: 'TOPIAIRES' }
]
const optionsFeuillage = [
  { key: 'p', text: 'PERSISTANT', value: 'PERSISTANT' },
  { key: 'c', text: 'CADUC', value: 'CADUC' }
]

const ItemTypes = {
  PIC: "pic"
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
              onChange={checkBoxChangeHandler}
              checked={formValues.nolimit?true:false}
              // value={formValues.nolimit}
            />

            <Form.Field width={6} disabled={formValues.nolimit?true:false}>
              <label>Nombre d'articles disponibles</label>
              <input
                placeholder="Nombre d'articles disponibles"
                name="nb_products"
                onChange={formChangeHandler}
                value={formValues.nb_products}
              />
            </Form.Field>
            
            <br />



            <Form.Checkbox
                name="fleurie"
                label='Fleurie's
                value={formValues.fleurie?true:false}

                // value={formValues.nolimit}
            />
            <Form.Field
                label="Résistancee"
                control={Select}
                placeholder="Vivace"
                name="resistance"
                options={optionsResistance}
                onChange={formChangeHandler}
                value={formValues.resistance}
            />
          <Form.Field>
            <label>Conditionnement</label>
            <input
                placeholder="Conditionnement"
                name="conditionnement"
                onChange={formChangeHandler}
                value={formValues.conditionnement}
            />
          </Form.Field>
            <Form.Field>
              <label>Couleur</label>
              <input
                  placeholder="Couleur"
                  name="couleur"
                  onChange={formChangeHandler}
                  value={formValues.couleur}
              />
            </Form.Field>

            <Form.Field
                label="Type"
                control={Select}
                placeholder="Type"
                name="type"
                options={optionsType}
                onChange={formChangeHandler}
                value={formValues.type}
            />
            <Form.Field>
              <label>Hauteur</label>
              <input
                  placeholder="Hauteur"
                  name="hauteur"
                  onChange={formChangeHandler}
                  value={formValues.hauteur}
              />
            </Form.Field>
              <Form.Field
                  label="Feuillage"
                  control={Select}
                  placeholder="Feuillage"
                  name="type"
                  options={optionsFeuillage}
                  onChange={formChangeHandler}
                  value={formValues.feuillage}
              />
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

const ImagesDisplay = ({cards,moveCard,findCard,updateActiveIndicator,updateDeletedIndicator,updateKeyIndicator}) => {
     
  const [, drop] = useDrop({ accept: ItemTypes.PIC });

  // console.log('cards');
  // console.log(cards);
  // console.log('--cards--');

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
              originalImg = {file.img}
              croppedImg = {file.croppedImg}
              moveCard={moveCard}
              findCard={findCard}  
              activatedSwitchHandler={updateActiveIndicator}
              deletedIconClickHandler={updateDeletedIndicator}
              updateKeyIndicator={updateKeyIndicator}
              deleted = {file.deleted}
              activated = {file.activated}
              file={file}
            />
          ))
        }
      </Card.Group>
    </Grid.Column>
    <Grid.Column width='1'></Grid.Column>
   </Grid>
  );
  
};

const ImagePrev = ({file,originalImg,croppedImg,moveCard,findCard,id,activatedSwitchHandler,deletedIconClickHandler,deleted,activated,updateKeyIndicator,croppedFile}) => {

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

  //gestion de la modal du cropper
  const [modalOpened, setOpenedInd] = useState(false);
  const openModal = () => {
    setOpenedInd(true);
  };


  return (
    <div className='card' ref={node => drag(drop(node))} style={{ opacity}} >
      <Card.Content style={{padding:'0'}}>
        <Image src={croppedImg.img}/>
      </Card.Content>
      <Card.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column width= {2}></Grid.Column>
            <Grid.Column width= {4}>
              <Icon fitted name='resize vertical' size='large' onClick={() => openModal()}/>
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
      <ImageCropper 
        updateKeyIndicator={updateKeyIndicator} 
        id={id}
        croppedImg = {file.croppedImg}
        src={originalImg} 
        open={modalOpened} 
        onClose={() => setOpenedInd(false) } 
      />
    </div>
  );

};


const ProductAdmin = ({initFormData, initImgData=[], categoryId=null,productId=null, mutationRequest}) => {

  const [categorySelected, setCategorySelectInd] = useState(categoryId);
  const [formValues, setFormValue] = useState(initFormData);

  const [setImagesList, loading, result,imagesListState] = useImageReader();

  const {
    objectsList,
    moveObject,
    findObject,
    updateActiveIndicator,
    updateDeletedIndicator,
    initState,
    addValues,
    updateKeyIndicator
  } = useDnDStateManager(initImgData);

  // console.log('objectsList:');
  // console.log(objectsList);
  // console.log('--objectsList--');

  const [
    addNewProduct,
    {data:newProductData, loading:newProductDataLoading, error:newProductError}
  ] = useMutation(mutationRequest);

  // console.log('newProductData');
  // console.log(newProductData);
  // console.log('--newProductData--');

  // alert hook
  const alert = useAlert()

  useEffect(() => {
    if(result)
      addValues(result);
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
    // console.log('formSubmitHandler');
    // console.log(formValues);
    // console.log(objectsList);
    // console.log('--formSubmitHandler--');


    let files = null;
    
      let variables = null;
      if(!categoryId) { // if it's an product creation mutation

        if(objectsList)
          files = objectsList.map((object) =>{
            console.log(object.croppedImg.file); 
            // return object.file
            return {
              originalPicture:object.file,
              croppedPicture:object.croppedImg.file,
              croppedX:object.croppedImg.crop.x,
              croppedY:object.croppedImg.crop.y,
              croppedZoom:object.croppedImg.zoom,
              croppedRotation:object.croppedImg.rotation
            }
          });

        variables = {
          label:formValues.name,
          short_description:formValues.shortdescr,
          description:formValues.longdescr,
          price:formValues.price,
          pageId:categorySelected,
          limitedQuantity:formValues.nolimit,
          quantity:formValues.nb_products,
          fleurie:formValues.fleurie,
          resistance:formValues.resistance,
          conditionnement:formValues.conditionnement,
          couleur:formValues.couleur,
          type:formValues.type,
          hauteur:formValues.hauteur,
          feuillage:formValues.feuillage,
          files:files
        };
      } else { // if it's a modify mutation

        if(objectsList)
          files = objectsList.map((object) => {

            console.log(object.newpic);

            return {
              id : object.serverId,
              newpic : object.newpic,
              activated : object.activated,
              deleted : object.deleted,
              file : {
                originalPicture:object.file,
                croppedPicture:object.croppedImg.file,
                croppedPictureModified : object.croppedImg.modified,
                croppedX:object.croppedImg.crop.x,
                croppedY:object.croppedImg.crop.y,
                croppedZoom:object.croppedImg.zoom,
                croppedRotation:object.croppedImg.rotation
              }
            };
          });

        variables = {
          label:formValues.name,
          short_description:formValues.shortdescr,
          description:formValues.longdescr,
          price:formValues.price,
          pageId:categorySelected,
          limitedQuantity:formValues.nolimit,
          quantity:formValues.nb_products,
          fleurie:formValues.fleurie,
          resistance:formValues.resistance,
          conditionnement:formValues.conditionnement,
          couleur:formValues.couleur,
          type:formValues.type,
          hauteur:formValues.hauteur,
          feuillage:formValues.feuillage,
          files:files
        }
      }
      if(categoryId) 
        variables={...variables, id:productId};
      addNewProduct({variables:variables});
  };

  const history = useHistory();

  useEffect(() => {
    if(newProductData && !(typeof newProductData === "undefined")) {
      if(!productId) {
        console.log(newProductData);
        history.push(`/admin/articles/modify/${newProductData.addProduct.id}`);
      }
      else {
        console.log(newProductData);
        history.push(`/admin/articles/modify/${productId}`);
      }

    }
    },[newProductData])

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
        <CategoriesSelect categorySelecthandler={categorySelecthandler} defaultValue={categorySelected} />
        <br />
        <br />

        {categorySelected ? (
          <CategoryInformations 
            checkBoxChangeHandler={checkBoxChangeHandler} 
            formChangeHandler={formChangeHandler} 
            formValues={formValues}
          />
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
            {/* {!loading && result && objectsList?  */}
            {!loading && objectsList? 
              < ImagesDisplay   
                cards = {objectsList}
                moveCard = {moveObject}
                findCard = {findObject}
                updateActiveIndicator = {updateActiveIndicator}
                updateDeletedIndicator = {updateDeletedIndicator}
                updateKeyIndicator = {updateKeyIndicator}
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

export default withDndProvider(ProductAdmin);
