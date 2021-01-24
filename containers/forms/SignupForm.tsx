import gql from 'graphql-tag';
import { withApollo } from 'hoc/withApollo';
import FormController, {
  RenderCallback,
  ValidationRules,
  ValidationRuleType,
} from 'components/controllers/FormController';
import {
  Avatar, Box, Grid, IconButton, InputAdornment, makeStyles, TextField, Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ClassicButton from 'components/buttons/ClassicButton';
import Link from 'components/Link';
import { useMutation } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import useGraphQLErrorDisplay from 'hooks/useGraphQLErrorDisplay';
import useCookieRedirection from 'hooks/useCookieRedirection';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4, 4, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  passwordRequirements: {
    marginTop: theme.spacing(24),
  },
}));

const SIGNUP = gql`
  mutation register(
    $surname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    register(
      surname: $surname
      lastname: $lastname
      email: $email
      password: $password
    )
  }
`;

const validationRules: ValidationRules = {
  surname: {
    rule: ValidationRuleType.required,
  },
  lastname: {
    rule: ValidationRuleType.required,
  },
  email: {
    rule: ValidationRuleType.required && ValidationRuleType.email,
  },
  password: {
    rule: ValidationRuleType.required && ValidationRuleType.password,
  },
  password2: {
    rule: ValidationRuleType.required && ValidationRuleType.equalTo,
    field: 'password',
  },
};

const SignupForm = () => {
  const Form: RenderCallback = (props) => {
    const { formChangeHandler, formValues, validationResult } = props;

    const checkPssdValidation = useCallback(
      (field: string, validationRule: string) => {
        const fieldResult = validationResult?.result[field];
        if (fieldResult?.includes(validationRule)) return false;
        return true;
      },
      [validationResult],
    );

    const [signup, { data, error }] = useMutation(SIGNUP);
    useGraphQLErrorDisplay(error);
    const styles = useStyles();
    const redirect = useCookieRedirection();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [clicked, setClicked] = useState(false);
    const [email, setEmail] = useState('* email *');
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const submitHandler2 = useCallback(() => {
      signup({
        variables: {
          surname: formValues.surname,
          lastname: formValues.lastname,
          email: formValues.email,
          password: formValues.password,
        },
      });
      setEmail(formValues.email);
    }, [formValues, signup]);

    useEffect(() => {
      if (data?.register) {
        setClicked(true);
        enqueueSnackbar(`Un email de validation a été envoyé à ${formValues.email}`, {
          preventDuplicate: true,
        });
      }
    }, [data, redirect]);

    return (
      <Grid container justify="center">
        <Grid xs={3} />
        <Grid item className={styles.paper} xs={4}>
          {clicked
              && (
              <p style={{ textAlign: 'center' }}>
                Veuillez confirmer votre compte.
                <br />
                Un email de validation a été envoyé à :
                {/* @ts-ignore */}
                <b>{email}</b>
              </p>
              )}
          <Avatar className={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inscription
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Prénom"
            name="surname"
            autoFocus
            defaultValue=""
            value={formValues?.surname}
            onChange={formChangeHandler}
            disabled={clicked}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Nom"
            name="lastname"
            defaultValue=""
            value={formValues?.lastname}
            onChange={formChangeHandler}
            disabled={clicked}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Adresse email"
            name="email"
            autoComplete="current-email"
            defaultValue=""
            value={formValues?.email}
            onChange={formChangeHandler}
            disabled={clicked}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            defaultValue=""
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={formValues?.password}
            onChange={formChangeHandler}
            disabled={clicked}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirmation du mot de passe"
            type={showPassword ? 'text' : 'password'}
            defaultValue=""
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={formValues?.password2}
            onChange={formChangeHandler}
            disabled={clicked}
          />
          <ClassicButton
            fullWidth
            variant="contained"
            className={styles.submit}
            onClick={submitHandler2}
            disabled={!validationResult?.global || clicked}
          >
            S'inscrire
          </ClassicButton>
          <Grid container>
            <Grid item>
              {/* @ts-ignore */}
              Déjà inscrit ?
              {/* @ts-ignore */}
              <Link href="/signin">Me connecter</Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={styles.passwordRequirements} xs={3}>
          <Box bgcolor="lightBox.main" p={2} borderRadius="10px">
            <Typography variant="h6">Mon mot de passe: </Typography>
            <br />
            <Typography
              color={
                  checkPssdValidation('password', 'min')
                  && checkPssdValidation('password', 'max')
                    ? 'secondary'
                    : 'primary'
                }
            >
              Doit contenir au moins 8 caractères
            </Typography>
            <Typography
              color={
                  checkPssdValidation('password', 'uppercase')
                    ? 'secondary'
                    : 'primary'
                }
            >
              Doit posséder au moins une majuscule
            </Typography>
            <Typography
              color={
                  checkPssdValidation('password', 'lowercase')
                    ? 'secondary'
                    : 'primary'
                }
            >
              Doit posséder au moins une minuscule
            </Typography>
            <Typography
              color={
                  checkPssdValidation('password', 'digits')
                    ? 'secondary'
                    : 'primary'
                }
            >
              Doit posséder au moins un chiffre
            </Typography>
            <Typography
              color={
                  checkPssdValidation('password', 'symbols')
                    ? 'secondary'
                    : 'primary'
                }
            >
              Doit posséder au moins caractère spécial
            </Typography>
            <Typography
              color={
                  checkPssdValidation('password', 'spaces')
                    ? 'secondary'
                    : 'primary'
                }
            >
              Ne doit contenir aucun espace
            </Typography>
            <Typography
              color={
                  checkPssdValidation('password2', 'equalTo')
                  && formValues?.password?.length > 0
                    ? 'secondary'
                    : 'primary'
                }
            >
              Les deux mots de passe renseignés doivent être identiques
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  };
  return <FormController render={Form} validationRules={validationRules} />;
};

export default withApollo()(SignupForm);
