import React from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from '@apollo/react-hooks';
import {GET_PRODUCT} from './../../../../Queries/contentQueries';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { Segment,Grid , Breadcrumb, Header ,Divider} from 'semantic-ui-react';

const ProductPage = () => {

    const {productId} = useParams();

    const {data, loading, error} = useQuery(GET_PRODUCT,{variables:{id:productId}});

    if (loading)
        return 'loading';

    if (error) 
        return 'error';

    let images = [];
    if (data && data.product.pictures) {
        images = data.product.pictures.map((picture) => {
            return {
                original: picture.croppedPicturePath,
                thumbnail: picture.croppedPicturePath,
            }
        })
    }

    const sections = [
        { key: 'Acceuil', content: 'Acceuil', link: true , href:'/'},
        { key: data.product.page.label, content: data.product.page.label, href:`/categorie/${data.product.page.id}`},
        { key: data.product.label, content: data.product.label, active: true }
    ]

    return (
        <>
            <div style={{padding:'10px','background-color' :'#fafafa', width:'100vp'}}>
                <Breadcrumb size='large ' icon='right angle' sections={sections} />
            </div>
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
                            items={images} 
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