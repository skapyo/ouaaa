import React, {useEffect,useState} from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from '@apollo/react-hooks';
import {GET_PRODUCT} from './../../../../Queries/contentQueries';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { Grid , Header ,Divider} from 'semantic-ui-react';
import Loader from './../../../Loader/Loader';
import useLoaderState from './../../../../Hooks/useLoaderState';
import useWindowSize from './../../../../Hooks/useWindowSize';
 
  
const ProductPage = () => {

    const {productId} = useParams();

    const {data, loading, error} = useQuery(GET_PRODUCT,{variables:{id:productId}});

    const [dataToRender, setdataToRender] = useState();

    const [loadingGlobalState, { addListener, changeListenerValue }] = useLoaderState();

    const {height} = useWindowSize();
    const midHeight = (height - 230 - 230 - 10) / 2;
    const midHeightString = `${midHeight}px 0 0 0`;

    useEffect(() =>{  
        if(!loading && data && data.product.pictures) {
          setdataToRender( data.product.pictures.map((picture, index) => {
            const img = new Image();
            addListener(index);
            img.onload = () => changeListenerValue(index,false);
            img.src = picture.croppedPicturePath;
            return {
                        original: img.src,
                        thumbnail: img.src,
                    }
          }))
        }
      },[loading]);

    if (loadingGlobalState)
        return <Loader midHeightString={midHeightString} />;

    if (error) 
        return 'error';

    return (
        <>
            <Header as='h1'>{data.product.label}</Header>
            <Divider/>
            <br />
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
                        <Header as='h2'>Description: </Header>
                        <br/>
                        {data.product.description.split('\n').map( (it, i) => <div key={'x'+i}>{it}</div> )}
                        <br />
                        <Divider/>
                        <Header as='h3'>Prix:{` ${data.product.price}€`}</Header>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    );
};
export default ProductPage;