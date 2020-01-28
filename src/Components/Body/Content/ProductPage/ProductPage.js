import React, {useEffect,useState} from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from '@apollo/react-hooks';
import {GET_PRODUCT} from './../../../../Queries/contentQueries';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { Segment,Grid , Breadcrumb, Header ,Divider} from 'semantic-ui-react';
import update from "immutability-helper";
import { ScaleLoader } from "halogenium";

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

const ProductPage = () => {

    const {productId} = useParams();

    const {data, loading, error} = useQuery(GET_PRODUCT,{variables:{id:productId}});

    const [dataToRender, setdataToRender] = useState();

    const [loadingGlobalState, { addListener, changeListenerValue }] = useLoaderState();

    const { width, height } = getWindowDimensions();
    const midHeight = (height - 230 - 230 - 10) / 2;
    const midHeightString = `${midHeight}px 0 0 0`;

    useEffect(() =>{  
        if(!loading && data && data.product.pictures) {
          setdataToRender( data.product.pictures.map((picture, index) => {
            const img = new Image();
            addListener(index);
            img.onload = () => changeListenerValue(index,false);
            img.src = picture.croppedPicturePath;
            console.log({
                original: img.src,
                thumbnail: img.src,
            });
            return {
                        original: img.src,
                        thumbnail: img.src,
                    }
          }))
          console.log(dataToRender);
        }
      },[loading]);

    if (loadingGlobalState)
        return <Loader midHeightString={midHeightString} />;

    if (error) 
        return 'error';

    // let images = [];
    // if (data && data.product.pictures) {
    //     images = data.product.pictures.map((picture) => {
    //         return {
    //             original: picture.croppedPicturePath,
    //             thumbnail: picture.croppedPicturePath,
    //         }
    //     })
    // }

    return (
        <>
            <Header as='h1'>{data.product.label}</Header>
            <Divider/>
            <br />
            {/* <br /> */}
            {/* <br /> */}
            {/* <Divider /> */}
            <br />
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <ImageGallery 
                            items={dataToRender} 
                            thumbnailPosition = 'left'
                            showFullscreenButton = {false}
                            showPlayButton = {false}
                            showNav = {false}
                            slideOnThumbnailOver = {true}
                        />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        {/* <Header as='h1'>{data.product.label}</Header> */}
                        {/* <br /> */}
                        
                        
                        <Header as='h2'>Description: </Header>
                        <br/>
                        {data.product.description.split('\n').map( (it, i) => <div key={'x'+i}>{it}</div> )}
                        <br />
                        <Divider/>
                        <Header as='h3'>Prix:{` ${data.product.price}€`}</Header>
                    </Grid.Column>
                </Grid.Row>
                {/* <Divider/> */}
            </Grid>
        </>
        
    
    );
        
       

};

export default ProductPage;