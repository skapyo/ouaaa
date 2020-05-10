import React,{ useState, useEffect,useCallback } from "react";
import ShopCard from "../../src/Components/Body/Content/ShopCards/ShopCard";
import { Card,Header, Pagination , Segment} from "semantic-ui-react";
import {useQuery} from '@apollo/react-hooks';
import {Link, useParams} from "react-router-dom";
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
import { useRouter } from 'next/router'
import withApollo from '../../lib/withApollo';
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

const GET_FAVORITES = gql`
    query getLikedProducts {
        getLikedProducts {
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

const GET_CATEGORY_INFOS = gql`
    query getCategoryLabel($categoryId: String!) {
        category(id:$categoryId) {
            label,
            productsNb
        }
    }
`;
const myRef  = React.createRef();

const ShopCardGroup = ({itemsPerRow=3,limit=30,action='category',id,pageNumberParam}) => {
    const router = useRouter();
    const  categoryId = router.query.id;

    var myRef  = React.createRef();
    const pageNumber = {pageNumberParam};
   // const history = useHistory();
//debugger;
    const [offset, setOffset] = useState((!pageNumber || pageNumber == 0) ? 0 : (pageNumber-1) * limit);

    const [dataToRender, setDataToRender] = useState(null);

    /* set const to the fetch data query */
    const fetchDataRequest = action == 'favorites' ? GET_FAVORITES : GET_PRODUCTS_BY_CATEGORY;
    const fetchDataCategoryVariables = {
        categoryId,
        offset,
        limit
    };

    const {data, loading, error,refetch} = useQuery(
        fetchDataRequest,
        {
            variables : action == 'category' && fetchDataCategoryVariables,
            fetchPolicy : "no-cache"
        }
    );
debugger;
    const {data:pageData,loading:loadingData,error:errorData} = useQuery(
        GET_CATEGORY_INFOS,
        {
            variables : {
                categoryId : action == 'favorites' ? '-1' : categoryId
            },
            // fetchPolicy : "no-cache"
        }
    );
    /* if one query is still loading, globalLoading is true*/
    const globalLoading = (loading || loadingData) ? true : false;

    useEffect(() => {
        if(!globalLoading) {
            let reformatedData = null;
            if(data!== undefined && data.getLikedProducts) {
                reformatedData = {productsQuery:data.getLikedProducts.map((product) => {
                        return product;
                    })};
            }
            else reformatedData = data;
            setDataToRender({
                data:reformatedData,
                pageData,
                pageNumber
            });

        }
    },[globalLoading,data,pageData,pageNumber]);

    /* Pagination change callback */
    const onPageChangehandler = useCallback((_, { activePage }) => {
    //    history.push(`/categorie/${categoryId}/page/${activePage}`);
        scroll.scrollTo(0);
    },[categoryId]);

    /* reset offset when page number / limit change */
    useEffect(() => {
        setOffset((!pageNumber || pageNumber == 0) ? 0 : (pageNumber-1) * limit);
    },[pageNumber,limit]);

    useEffect(() => {
        scroll.scrollTo(0);
    },[categoryId]);

    if (error || errorData)
        return 'error';

    /* if the query fetch no data, redirect to the main category page */
  //  if(!loading && data?.productsQuery?.length < 1)
    //    history.push(`/categorie/${categoryId}`);
debugger;
    if (error)
        return 'error';
//debugger;
    return (
        <>
            <head title={dataToRender?.pageData?.category?.label} />

            <Header as='h1' style={headerStyle}>{dataToRender?.pageData?.category?.label}</Header>
            <br />
            <br />
            <Card.Group itemsPerRow={itemsPerRow} stackable>
                {dataToRender?.data?.productsQuery &&  dataToRender.data.productsQuery.map((product,index) => {

                    return (
                        <ShopCard
                            product = {product}
                            refetch = {refetch}
                        />
                    );
                })}
            </Card.Group>
            {dataToRender?.data?.productsQuery.length < 1 &&  (action == 'favorites') &&
            `Cliquez un coeur d'un article pour le placer dans vos favoris.`
            }
            <br />
            <Segment textAlign='center' basic>
                {(dataToRender?.pageData && dataToRender?.pageData.category!=null && (dataToRender?.pageData.category.productsNb / limit) > 1) &&(
                    <Pagination
                        size = 'tiny'
                        activePage={dataToRender?.pageNumber || 1}
                        totalPages={Math.ceil(dataToRender?.pageData?.category.productsNb / limit)}
                        onPageChange = {onPageChangehandler}
                    />
                )}
            </Segment>
        </>
    );
};

export default withApollo(ShopCardGroup);