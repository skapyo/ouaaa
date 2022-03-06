import * as React from 'react';
import { useEffect } from 'react';
import { withApollo } from 'hoc/withApollo.jsx';
import gql from 'graphql-tag';
import Router, { useRouter, withRouter } from 'next/router';
import { useCookies } from 'react-cookie';

import { useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import SigninForm from 'containers/forms/SigninForm';
import FallbackEmailValidated from 'containers/fallbacks/FallbackEmailValidated';
import { useSnackbar } from 'notistack';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { useSessionState } from '../../context/session/session';

const VALIDATE_GAME_ACTOR = gql`
  mutation validateGameActor($userId: String!, $actorId: String!) {
    validateGameActor(userId: $userId, actorId: $actorId)
  }
`;

const ValidateGameActor = () => {
  const [validateGameActor, { data, error }] = useMutation(VALIDATE_GAME_ACTOR);
  const user = useSessionState();
  const router = useRouter();
  const CryptoJS = require('crypto-js');

  let dataText;
  const bytes = base64_decode(router.query.actorId);
  dataText = CryptoJS.AES.decrypt(bytes, 'ouaaaTransition@2022');
  const actorId = dataText.toString(CryptoJS.enc.Utf8).replace('"', '');
  const scnackbar = useSnackbar();
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    if (!user) {
      scnackbar.enqueueSnackbar('Vous devez vous connecter pour valider votre passage du Grand défi');
      setCookie('redirect_url', router.asPath, { path: `/validateGameActor/${router.query.actorId}` });
      router.push('/signin');
    }

    if (user && actorId) {
      const userId = user.id;
      validateGameActor({ variables: { userId, actorId } });
    }
  }, [user, actorId, validateGameActor]);

  if (data) {
    scnackbar.enqueueSnackbar('Validation de votre passage du grand défi avec succès');
    router.push('/granddefiProgression');
  }
  if (error) {
    scnackbar.enqueueSnackbar('Erreur lors de la validation de votre passage veuillez le signaler via le formulaire de contact');
    router.push('/granddefiProgression');
    return null;
  }
  return null;
};

export default withRouter(withApollo()(ValidateGameActor));
