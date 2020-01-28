import React,{ useState, useEffect } from "react";
import ShopCard from "./ShopCard";
import { Card,Header, Divider,Breadcrumb } from "semantic-ui-react";
import update from "immutability-helper";
import {useQuery} from '@apollo/react-hooks';
import {GET_PRODUCTS_BY_CATEGORY} from './../../../../Queries/contentQueries';
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom";

import { ScaleLoader } from "halogenium";

import ReactLoading from 'react-loading';

const Loader = ({ midHeightString }) => {
  return (
    <div
      style={{ width: "100%", "text-align": "center", margin: midHeightString }}
    >
      <div style={{ display: "inline-block" }}>
        <ScaleLoader color="#10A29B" size="20px" margin="2px" />
      </div>
    </div>
  );
};


const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  //   console.log(width);
  //   console.log("true height");
  //   console.log(height);
  return {
    width,
    height
  };
};

// function to find the card in the state
const findListener = (list, key) => {
  const object = list.filter(c => c.key === key)[0];
  return {
    object,
    index: list.indexOf(object)
  };
};

const useLoaderState = (init = true) => {
  const [loading, setLoadingInd] = useState(init);

  const [listenersList, setListenersList] = useState([]);

  console.log(listenersList);

  // function to add values in state
  // value = {key,value}
  const addListener = listener => {
    setListenersList((prevState, props) => {
      return update(prevState, {
        $push: [{ key: listener, value: true }]
      });
    });
  };

  const changeListenerValue = (key, value) => {
    console.log(`changeListenerValue: ${key}, ${value}`)
    setListenersList((prevState, props) => {
      const { index } = findListener(prevState, key);
      console.log(index);
      return update(prevState, {
        $splice: [[index, 1, { key: key, value: value }]]
      });
    });
  };

  useEffect(() => {
    if (
      listenersList &&
      listenersList.filter(listener => listener.value === true).length > 0
    ) {
      setLoadingInd(true);
    } else if (listenersList && listenersList.length !== 0) {
      setLoadingInd(false);
    }
  }, [listenersList]);

  return [loading, { addListener, changeListenerValue }];
};

const ShopCardGroup = ({ itemsPerRow = 3 }) => {

  const {categoryId} = useParams();

  const {data, loading, error} = useQuery(GET_PRODUCTS_BY_CATEGORY,{variables:{id:categoryId}});

  const { width, height } = getWindowDimensions();
  const midHeight = (height - 230 - 230 - 10) / 2;
  const midHeightString = `${midHeight}px 0 0 0`;

  const loader = true;

  const [loadingGlobalState, { addListener, changeListenerValue }] = useLoaderState();
  
  // let dataToRender = [];

  const [dataToRender, setdataToRender] = useState();

  useEffect(() =>{  
    if(!loading && data) {
      setdataToRender( data.page.products.map((product, index) => {
        const img = new Image();
        addListener(index);
        img.onload = () => changeListenerValue(index,false);
        img.src = product.pictures[0].croppedPicturePath;
        console.log({...product,img:img });
        return {...product,img:img }
      }))
      console.log(dataToRender);
    }
  },[loading]);
    
  if (loadingGlobalState)
    // return (<div style={{margin:'auto'}}><ReactLoading type={'bubbles'} color={'#009C95'} height={667} width={375} /></div>);
    // return 'loading';
    return <Loader midHeightString={midHeightString} />;


  if (error) 
    return 'error';

  // const sections = [
  //   { key: 'Acceuil', content: 'Acceuil', link: true , href:'/'},
  //   { key: data.page.label, content: data.page.label, active:true},
  //   // { key: 'Shirt', content: 'T-Shirt', active: true },
  // ]

  console.log(dataToRender);

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
};

export default ShopCardGroup;
