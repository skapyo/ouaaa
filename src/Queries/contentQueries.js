import gql from "graphql-tag";

export const GET_PAGES_LIST = gql`
{
  pages {
    id,
    label, 
    description,
    position,
    activated
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