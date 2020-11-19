import {useCallback, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import gql from "graphql-tag"
import {useMutation} from "@apollo/client"
import {withApollo} from "hoc/withApollo"
import FormController, {ValidationRuleType} from "components/controllers/FormController"
import {Container, TextField, Typography} from "@material-ui/core";
import ClassicButton from "components/buttons/ClassicButton"
import SearchIcon from '@material-ui/icons/Search';
import {useSessionState} from 'context/session/session';

const useStyles = makeStyles((theme) => ({
  newsletter: {
    paddingTop: '5em',
    paddingBottom: '5em',
    textAlign: 'center',
    height: '32em',
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
    backgroundColor: '#bf083e',
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
    fontFamily: 'rowdies',
    fontSize: '2.2em',
    color: '#2a9076',
    letterSpacing: '2px',
    marginBottom: '3em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5em',
    },
  },
  buttonGrid: {
    color: 'white',
    'background-color': '#bf083e',
    border: 'none',
    fontFamily: 'rowdies',
    fontSize: '18px',
    borderRadius: '1.5em',
    padding: '0 3em 0 3em',
    height: '52px',
    '&:hover': {
      cursor: 'pointer',
      color: '#bf083e',
      "background-color":"white",
      border: "2px solid #bf083e",
      backgroundImage:`url('./arrow-hover.svg')`,
    },
    backgroundImage: 'url(\'./arrow.svg\')',
    backgroundRepeat: 'no-repeat',
    'background-position-x': '5px',
    'background-position-y': '1px',
    'background-size': '11%',
  },
}));

const ADD_NEWSLETTER_EMAIL = gql`
  mutation createNewsletterEmail (
    $email: String!
  ) {
    createNewsletterEmail (email: $email) {
      id
    }
  }
`;

const ADD_NEWSLETTER_USER = gql`
  mutation createNewsletterUser (
    $userId: Int!
  ) {
    createNewsletterUser (userId: $userId) {
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

    const [newsletterEmail, { data: dataVisitor, error: errorVisitor }] = useMutation(ADD_NEWSLETTER_EMAIL);
    const [newsletterUser, { data: dataUser, error: errorUser }] = useMutation(ADD_NEWSLETTER_USER);

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
      if (!errorVisitor && !errorUser) { setSubscribed(true); }
    }, [newsletterEmail, newsletterUser, formValues, setSubscribed, errorVisitor, errorUser, user]);

    return (
      <Container className={[styles.newsletter]}>
        <Typography variant="h2" className={[styles.cardTitle, styles.align]}>
          POUR NE RIEN RATER DE #OUAAA
          <br />
          INSCRIVEZ-VOUS À NOTRE NEWSLETTER
        </Typography>
        {!subscribed && !user
          && (
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
        {
          !subscribed && user
          && <button className={styles.buttonGrid} onClick={subscription}>M'abonner à la newsletter</button>
        }
        {subscribed
          && <Typography variant="h5">Inscription à la newsletter bien effectuée.</Typography>}
      </Container>
    );
  };

  return <FormController render={Form} validationRules={validationRules} />;
};

export default withApollo()(Newsletter);
