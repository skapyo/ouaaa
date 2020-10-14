import { makeStyles, Typography } from '@material-ui/core';
import { withApollo } from 'hoc/withApollo';
import ActorAdminPageLayout from 'containers/layouts/actorAdminPage/ActorAdminPageLayout';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import gql from 'graphql-tag';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '200px',
    height: '200px',
    marginBottom: theme.spacing(4),
  },
  userInfosTitle: {
    marginBottom: theme.spacing(5),
  },
}));

const ActorAdminPage = () => {
  const GET_ACTORS = gql`
        { actors
        {   id,
            name,
            address,
            short_description,
            lat,
            lng,
            categories{
                label
            }
        }
        }
    `;
  const { data, loading, error } = useQuery(GET_ACTORS, { fetchPolicy: 'network-only' });

  const [state, setState] = React.useState({});

  const handleChange = (actor, event) => {
    setState({ ...state, [actor.id.toString()]: event.target.checked });
  };
  const styles = useStyles();

  return (
    <ActorAdminPageLayout>
      <Typography
        color="secondary"
        variant="h6"
        className={styles.userInfosTitle}
      >
        Administrer un événement : A venir
      </Typography>
      <FormControl component="fieldset">
        <FormGroup>
          {typeof data !== 'undefined' && data.actors.map((actor, index) => {
            <FormControlLabel
              control={<Checkbox checked={state[actor.id.toString()]} onChange={(e) => handleChange(actor, e)} name={actor.name} />}
              label={actor.name}
            />;
          })}
        </FormGroup>
      </FormControl>

    </ActorAdminPageLayout>
  );
};

export default withApollo()(ActorAdminPage);
