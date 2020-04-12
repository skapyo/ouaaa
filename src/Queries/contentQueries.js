import gql from "graphql-tag";

export const GET_CATEGORYS_LIST = gql`
{
  categorys {
    id,
    label, 
    description,
    position,
    activated,
    deleted
  }
}
`;

export const GET_PRODUCTS_LIST = gql`
  query getProductsList($id: String!) {
    category(id:$id) {
      products {id,label}
    }
  }
`;

export const ADD_LIKED_PRODUCT = gql`
  mutation addLikedProduct($productId: Int!) {
    addLikedProduct(productId:$productId) 
  }
`;

export const REMOVE_LIKED_PRODUCT = gql`
  mutation removeLikedProduct($productId: Int!) {
    removeLikedProduct(productId:$productId) 
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query getProductsByCategory($id: String!) {
    category(id:$id) {
      id,
      label,
      description,
      products {
        id,
        label,
        short_description,
        description, 
        price,
        isLiked,
        fleurie,
        conditionnement,
        hauteur,
        resistance,
        couleur,
        type,
        feuillage,
        urlPdf,
        temperature,
        hauteurAdulte,
        largeurAdulte,
        startFloraison,
        endFloraison,
        sol,
        exposition,
        pictures {
          id,
          label,
          croppedPicturePath
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($id: String!) {
    product(id:$id) {
      id,
      label,
      price,
      short_description,
      description,
      quantity,
      isLiked,
      isUnlimited,
      qavailable,
      fleurie,
      conditionnement,
      hauteur,
      resistance,
      couleur,
      type,
      feuillage,
      urlPdf,
      temperature,
      hauteurAdulte,
      largeurAdulte,
      startFloraison,
      endFloraison,
      sol,
      exposition,
      category {
        id,
        label 
      },
      pictures {
        id,
        originalPicturePath,
        croppedPicturePath,
        croppedX,
        croppedY,
        croppedZoom,
        croppedRotation
      }
    }
  }
`;


export const MODIFY_CATEGORY_INFORMATIONS= gql`
  mutation modifyCategorysInformationsMutation($categorys: [InputCategoryType]) {
    modifyCategorysInformations(categorys: $categorys) 
  }
`;

export const ADD_NEW_CATEGORY= gql`
  mutation addCategoryMutation($label: String!, $description:String) {
    addCategory(label:$label, description:$description) {
      id,
      label, 
      description,
      position,
      activated
    }
  }
`;

export const ADD_NEW_PRODUCT= gql`
mutation addProductMutation(
  $label: String!, 
  $short_description:String,
  $description:String,
  $price:Float,
  $categoryId:Int,
  $limitedQuantity:Boolean, 
  $quantity:Int,
  $fleurie:Boolean,
  $conditionnement:String,
  $hauteur:String,
  $resistance:String,
  $couleur:String,
  $type:String,
  $feuillage:String,
  $urlPdf:String,
  $temperature:String,
  $hauteurAdulte:String,
  $largeurAdulte:String,
  $startFloraison:String,
  $endFloraison:String,
  $sol:String,
  $exposition:String,
  $files: [InputPicture]
  ) {

    addProduct(
      label:$label, 
      short_description:$short_description, 
      description:$description, 
      price:$price,
      categoryId:$categoryId,
      limitedQuantity:$limitedQuantity,
      quantity:$quantity,
      fleurie:$fleurie,
      conditionnement:$conditionnement,
      hauteur:$hauteur,,
      resistance:$resistance,
      couleur:$couleur,
      type:$type,
      feuillage:$feuillage,
      urlPdf:$urlPdf,
      temperature:$temperature,
      hauteurAdulte:$hauteurAdulte,
      largeurAdulte:$largeurAdulte,
      startFloraison:$startFloraison,
      endFloraison:$endFloraison,
      sol:$sol,
      exposition:$exposition,
      images: $files
      ) {
        id,
        label, 
        short_description,
        description,
        fleurie,
        conditionnement,
        hauteur,
        resistance,
        couleur,
        type,
        feuillage,
        urlPdf,
        temperature,
        hauteurAdulte,
        largeurAdulte,
        startFloraison,
        endFloraison,
        sol,
        exposition,
        price,
        pictures {
          originalPicturePath,
          croppedPicturePath,
          croppedX,
          croppedY,
          croppedZoom,
          croppedRotation
        }
    }
  }
`;

export const MODIFY_PRODUCT= gql`
mutation modifyProductMutation(
  $id: String!,
  $label: String, 
  $short_description:String,
  $description:String,
  $price:Float,
  $categoryId:Int,
  $limitedQuantity:Boolean, 
  $quantity:Int,
  $fleurie:Boolean,
  $conditionnement:String,
  $hauteur:String,
  $resistance:String,
  $couleur:String,
  $type:String,
  $feuillage:String,
  $urlPdf:String,
  $temperature:String,
  $hauteurAdulte:String,
  $largeurAdulte:String,
  $startFloraison:String,
  $endFloraison:String,
  $sol:String,
  $exposition:String,
  $files: [InputModifyPictureType]
  ) {

    modifyProduct(
      id:$id,
      label:$label, 
      short_description:$short_description, 
      description:$description, 
      price:$price,
      categoryId:$categoryId,
      limitedQuantity:$limitedQuantity,
      quantity:$quantity,
      fleurie:$fleurie,
      conditionnement:$conditionnement,,
      hauteur:$hauteur,,
      resistance:$resistance,,
      couleur:$couleur,
      type:$type,
      feuillage:$feuillage,
      urlPdf:$urlPdf,
      temperature:$temperature,
      hauteurAdulte:$hauteurAdulte,
      largeurAdulte:$largeurAdulte,
      startFloraison:$startFloraison,
      endFloraison:$endFloraison,
      sol:$sol,
      exposition:$exposition,
      images: $files
      ) {
        id,
        label, 
        short_description,
        description,
        price,
        fleurie,
        conditionnement,
        hauteur,
        resistance,
        couleur,
        type,
        feuillage,
        pictures {
          originalPicturePath,
          croppedPicturePath,
          croppedX,
          croppedY,
          croppedZoom,
          croppedRotation
        }
    }
  }
`;



export const DELETE_PRODUCT_CART= gql`
mutation delProductInCart ($productId:Int,$quantity:Int) {
  delProductInCart(productId:$productId,quantity:$quantity) {
      source,
      success,
      errorCode,
      errorLabel,
      errorInformationDescription,
      errorInformation
      
  }
}
`;



export const ADD_PRODUCT_CART= gql`
mutation addProductInCart ($productId:Int,$quantity:Int) {
  addProductInCart(productId:$productId,quantity:$quantity) 
}
`;


export const GET_USER_ORDER_DETAILS=gql`
query ordersUserQuery($id: Int) {
  ordersUserQuery(id:$id) {
    id,
    status,
    totalprice,
    items {
      id,
      quantity,
      product {
        id,
        label,
        short_description,
        price,
        fleurie,
        conditionnement,
        hauteur,
        resistance,
        couleur,
        type,
        feuillage,
        urlPdf,
        temperature,
        hauteurAdulte,
        largeurAdulte,
        startFloraison,
        endFloraison,
        sol,
        exposition,
        pictures {
          id,
          croppedPicturePath
        }
      }
    }
  }
}
`;

export const GET_ALL_ORDERS=gql`
query ordersUserQuery {
  ordersUserQuery {
    id,
    status,
    totalprice,
    items {
      id,
      quantity,
      product {
        id,
        label,
        short_description,
        fleurie,
        conditionnement,
        hauteur,
        resistance,
        couleur,
        type,
        feuillage,
        urlPdf,
        temperature,
        hauteurAdulte,
        largeurAdulte,
        startFloraison,
        endFloraison,
        sol,
        exposition,
        price,
      }
    }
  }
}
`;

export const CANCEL_ORDER=gql`
mutation cancelOrder($orderId:Int) {
  cancelOrder(orderId:$orderId)
}
`;

export const MODIFY_PRODUCTS_DISPLAY= gql`
mutation modifyProductsDisplayMutation($categoryId:String, $productsDisplay: [InputProductDisplayType]) {
  modifyProductsDisplayMutation(categoryId:$categoryId,productsDisplay:$productsDisplay) {
      id,
      label,
      short_description,
      description, 
      price,
      position,
      activated,
      fleurie,
      conditionnement,
      hauteur,
      resistance,
      couleur,
      type,
      feuillage,
      urlPdf,
      temperature,
      hauteurAdulte,
      largeurAdulte,
      startFloraison,
      endFloraison,
      sol,
      exposition,
      deleted
      pictures {
        id,
        label,
        croppedPicturePath
      }
    }
  }
`;


export const GET_PRODUCTS_BY_CATEGORY_ADMIN = gql`
  query getProductsByCategoryAdmin($categoryId: String!) {
    productsQuery(categoryId:$categoryId) {
      id,
      label,
      short_description,
      description, 
      price,
      position,
      activated,
      fleurie,
      conditionnement,
      hauteur,
      resistance,
      couleur,
      type,
      feuillage,
      urlPdf,
      temperature,
      hauteurAdulte,
      largeurAdulte,
      startFloraison,
      endFloraison,
      sol,
      exposition,
      deleted
      pictures {
        id,
        label,
        croppedPicturePath
      }
    }
  }
`;