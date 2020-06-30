import React, { useContext } from "react"
import gql from "graphql-tag"
import FormController, {
  ValidationRules,
  ValidationRuleType,
  QueryOptions,
} from "components/controllers/FormController"
import { withApollo } from "hoc/withApollo"
import { useState, useCallback } from "react"
import ResetPasswordEmailForm from "containers/forms/ResetPassword/subForms/SendResetPsswdEmailForm"
import ValidateEmailCodeForm from "./subForms/ValidateEmailCodeForm"
import { Container, Box, Avatar, Typography } from "@material-ui/core"
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    marginBottom: theme.spacing(3),
  },
}))

const ResetPasswordFormLayout = ({ children }: { children: JSX.Element }) => {
  const styles = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <Box
        marginTop={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Avatar className={styles.avatar}>
          <VpnKeyOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={styles.title}>
          Mot de passe perdu
        </Typography>
        {children}
      </Box>
    </Container>
  )
}

/* Reset password email form : step 0*/
const SEND_PASSWORD_RESET_EMAIL = gql`
  mutation sendResetPasswordEmail($formValues: ResetPasswordInfos) {
    sendResetPasswordEmail(resetPasswordInfos: $formValues)
  }
`
const validationRules0: ValidationRules = {
  email: {
    rule: ValidationRuleType.email,
  },
}

/* -- */

/* reset code validation form : step 1*/
// const SEND_PASSWORD_RESET_EMAIL = gql`
//   mutation sendResetPasswordEmail($formValues: ResetPasswordInfos) {
//     sendResetPasswordEmail(resetPasswordInfos: $formValues)
//   }
// `
const validationRules1: ValidationRules = {
  input1: {
    rule: ValidationRuleType.only,
    type: "number",
  },
  input2: {
    rule: ValidationRuleType.only,
    type: "number",
  },
  input3: {
    rule: ValidationRuleType.only,
    type: "number",
  },
  input4: {
    rule: ValidationRuleType.only,
    type: "number",
  },
}

/* -- */

type EmailContext = {
  email: string | null
  codeId: number | null
}

export const EmailContext = React.createContext({
  email: null,
  codeId: null,
} as EmailContext)

const ResetPasswordForm = () => {
  /* state of the form
   * 0: init state > send reset password email form
   * 1: form to validate the code received in the reset password email
   * 2: form to reset the password
   */
  const [formState, setFormState] = useState<number>(0)

  const [context, setContext] = useState<EmailContext>({
    email: null,
    codeId: null,
  })

  const queryOptions0: QueryOptions = {
    query: SEND_PASSWORD_RESET_EMAIL,
    resultLabel: "sendResetPasswordEmail",
    snackbarSucceedMessage: "Un email vous a été envoyé.",
    afterResultControlCallback: useCallback(
      (formvalues, data, error) => {
        if (!error) {
          setFormState(1)
          setContext({
            email: formvalues.email,
            codeId: data.sendResetPasswordEmail,
          })
        }
      },
      [setFormState]
    ),
    mutationResultControl: "builtin",
  }

  // const setEmailContext = useCallback((formValues, data, error) => {
  //   const setEmail = useContext(SetEmailContext)
  //   // @ts-ignore
  //   setEmail(formValues.email)
  // }, [])

  return (
    <EmailContext.Provider value={context}>
      {/* <SetEmailContext.Provider value={setEmail}> */}
      {formState == 0 && (
        <ResetPasswordFormLayout>
          <FormController
            render={ResetPasswordEmailForm}
            validationRules={validationRules0}
            withQuery={true}
            queryOptions={queryOptions0}
            key="formController-0"
          />
        </ResetPasswordFormLayout>
      )}

      {formState == 1 && (
        <ResetPasswordFormLayout>
          <FormController
            render={ValidateEmailCodeForm}
            validationRules={validationRules1}
            // withQuery={true}
            // queryOptions={queryOptions1}
            key="formController-1"
          />
        </ResetPasswordFormLayout>
      )}
      {/* </SetEmailContext.Provider> */}
    </EmailContext.Provider>
  )

  // if (formState == 0)
  //   return (
  //     <ResetPasswordFormLayout>
  //       <FormController
  //         render={ResetPasswordEmailForm}
  //         validationRules={validationRules0}
  //         withQuery={true}
  //         queryOptions={queryOptions0}
  //         key="formController-0"
  //       />
  //     </ResetPasswordFormLayout>
  //   )

  // if (formState == 1)
  //   return (
  //     <ResetPasswordFormLayout>
  //       <FormController
  //         render={ValidateEmailCodeForm}
  //         validationRules={validationRules1}
  //         // withQuery={true}
  //         // queryOptions={queryOptions1}
  //         key="formController-1"
  //       />
  //     </ResetPasswordFormLayout>
  //   )
}

export default withApollo()(ResetPasswordForm)
