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
    register(email:$email,password:$password,surname:$surname, lastname:$lastname, phone:$phone) 
  }
`;


export const VALIDATE_EMAIL= gql`
  mutation validateEmail ($email:String, $token:String) {
    validateEmail(email:$email,token:$token)
  }
`;

export const SEND_VALIDATION_EMAIL= gql`
  mutation sendValidationEmail ($email:String) {
    sendValidationEmail(email:$email)
  }
`;

export const SEND_CHANGE_PSSWD_EMAIL= gql`
  mutation sendValidationEmail ($email:String) {
    sendResetPswdEmail(email:$email)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation resetPassword ($email:String,$token:String,$password:String) {
    resetPassword(email:$email,token:$token,password:$password)
  }
`;