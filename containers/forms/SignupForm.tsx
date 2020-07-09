import gql from "graphql-tag"
import { withApollo } from "hoc/withApollo"
import FormController from "components/controllers/FormController"
import { makeStyles } from "@material-ui/core"
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Grid,
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import ClassicButton from "components/buttons/ClassicButton"
import Link from "components/Link"
import { useMutation } from "@apollo/react-hooks"
import { useCallback, useState, useEffect } from "react"
import useGraphQLErrorDisplay from "hooks/useGraphQLErrorDisplay"
import useCookieRedirection from "hooks/useCookieRedirection"
import { 
  ValidationRuleType, 
  ValidationRules,
  RenderCallback,
} from "components/controllers/FormController"

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const SIGNUP = gql`
  mutation register(
    $email: String!
    $password: String!
  ) {
    register(
      email: $email
      password: $password
    )
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

const SignupForm = () => {
  const Form: RenderCallback = (props) => {
    const { formChangeHandler, formValues, validationResult } = props

    const [signup, { data, error }] = useMutation(SIGNUP)
    useGraphQLErrorDisplay(error)
    const styles = useStyles()
    const redirect = useCookieRedirection()

    const submitHandler2 = useCallback(() => {
      signup({
        variables: {
          email: formValues.email,
          password: formValues.password,
        },
      })
    }, [formValues, signup])

    useEffect(() => {
      if (data?.register) {
        redirect()
      }
    }, [data, redirect])

    return (
      <Container component="main" maxWidth="xs">
        <div className={styles.paper}>
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
            label="Email Address"
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
            label="Password"
            type="password"
            defaultValue=""
            value={formValues?.password}
            onChange={formChangeHandler}
          />
          <ClassicButton
            fullWidth
            variant="contained"
            className={styles.submit}
            onClick={submitHandler2}
            disabled={!validationResult?.global}
          >
            S'inscrire
          </ClassicButton>
          <Grid container>
            <Grid item>
              {/* @ts-ignore */}
              <Link href="/signin">Me connecter</Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    )
  }

  return <FormController render={Form} validationRules={validationRules} />
}

export default withApollo()(SignupForm)
