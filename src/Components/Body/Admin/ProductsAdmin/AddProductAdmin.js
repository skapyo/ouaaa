import React from 'react';

import ProductAdmin from './ProductAdmin';

import {ADD_NEW_PRODUCT} from './../../../../Queries/contentQueries';

const stateInit = {
    name: "",
    price: null,
    shortdescr: "",
    longdescr: "",
    nolimit:true,
    nb_products:null
  };
  
const AddProductAdmin = () => {

    return (<ProductAdmin initFormData={stateInit} mutationRequest={ADD_NEW_PRODUCT} />);

};

export default AddProductAdmin;