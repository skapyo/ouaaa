import { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { withApollo } from 'hoc/withApollo';
import FormController, {
  ValidationRuleType,
} from 'components/controllers/FormController';
import { Grid, TextField, Typography, Button } from '@material-ui/core';
import ClassicButton from 'components/buttons/ClassicButton';
import SearchIcon from '@material-ui/icons/Search';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import { useSessionState } from 'context/session/session';

const useStyles = makeStyles(theme => ({
  newsletter: {
    padding: '2em 0',
    textAlign: 'center',
    height: '24em',
    [theme.breakpoints.down('md')]: {
      padding: '1em 0',
      height: '18em',
    },
    [theme.breakpoints.down('md')]: {
      padding: '1em 0',
      height: '14em',
    }
  },
  align: {
    'text-align': 'center',
  },
  search: {
    position: 'relative',
    borderRadius: '9em',
    width: '35%',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%',
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
    [theme.breakpoints.down('sm')]: {
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
      [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('md')]: {
      height: 42,
      padding: '0 1.5em',
      fontSize: 15,
    }
  },
  buttonGridIcon: {
    marginRight: 15,
    '& > svg': {
      fontSize: '30px !important'
    }
  }
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

const Newsletter = () => {
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
      <Grid container direction="column" alignItems="center" justifyContent="space-around" className={styles.newsletter}>
        <Typography variant="h2" className={[styles.cardTitle, styles.align]}>
          POUR NE RIEN RATER DE <i>OUAAA!</i>
          <br />
          INSCRIVEZ-VOUS À NOTRE NEWSLETTER
        </Typography>
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
              <SearchIcon />
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
