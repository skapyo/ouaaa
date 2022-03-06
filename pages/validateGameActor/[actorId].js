import * as React from 'react';
import { useEffect } from 'react';
import { withApollo } from 'hoc/withApollo.jsx';
import gql from 'graphql-tag';
import { useSessionState } from '../../context/session/session';
import Router, { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { withRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import SigninForm from 'containers/forms/SigninForm';
import FallbackEmailValidated from 'containers/fallbacks/FallbackEmailValidated';
import { useSnackbar } from 'notistack';

const VALIDATE_GAME_ACTOR = gql`
  mutation validateGameActor($userId: String!, $actorId: String!) {
    validateGameActor(userId: $userId, actorId: $actorId)
  }
`;

const ValidateGameActor = () => {
  const [validateGameActor, { data, error }] = useMutation(VALIDATE_GAME_ACTOR);
  const user = useSessionState();
  const router = useRouter();
  const { actorId } = router.query;
  const scnackbar = useSnackbar();
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    if (!user){
      scnackbar.enqueueSnackbar("Vous devez vous connecter pour valider votre passage du Grand défi");
      setCookie('redirect_url', router.asPath, { path: `/validateGameActor/${actorId}` });
      router.push('/signin');
      
    }

    if (user && actorId) {
      const userId = user.id;
      validateGameActor({ variables: { userId, actorId } });
    }
  }, [user, actorId, validateGameActor]);

  if (data) {
    debugger;
    scnackbar.enqueueSnackbar("Validation de votre passage du grand défi avec succès");
    router.push('/granddefiProgression');
  }
  if (error) {
    scnackbar.enqueueSnackbar("Erreur lors de la validation de votre passage veuillez le signaler via le formulaire de contact");
    router.push('/granddefiProgression');
    return null;
  }
  return null;
};

export default withRouter(withApollo()(ValidateGameActor));
