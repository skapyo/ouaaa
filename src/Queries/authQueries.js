import gql from "graphql-tag";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email:$email,password:$password) {
      name,
      sub,
      token,
      iat,
      exp,
      refreshToken,
      role
    }
  }
`;