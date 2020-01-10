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
  $files: [Upload]
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
        price
    }
  }
`;