import { useCallback, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { withApollo } from 'hoc/withApollo';
import FormController, {
  ValidationRuleType,
} from 'components/controllers/FormController';
import {
  Grid, TextField, Typography, Button,
} from '@mui/material';
import ClassicButton from 'components/buttons/ClassicButton';
import DoneIcon from '@mui/icons-material/Done';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useSessionState } from 'context/session/session';

const useStyles = makeStyles((theme) => ({
  newsletter: {
    padding: '2em 0',
    textAlign: 'center',
   
    [theme.breakpoints.down('lg')]: {
      padding: '1em 0',
    },
  },
  align: {
    'text-align': 'center',
  },

  newsletterLegal: {
    'text-align': 'justify',
     padding: '1em',
  },
  search: {
    position: 'relative',
    borderRadius: '9em',
    width: '35%',
    margin: '0 auto',
    [theme.breakpoints.down('lg')]: {
      width: '50%',
    },
    [theme.breakpoints.down('md')]: {
      width: '70%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  searchIcon: {
    width: '56px',
    height: '52px',
    borderRadius: '30px',
    backgroundColor: '#2C367E',
    color: 'white',
    position: 'absolute',
    right: '2px',
    top: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      width: '30%',
      margin: '1.4rem auto 0.5rem auto',
      alignItems: 'center',
    },
  },
  inputRoot: {
    width: '100%',
  },
  inputInput: {
    width: '100%',
    height: '36px',
    color: '#A3A3A3',
    fontStyle: 'italic',
    margin: '0',
    '& div': {
      borderRadius: '30px',
      [theme.breakpoints.down('md')]: {
        fontSize: '0.8rem',
      },
    },
    '& input': {
      padding: '18.5px 14px',
    },
    '& fieldset': {
      borderRadius: '30px',
    },
  },
  cardTitle: {
    align: 'center',
    fontSize: '2.2em',
    color: '#2C367E',
    letterSpacing: '2px',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.3em',
    },
  },
  buttonGrid: {
    color: 'white',
    backgroundColor: '#2C367E',
    border: 'none',
    fontSize: 16,
    borderRadius: '1.5em',
    padding: '0 2em',
    height: 52,
    [theme.breakpoints.down('lg')]: {
      height: 42,
      padding: '0 1.5em',
      fontSize: 15,
    },
  },
  buttonGridIcon: {
    marginRight: 15,
    '& > svg': {
      fontSize: '30px !important',
    },
  },
}));

const ADD_NEWSLETTER_EMAIL = gql`
  mutation createNewsletterEmail($email: String!) {
    createNewsletterEmail(email: $email) {
      id
    }
  }
`;

const ADD_NEWSLETTER_USER = gql`
  mutation createNewsletterUser($userId: Int!) {
    createNewsletterUser(userId: $userId) {
      id
    }
  }
`;

const validationRules = {
  email: {
    rule: ValidationRuleType.required && ValidationRuleType.email,
  },
};

const Newsletter = (prop) => {
  const Form = (props) => {
    const styles = useStyles();
    const user = useSessionState();
    const [subscribed, setSubscribed] = useState(false);
    const { formChangeHandler, formValues, validationResult } = props;

    const [
      newsletterEmail,
      { data: dataVisitor, error: errorVisitor },
    ] = useMutation(ADD_NEWSLETTER_EMAIL);
    const [newsletterUser, { data: dataUser, error: errorUser }] = useMutation(
      ADD_NEWSLETTER_USER,
    );

    const subscription = useCallback(() => {
      // vérifier qu'il n'y a pas de doublons
      if (!user) {
        newsletterEmail({
          variables: {
            email: formValues.email,
          },
        });
      } else {
        newsletterUser({
          variables: {
            userId: parseInt(user.id),
          },
        });
      }
      if (!errorVisitor && !errorUser) {
        setSubscribed(true);
      }
    }, [
      newsletterEmail,
      newsletterUser,
      formValues,
      setSubscribed,
      errorVisitor,
      errorUser,
      user,
    ]);

    return (
      <Grid id={prop.id} container direction="column" alignItems="center" justifyContent="space-around" className={styles.newsletter}>
        <Typography variant="h2" className={[styles.cardTitle, styles.align]}>
          POUR NE RIEN RATER DE
          {' '}
          <i>OUAAA!</i>
          <br />
          INSCRIVEZ-VOUS À NOTRE NEWSLETTER

   
        </Typography>
        <div className={styles.newsletterLegal}>
          Les données personnelles relatives à la création du compte (nom/prénom, structure si
          professionnel, numéro de téléphone, email) sont destinées à permettre l’identification sur le site
          et l’accès à son compte et aux fonctionnalités correspondantes. Les données sont conservées
          tant que le compte est actif. Une fois par an, le responsable de traitement peut effectuer une
          campagne de vérification d’adresse mails pour supprimer les comptes inactifs après vérification
          par contact téléphonique
          <br />
          Les fiches acteurs reliées à des comptes inactifs seront mises à jour avec la mention suivante :
          coordonnées obsolètes à telle date. Pour toute question, vous pouvez joindre l’administrateur du
          site à contact@ouaaa-transition.fr et exercer vos droits d’accès, de rectification ou de suppression
          aurprès du DPD à dpd@ouaaa-transition.fr
        </div>
        {!subscribed && !user && (
          <div className={styles.search}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              autoComplete="current-email"
              placeholder="J'inscris mon email pour recevoir la newsletter"
              defaultValue=""
              className={styles.inputInput}
              value={formValues?.email}
              onChange={formChangeHandler}
            />
            <ClassicButton
              variant="contained"
              className={styles.searchIcon}
              onClick={subscription}
              disabled={!validationResult?.global}
            >
              <DoneIcon />
            </ClassicButton>
          </div>
        )}
        {!subscribed && user && (
          <Button
            className={styles.buttonGrid}
            classes={{ startIcon: styles.buttonGridIcon }}
            variant="contained"
            onClick={subscription}
            startIcon={<TrendingFlatIcon />}
          >
            M'abonner à la newsletter
          </Button>
        )}
        {subscribed && (
          <Typography variant="h5">
            Inscription à la newsletter bien effectuée.
          </Typography>
        )}
      </Grid>
    );
  };

  return <FormController render={Form} validationRules={validationRules} />;
};

export default withApollo()(Newsletter);
