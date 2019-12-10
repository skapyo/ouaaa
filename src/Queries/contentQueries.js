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
  mutation modifyPagePosition($id: Int!, $position:Int!) {
    modifyPagePosition(id: $id, position:$position) {
      id,
      label
    }
  }
`;