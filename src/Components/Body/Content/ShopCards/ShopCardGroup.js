import React,{ useState, useEffect,useCallback } from "react";
import ShopCard from "./ShopCard";
import { Card,Header, Pagination , Segment} from "semantic-ui-react";
import {useQuery} from '@apollo/react-hooks';
import {Link, useParams} from "react-router-dom";
import Loader from './../../../Loader/Loader';
import useLoaderState from './../../../../Hooks/useLoaderState';
import useWindowSize from './../../../../Hooks/useWindowSize';
import {getImageUrl} from './../../../../Utils/utils';
import gql from "graphql-tag";
import { useHistory } from 'react-router-dom';
import { animateScroll as scroll} from 'react-scroll'
const headerStyle = {
  "font-family": "Ubuntu', sans-serif",
  "font-size": "30px",
  // 'font-style': 'normal',
  "font-weight": "lighter",
  color: "#009C95"
};

const GET_PRODUCTS_BY_CATEGORY = gql`
    query getProductsByCategory($categoryId: String!,$offset:Int,$limit:Int) {
        productsQuery(categoryId:$categoryId,offset:$offset,limit:$limit) {
            id,
            label,
            short_description,
            description,
            price,
            isLiked,
            pictures {
                croppedPicturePath
            }
        }
    }
`;

const GET_CATEGORY_LABEL = gql`
    query getCategoryLabel($categoryId: String!) {
        category(id:$categoryId) {
            label,
            productsNb
        }
    }
`;
const myRef  = React.createRef();

const ShopCardGroup = ({itemsPerRow=3,limit=30}) => {
    var myRef  = React.createRef();
    const {categoryId,pageNumber} = useParams();
    const history = useHistory();

    const [offset, setOffset] = useState((!pageNumber || pageNumber == 0) ? 0 : (pageNumber-1) * limit);

    const [dataToRender, setDataToRender] = useState(null);

    const {data, loading, error} = useQuery(
        GET_PRODUCTS_BY_CATEGORY,
        {
            variables:{
                categoryId,
                offset,
                limit
            },
            fetchPolicy : "no-cache"
        }
    );
    const {data:pageData,loading:loadingData,error:errorData} = useQuery(
        GET_CATEGORY_LABEL,
        {
            variables : {
                categoryId
            }
        }
    );
    /* if one query is still loading, globalLoading is true*/
    const globalLoading = (loading || loadingData) ? true : false;

    useEffect(() => {
        if(!globalLoading) {
            setDataToRender({data,pageData,pageNumber});
        }
    },[globalLoading,data,pageData,pageNumber]);

    /* Pagination change callback */
    const onPageChangehandler = useCallback((_, { activePage }) => {
        history.push(`/categorie/${categoryId}/page/${activePage}`);
        scroll.scrollTo(0)
    },[history,categoryId]);

    /* reset offset when page number / limit change */
    useEffect(() => {
        setOffset((!pageNumber || pageNumber == 0) ? 0 : (pageNumber-1) * limit);
    },[pageNumber,limit]);


    if (error || errorData)
        return 'error';

    /* if the query fetch no data, redirect to the main category page */
    if(!loading && data?.productsQuery?.length < 1)
        history.push(`/categorie/${categoryId}`);

  if (error) 
    return 'error';

  return (
    <>

        <Header as='h1' style={headerStyle}>{pageData?.category.label}</Header>
        <br />
      <br />
    <Card.Group itemsPerRow={itemsPerRow} stackable>
        {dataToRender?.data &&  dataToRender.data.productsQuery.map((product,index) => {

        return (
            <ShopCard
            product = {product}
          />
        );
        })}
      </Card.Group>
        <br />
        <Segment textAlign='center' basic>
            {(pageData && (pageData?.category.productsNb / limit) > 1) &&(
                <Pagination
                    size = 'tiny'
                    activePage={pageNumber || 1}
                    totalPages={Math.ceil(pageData?.category.productsNb / limit)}
                    onPageChange = {onPageChangehandler}
                />
            )}
        </Segment>
    </>
  );
};

export default ShopCardGroup;