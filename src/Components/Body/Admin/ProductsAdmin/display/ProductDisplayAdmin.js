import React,{useState,useEffect,useCallback,useMemo} from 'react';
import {useLazyQuery,useMutation} from '@apollo/react-hooks';
import { Card,Header, Icon, Label ,Divider, Segment,Button, Checkbox} from "semantic-ui-react";
import {GET_PRODUCTS_BY_CATEGORY_ADMIN,MODIFY_PRODUCTS_DISPLAY} from '../../../../../Queries/contentQueries';
import AdminCard from './Card';
import {useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import CategoriesSelect from '../../BaseComponent/CategoriesSelect';
import useDnDStateManager from '../../../../../Hooks/useDnDStateManager';
import {omitTypename} from '../../../../../Utils/utils';


const ItemTypes = {
  CARD: "card"
};

const ProductDisplayAdmin = () => {

    // State
    const {objectsList,initState,moveObject,findObject,updateKeyIndicator,idExists,isModified} = useDnDStateManager();
    const [categorySelected, setCategorySelectInd] = useState(null);
    const [displayDeleted, setDisplayDeletedInd] = useState(true);

    // drop init
    const [, drop] = useDrop({ accept: ItemTypes.CARD });

    // Graphql queries / mutations
    const [fetch,{data, loading, error,refetch}] = useLazyQuery(
      GET_PRODUCTS_BY_CATEGORY_ADMIN,
      {fetchPolicy:"no-cache"}
    );
    const [saveNewDisplay,{data:newData, loading:newDataLoading, error:newDataError}] = useMutation(MODIFY_PRODUCTS_DISPLAY);
 
    /* effects */
    useEffect(() => {
      if(data) {
        initState(omitTypename(data.productsAdminQuery));
      }
    },[data,initState]);

    useEffect(() => {
      if(categorySelected) {
        fetch(
          {variables:{
            categoryId:categorySelected
          }
        });
      };
    },[categorySelected,fetch]);

    useEffect(() => {
      if(newData) {
        initState(omitTypename(newData.modifyProductsDisplayMutation));
      }
    },[newData,initState]);

    // actions handlers
    const categorySelecthandler = useCallback((event, {value}) => {
      if (!(typeof value === "undefined")) setCategorySelectInd(value);
      else setCategorySelectInd(false);
    },[setCategorySelectInd]);

    const deletedDisplayButtonHandler = useCallback(() => {
      setDisplayDeletedInd(!displayDeleted);
    },[setDisplayDeletedInd,displayDeleted]);

    const saveButtonClickHandler = useCallback(() => {
      const productsDisplay = objectsList.map((card,index) => {
        return {id:card.id, position:index,activated:card.activated,deleted:card.deleted};
      });
      saveNewDisplay(
        {variables:{
          categoryId:categorySelected,
          productsDisplay:productsDisplay
        }
      });
    },[categorySelected,objectsList,saveNewDisplay]);

    const filterFunction = (o) => {
      return !displayDeleted ? (o.deleted != true) : true;
    };

    const hasDeletedProduct = useMemo(() => {
      return idExists('deleted');
    },[idExists]);


  if (error) 
    return 'error';

  return (
      
      <Segment>
        <Header>Administration des articles</Header>
        <br />
        <Divider horizontal>
          <Header as="h4">Selectionner la catégorie</Header>
        </Divider>
        <CategoriesSelect categorySelecthandler={categorySelecthandler}/>
        <br />
        <Divider horizontal>
          <Header as="h4">Les articles de la catégorie</Header>
        </Divider>
        <br />
        {(objectsList && categorySelected) ? (
          <>
            <Button 
              circular 
              icon = 'add' 
              content='ajouter un article'
            />
            <Button 
              circular 
              icon='save' 
              content='sauvegarder' 
              disabled={!isModified}
              loading={newDataLoading}
              onClick={saveButtonClickHandler}
            />
            <Button 
              circular 
              icon={displayDeleted ? "eye slash" : "eye"}
              disabled={!hasDeletedProduct}
              content={displayDeleted ? "Masquer les articles supprimés" : "Afficher les articles supprimés"}
              onClick = {deletedDisplayButtonHandler}  
            />
            <br />
            <br />
            <br />
            <Card.Group ref={drop} itemsPerRow={3}>
              {objectsList.filter(o => filterFunction(o)).map((product) => (
                <AdminCard 
                  product = {product}
                  moveCard={moveObject}
                  findCard={findObject}
                  updateKeyIndicator={updateKeyIndicator}
                  key={product.id}
                  id={`${product.id}`}
                />
              ))}
            </Card.Group>
          </>
        ) : 'Veuillez séléctionner une catégorie à afficher.'}
        {(objectsList.length == 0 && categorySelected) && "Il n'y aucun article dans la catégorie séléctionnée."}
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

export default withDndProvider(ProductDisplayAdmin);
