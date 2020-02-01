import React,{ useState, useEffect } from "react";
import ShopCard from "./ShopCard";
import { Card,Header, Divider } from "semantic-ui-react";
import {useQuery} from '@apollo/react-hooks';
import {GET_PRODUCTS_BY_CATEGORY} from './../../../../Queries/contentQueries';
import {useParams} from "react-router-dom";
import Loader from './../../../Loader/Loader';
import useLoaderState from './../../../../Hooks/useLoaderState';
import useWindowSize from './../../../../Hooks/useWindowSize';


const ShopCardGroup = React.memo( ({itemsPerRow}) => {

  const {categoryId} = useParams();

  const {data, loading, error} = useQuery(GET_PRODUCTS_BY_CATEGORY,{variables:{id:categoryId}});

  const {height} = useWindowSize();
  const midHeight = (height - 230 - 230 - 10) / 2;
  const midHeightString = `${midHeight}px 0 0 0`;

  const [loadingGlobalState, { addListener, changeListenerValue }] = useLoaderState();
  
  const [dataToRender, setdataToRender] = useState();

  useEffect(() =>{  
    if(!loading && data) {
      setdataToRender( data.page.products.map((product, index) => {
        const img = new Image();
        addListener(index);
        img.onload = () => changeListenerValue(index,false);
        img.src = product.pictures[0].croppedPicturePath;
        return {...product,img:img }
      }))
    }
  },[loading]);
    
  if (loadingGlobalState)
    return <Loader midHeightString={midHeightString} />;

  if (error) 
    return 'error';

  return (
    <>
      <Header as='h1'>{data.page.label}</Header>
      <Divider/>
      <br />
      <Card.Group itemsPerRow={itemsPerRow}>
        {dataToRender.map((product) => (
          <ShopCard 
            imageURL={product.img.src} 
            id={product.id}
            isLiked 
          />
        ))}
      </Card.Group>
    </>
  );
});

ShopCardGroup.whyDidYouRender = true;

export default ShopCardGroup;
