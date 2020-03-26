import React,{ useState, useEffect } from "react";
import ShopCard from "./ShopCard";
import { Card,Header, Divider } from "semantic-ui-react";
import {useQuery} from '@apollo/react-hooks';
import {GET_PRODUCTS_BY_CATEGORY} from './../../../../Queries/contentQueries';
import {Link, useParams} from "react-router-dom";
import Loader from './../../../Loader/Loader';
import useLoaderState from './../../../../Hooks/useLoaderState';
import useWindowSize from './../../../../Hooks/useWindowSize';
import {getImageUrl} from './../../../../Utils/utils';


const headerStyle = {
  "font-family": "Ubuntu', sans-serif",
  "font-size": "30px",
  // 'font-style': 'normal',
  "font-weight": "lighter",
  color: "#009C95"
};

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
      console.log(data);
      setdataToRender( data.page.products.map((product, index) => {
        console.log(product);
        const img = new Image();
        addListener(index);
        img.onload = () => changeListenerValue(index,false);
        console.log(product.pictures);
        if(product.pictures.length!=0) {
          img.src = getImageUrl(product.pictures[0].croppedPicturePath);
        }
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

      <Header as='h1' style={headerStyle}>{data.page.label}</Header>
      <br />
      <br />
      <Card.Group itemsPerRow={itemsPerRow}>
        {dataToRender.map((product) => (
          <ShopCard 
            product = {product}
          />
        ))}
      </Card.Group>
    </>
  );
});

ShopCardGroup.whyDidYouRender = true;

export default ShopCardGroup;
