import gql from "graphql-tag";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email:$email,password:$password) {
      surname,
      lastname,
      sub,
      token,
      iat,
      exp,
      refreshToken,
      role
    }
  }
`;

export const SIGNUP = gql`
  mutation register($email: String!, $password: String!,$surname:String!, $lastname:String!, $phone:String) {
    register(email:$email,password:$password,surname:$surname, lastname:$lastname, phone:$phone) {
      surname,
      lastname,
      sub,
      token,
      iat,
      exp,
      refreshToken,
      role
    }
  }
`;