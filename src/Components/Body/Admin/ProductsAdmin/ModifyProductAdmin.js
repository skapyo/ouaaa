import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from '@apollo/react-hooks';
import {GET_PRODUCT} from './../../../../Queries/contentQueries';
import {useAlert} from 'react-alert'
import ProductAdmin from './ProductAdmin';
import {MODIFY_PRODUCT} from './../../../../Queries/contentQueries';
import {getImageUrl} from './../../../../Utils/utils';

const ModifyProductAdmin = () => {

    // init status to false, come true once all File Object are created from img url
    const [status, setStatus] = useState(false);

    // init product id from url params
    const {productId} = useParams();
    
    // init query to fetch the product infos from the server
    const { loading, error, data } = useQuery(GET_PRODUCT,{
        variables:{id:productId},
        fetchPolicy:"network-only"
    });

    // init alert
    const alert = useAlert();

    // check if error occurs and raise an alert
    if(error !== undefined) {   
        alert.error("Il y a eu une erreur pendant la récupération des informations du produit séléctionné!");
    }

    // wait for data to be fetched
    if(loading) return 'loading';
   

    //build init data
    let stateInit = {};
    let imgInit = [];
    if(data !== undefined && data.product) {
        
        stateInit = {
            name: data.product.label,
            price: data.product.price,
            shortdescr: data.product.short_description,
            longdescr: data.product.description,
            nolimit:data.product.limitedQuantity,
            fleurie:data.product.fleurie,
            resistance:data.product.resistance,
            conditionnement:data.product.conditionnement,
            couleur:data.product.couleur,
            type:data.product.type,
            hauteur:data.product.hauteur,
            feuillage:data.product.feuillage,
            urlPdf:data.product.urlPdf,
            temperature:data.product.temperature,
            hauteurAdulte:data.product.hauteurAdulte,
            largeurAdulte:data.product.largeurAdulte,
            startFloraison:data.product.startFloraison,
            endFloraison:data.product.endFloraison,
            sol:data.product.sol,
            exposition:data.product.exposition,
            nb_products:data.product.quantity
        };

        if(data.product.pictures) {
            imgInit = data.product.pictures.map((picture,index) => {
                return {
                    id : index,
                    file : null,
                    img : getImageUrl(picture.originalPicturePath),
                    croppedImg : {
                        crop:{
                          x : picture.croppedX,
                          y : picture.croppedY
                        },
                        rotation : picture.croppedRotation,
                        zoom : picture.croppedZoom,
                        file : null,
                        img : getImageUrl(picture.croppedPicturePath),
                        modified : false
                      },
                    activated : true,
                    deleted : false,
                    newpic : false,
                    serverId : picture.id,
                };
            });
        }
    };

    return (<ProductAdmin 
        initFormData={stateInit} 
        initImgData = {imgInit}
        categoryId={data.product.category.id}
        productId={productId}
        mutationRequest={MODIFY_PRODUCT} />);
};

export default ModifyProductAdmin;

