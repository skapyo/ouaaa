import gql from 'graphql-tag';
import { withApollo } from 'hoc/withApollo';
import FormController, {
  RenderCallback,
  ValidationRules,
  ValidationRuleType,
} from 'components/controllers/FormController';
import {
  Avatar,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ClassicButton from 'components/buttons/ClassicButton';
import { useRouter, withRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { useSessionDispatch } from 'context/session/session';
import omitTypename from 'utils/omitTypename';
import useGraphQLErrorDisplay from 'hooks/useGraphQLErrorDisplay';
import useCookieRedirection from 'hooks/useCookieRedirection';
import FallbackEmailNotValidated from 'containers/fallbacks/FallbackEmailNotValidated';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from '../../components/Link';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  box: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signup: {
    border: 'solid 1px #D96552',
    color: '#D96552',
    background: 'none',
    '&:hover': {
      background: 'none',
    },
  },
}));

const SIGNIN = gql`
  mutation login(
    $email: String!
    $password: String!
    $persistentConnection: Boolean!
  ) {
    login(
      email: $email
      password: $password
      persistentConnection: $persistentConnection
    ) {
      id
      surname
      lastname
      email
      role
      phone
      address
      postCode
      city
      isEmailValidated
    }
  }
`;

const validationRules: ValidationRules = {
  email: {
    rule: ValidationRuleType.required,
  },
  password: {
    rule: ValidationRuleType.required,
  },
};

const SigninForm = () => {
  const Form: RenderCallback = (props) => {
    const { formChangeHandler, formValues, validationResult } = props;

    const [checkBoxChecked, setCheckBoxChecked] = useState(false);
    const [validEmail, setValidEmail] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [signin, { data, error }] = useMutation(SIGNIN);
    const router = useRouter();
    useGraphQLErrorDisplay(error);
    const styles = useStyles();
    const sessionDispatch = useSessionDispatch();
    const redirect = useCookieRedirection();

    const toggleShowPassword = useCallback(() => {
      setShowPassword(!showPassword)
    }, [showPassword]);

    const checkBoxChangeHandler = useCallback(
      (e) => {
        setCheckBoxChecked(e.target.checked);
      },
      [setCheckBoxChecked],
    );

    const handleSignin = useCallback((evt) => {

      signin({
        variables: {
          email: formValues.email,
          password: formValues.password,
          persistentConnection: checkBoxChecked,
        },
      });
      evt.preventDefault();
      evt.stopPropagation();

    }, [checkBoxChecked, formValues, signin]);

    const handleClickSignup = useCallback(() => {
      router.push('/signup')
    }, [router]);

    useEffect(() => {
      if (data && !data?.login?.isEmailValidated) {
        setValidEmail(false);
      } else if (data?.login?.id) {
        sessionDispatch({
          type: 'login',
          payload: omitTypename(data.login),
        });
        redirect();
      }
    }, [data, sessionDispatch, redirect]);

    if (!validEmail)
      return <FallbackEmailNotValidated email={formValues?.email} />;

    return (
      <Container component="main" maxWidth="xs">
        <form onSubmit={handleSignin}>
          <div className={styles.paper}>
            <Avatar className={styles.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Connexion
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Adresse email"
              name="email"
              autoComplete="current-email"
              autoFocus
              defaultValue=""
              value={formValues?.email}
              onChange={formChangeHandler}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              defaultValue=""
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      onMouseDown={toggleShowPassword}
                      size="large">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formValues?.password}
              onChange={formChangeHandler}
            />
            <Box className={styles.box}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    onChange={checkBoxChangeHandler}
                  />
                }
                label="Se souvenir de moi"
              />
            </Box>
            <ClassicButton
              fullWidth
              variant="contained"
              className={styles.submit}
              onClick={handleSignin}
              disabled={!validationResult?.global}
              type="submit"
            >
              Se connecter
            </ClassicButton>
            <ClassicButton
              fullWidth
              variant="contained"
              className={styles.signup}
              onClick={handleClickSignup}
            >
              Créer un compte
            </ClassicButton>
            {/* @ts-ignore */}
            <Link href="/forgotPassword">Mot de passe oublié ?</Link>
          </div>
        </form>
      </Container>
    );
  };

  return <FormController render={Form} validationRules={validationRules} />;
};

export default withRouter(withApollo()(SigninForm));
