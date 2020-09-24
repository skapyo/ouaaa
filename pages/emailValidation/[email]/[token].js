import * as React from "react"
import {useEffect} from "react"
import {withApollo} from 'hoc/withApollo.jsx';
import gql from "graphql-tag";
import Router, {useRouter} from 'next/router'
import {useMutation} from "@apollo/react-hooks"
import FallbackEmailValidated from "containers/fallbacks/FallbackEmailValidated"

const VALIDATE_EMAIL = gql`
  mutation validateEmail (
    $email: String!,
    $token: String!
  ) {
    validateEmail(
      email: $email,
      token: $token
    )
  }
`;

const EmailValidation = () => {

  const [validateEmail, { data, error}] = useMutation(VALIDATE_EMAIL);

  const router = useRouter()
  const { email, token } = router.query

  useEffect(() => {
    if (email && token) validateEmail({variables: { email: email, token: token }});
  }, [email, token, validateEmail]);

  if (data) {
    return (
      <FallbackEmailValidated email={email} />
    );
  }
  else if (error) {
    Router.push('/')
    return null
  }
  else return null
}

export default withApollo()(EmailValidation)
