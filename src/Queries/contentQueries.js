import gql from "graphql-tag";

export const GET_PAGES_LIST = gql`
{
  pages {
    id,
    label, 
    position,
    activated
  }
}
`;

export const MODIFY_PAGE_POSITION = gql`
  mutation modifyPageOrder($id: Int!, $position:Int!) {
    modifyPageOrder(id: $id, position:$position) {
      id,
      label
    }
  }
`;