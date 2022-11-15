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
  Grid,
  IconButton,
  Container,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4, 4, 4),
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
  legal: {
    padding: theme.spacing(4, 0, 4, 0),
    textAlign: 'justify',
  },
  passwordRequirements: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(24),
    }
    
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
  rgpd: {
    rule: ValidationRuleType.required,
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
      if (data){

      if(data.register) {
        setClicked(true);
        enqueueSnackbar(
          `Un email de validation a été envoyé à ${formValues.email}`,
          {
            preventDuplicate: true,
          },
        );
        
      }else{
          enqueueSnackbar(
            `Le compte ${formValues.email} existe déjà vous pouvez vous connecter `,
            {
              preventDuplicate: true,
            },
          );
      }
    }
    }, [data, redirect]);

    return (
      <Grid container justify="center">
        <Grid xs={3} />
        <Grid className={styles.paper} xs={12} md={4}>
          {clicked && (
            <p style={{ textAlign: 'center' }}>
              Veuillez confirmer votre compte.
              <br />
              Un email de validation a été envoyé à : {/* @ts-ignore */}
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
            InputProps={{
              // <-- This is where the toggle button is added.
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
            InputProps={{
              // <-- This is where the toggle button is added.
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
          <FormControlLabel
            control={
              <Checkbox
                name="rgpd"
                color="primary"
                required
                onChange={formChangeHandler}
              />
            }
            label={<label>J'accepte que les données saisies soient utilisées par OUAAA pour vous contacter conformément à <a href="/legalmention">nos mentions légales </a>*</label>}
          />
          <div  className={styles.legal}>Les données personnelles relatives à la création du compte (nom/prénom, structure si
          professionnel, numéro de téléphone, email) sont destinées à permettre l’identification sur le site
          et l’accès à son compte et aux fonctionnalités correspondantes. Les données sont conservées
          tant que le compte est actif. Une fois par an, le responsable de traitement peut effectuer une
          campagne de vérification d’adresse mails pour supprimer les comptes inactifs après vérification
          par contact téléphonique

          Les fiches acteurs reliées à des comptes inactifs seront mises à jour avec la mention suivante :
          coordonnées obsolètes à telle date. Pour toute question, vous pouvez joindre l’administrateur du
          site à contact@ouaaa-transition.fr et exercer vos droits d’accès, de rectification ou de suppression
          aurprès du DPD à dpd@ouaaa-transition.fr
          </div>
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
              Déjà inscrit ?{/* @ts-ignore */}
              {' '}
              <Link href="/signin">Me connecter</Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={styles.passwordRequirements} xs={12} md={3}>
          <Box bgcolor="lightBox.main" p={2} borderRadius="10px">
            <Typography variant="h6">Mon mot de passe: </Typography>
            <br />
            <Typography
              color={
                checkPssdValidation('password', 'min') &&
                  checkPssdValidation('password', 'max')
                  ? 'primary'
                  : 'error'
              }
            >
              Doit contenir au moins 8 caractères
            </Typography>
            <Typography
              color={
                checkPssdValidation('password', 'uppercase')
                  ? 'primary'
                  : 'error'
              }
            >
              Doit posséder au moins une majuscule
            </Typography>
            <Typography
              color={
                checkPssdValidation('password', 'lowercase')
                  ? 'primary'
                  : 'error'
              }
            >
              Doit posséder au moins une minuscule
            </Typography>
            <Typography
              color={
                checkPssdValidation('password', 'digits')
                  ? 'primary'
                  : 'error'
              }
            >
              Doit posséder au moins un chiffre
            </Typography>
            <Typography
              color={
                checkPssdValidation('password', 'symbols')
                  ? 'primary'
                  : 'error'
              }
            >
              Doit posséder au moins caractère spécial
            </Typography>
            <Typography
              color={
                checkPssdValidation('password', 'spaces')
                  ? 'primary'
                  : 'error'
              }
            >
              Ne doit contenir aucun espace
            </Typography>
            <Typography
              color={
                checkPssdValidation('password2', 'equalTo') &&
                  formValues?.password?.length > 0
                  ? 'primary'
                  : 'error'
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
