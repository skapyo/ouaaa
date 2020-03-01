import gql from "graphql-tag";

export const GET_PAGES_LIST = gql`
{
  pages {
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
    page(id:$id) {
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
    page(id:$id) {
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
      page {
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


export const MODIFY_PAGE_INFORMATIONS= gql`
  mutation modifyPagesInformationsMutation($pages: [InputPageType]) {
    modifyPagesInformations(pages: $pages) 
  }
`;

export const ADD_NEW_PAGE= gql`
  mutation addPageMutation($label: String!, $description:String) {
    addPage(label:$label, description:$description) {
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
  $price:Int,
  $pageId:Int,
  $limitedQuantity:Boolean, 
  $quantity:Int,
  $files: [InputPicture]
  ) {

    addProduct(
      label:$label, 
      short_description:$short_description, 
      description:$description, 
      price:$price,
      pageId:$pageId,
      limitedQuantity:$limitedQuantity,
      quantity:$quantity,
      images: $files
      ) {
        id,
        label, 
        short_description,
        description,
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
  $price:Int,
  $pageId:Int,
  $limitedQuantity:Boolean, 
  $quantity:Int,
  $files: [InputModifyPictureType]
  ) {

    modifyProduct(
      id:$id,
      label:$label, 
      short_description:$short_description, 
      description:$description, 
      price:$price,
      pageId:$pageId,
      limitedQuantity:$limitedQuantity,
      quantity:$quantity,
      images: $files
      ) {
        id,
        label, 
        short_description,
        description,
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

export const ADD_PRODUCT_CART= gql`
mutation addProductInCart ($productId:Int,$quantity:Int) {
  addProductInCart(productId:$productId,quantity:$quantity) {
      source,
      success,
      errorCode,
      errorLabel,
      errorInformationDescription,
      errorInformation
      
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

export const GET_CART= gql`
{
    cartQuery {
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
        pictures {
          id,
          croppedPicturePath
        }
      }
    }
  }
}
`;

