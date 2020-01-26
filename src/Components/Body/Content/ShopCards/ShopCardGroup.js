import React from "react";
import ShopCard from "./ShopCard";
import { Card,Header, Divider,Breadcrumb } from "semantic-ui-react";

import {useQuery} from '@apollo/react-hooks';
import {GET_PRODUCTS_BY_CATEGORY} from './../../../../Queries/contentQueries';
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom";

const ShopCardGroup = ({ itemsPerRow = 4 }) => {

  const {categoryId} = useParams();

  const {data, loading, error} = useQuery(GET_PRODUCTS_BY_CATEGORY,{variables:{id:categoryId}});

  if (loading)
    return 'loading';

  if (error) 
    return 'error';

  const sections = [
    { key: 'Acceuil', content: 'Acceuil', link: true , href:'/'},
    { key: data.page.label, content: data.page.label, active:true},
    // { key: 'Shirt', content: 'T-Shirt', active: true },
  ]

  return (
    <>
      <div style={{padding:'10px','background-color' :'#fafafa', width:'100vp'}}>
        <Breadcrumb size='large ' icon='right angle' sections={sections} />
      </div>
      <Header as='h1'>{data.page.label}</Header>
      <Divider/>
      <br />
      <Card.Group itemsPerRow={itemsPerRow}>
        {data.page.products.map((product) => (
          <ShopCard 
            imageURL={product.pictures[0].croppedPicturePath} 
            id={product.id}
            isLiked 
          />
        ))}
      </Card.Group>
    </>
  );
};

export default ShopCardGroup;
