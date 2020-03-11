import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {GET_USER_ORDER_DETAILS} from '../../../../Queries/contentQueries';
import useLoaderState from '../../../../Hooks/useLoaderState';
import Loader from '../../../Loader/Loader';
import useWindowSize from '../../../../Hooks/useWindowSize';
import {useParams} from "react-router-dom";
import Order from './Order';

const OrderContainer = () => {

    const {orderId} = useParams();
    const {data,loading,error,refetch} = useQuery(GET_USER_ORDER_DETAILS,{
        fetchPolicy:"network-only",
        variables:{
            id:orderId
        }
    });

    return (
        <Order 
            data = {data}
            loading = {loading}
            erorr = {error}
            refetch = {refetch}
        />
    );

}

export default OrderContainer;