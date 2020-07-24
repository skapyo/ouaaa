import * as React from "react"
import { useState, useEffect } from "react";
import { withApollo } from 'hoc/withApollo.jsx';
import gql from "graphql-tag";
import { useRouter } from 'next/router'
import { useMutation } from "@apollo/react-hooks"
import FallbackEmailValidated from "containers/fallbacks/FallbackEmailValidated"
import FallbackEmailNotValidated from "containers/fallbacks/FallbackEmailNotValidated"

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

  // const [globalLoading, setLoadingInd] = useState(true);
  const [validateEmail, { data, error}] = useMutation(VALIDATE_EMAIL);

  const router = useRouter()
  const { email, token } = router.query

  useEffect(() => {
    if (email && token) validateEmail({variables: { email: email, token: token }});
  }, [email, token, validateEmail]);

  // useEffect(() => {
  //   if(data) {
  //     setLoadingInd(false);
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if(error) {
  //     setLoadingInd(false);
  //   }
  // }, [error]);

  if (data) {
    return (
      <FallbackEmailValidated email={email} />
    );
  }
  else if (error) {
    return (
      <FallbackEmailNotValidated email={email} />
    );
  }
  return (
    <h1>Loading...</h1>
  );
}

export default withApollo()(EmailValidation)
