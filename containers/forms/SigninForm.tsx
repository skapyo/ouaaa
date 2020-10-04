import gql from "graphql-tag"
import {withApollo} from "hoc/withApollo"
import FormController, {
    RenderCallback,
    ValidationRules,
    ValidationRuleType
} from "components/controllers/FormController"
import {
    Avatar,
    Box,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import ClassicButton from "components/buttons/ClassicButton"
import Link from "components/Link"
import {useMutation} from "@apollo/react-hooks"
import {useCallback, useEffect, useState} from "react"
import {useSessionDispatch} from "context/session/session"
import omitTypename from "utils/omitTypename"
import useGraphQLErrorDisplay from "hooks/useGraphQLErrorDisplay"
import useCookieRedirection from "hooks/useCookieRedirection"
import FallbackEmailNotValidated from "containers/fallbacks/FallbackEmailNotValidated"
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  box: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

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
`

const validationRules: ValidationRules = {
  email: {
    rule: ValidationRuleType.required,
  },
  password: {
    rule: ValidationRuleType.required,
  },
}

const SigninForm = () => {
  const Form: RenderCallback = (props) => {
    const { formChangeHandler, formValues, validationResult } = props

    const [signin, { data, error }] = useMutation(SIGNIN)
    useGraphQLErrorDisplay(error)
    const styles = useStyles()
    const [checkBoxChecked, setCheckBoxChecked] = useState(false)
    const [validEmail, setValidEmail] = useState(true)
    const sessionDispatch = useSessionDispatch()
    const redirect = useCookieRedirection()
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const checkBoxChangeHandler = useCallback(
      (e) => {
        setCheckBoxChecked(e.target.checked)
      },
      [setCheckBoxChecked]
    )

    const submitHandler2 = useCallback(() => {
      signin({
        variables: {
          email: formValues.email,
          password: formValues.password,
          persistentConnection: checkBoxChecked,
        },
      })
    }, [checkBoxChecked, formValues, signin])

    useEffect(() => {
      if (data && !data?.login?.isEmailValidated)
        setValidEmail(false)
      else if (data?.login?.id) {

        sessionDispatch({
          type: "login",
          payload: omitTypename(data.login),
        })
        redirect()
      }
    }, [data, sessionDispatch, redirect])

    if (!validEmail)
      return (<FallbackEmailNotValidated email={formValues?.email} />)
    else
      return (
        <Container component="main" maxWidth="xs">
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
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
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
                )
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
              onClick={submitHandler2}
              disabled={!validationResult?.global}
            >
              Se connecter
            </ClassicButton>
            <Grid container>
              <Grid item xs>

              </Grid>
              <Grid item>
                {/* @ts-ignore */}
                <Link href="/signup">Créer un compte</Link>
              </Grid>
            </Grid>
          </div>
        </Container>
      )
  }

  return <FormController render={Form} validationRules={validationRules} />
}

export default withApollo()(SigninForm)
