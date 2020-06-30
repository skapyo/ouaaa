import React, { useEffect, useState, useContext } from "react"
import { RenderCallback } from "components/controllers/FormController"
import { Grid, Typography, CircularProgress, Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import TextField from "components/TextField"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { EmailContext } from "containers/forms/ResetPassword/ResetPasswordForm"

const VALIDATE_RESET_PASSWORD_CODE = gql`
  mutation validateActionCode(
    $validateActionCodeInfos: ValidateActionCodeInfos
  ) {
    validateActionCode(validateActionCodeInfos: $validateActionCodeInfos)
  }
`

const useStyles = makeStyles((theme) => ({
  subTitle: {
    marginBottom: theme.spacing(3),
  },
}))

const ValidateEmailCodeForm: RenderCallback = (props) => {
  const { formChangeHandler, formValues, clearFormvalues } = props

  const context = useContext(EmailContext)

  const [validateCode, { data, loading, error }] = useMutation(
    VALIDATE_RESET_PASSWORD_CODE
  )
  const styles = useStyles()
  const [focusState, setFocusState] = useState<string>("input1")

  const input1Ref = React.createRef()
  const input2Ref = React.createRef()
  const input3Ref = React.createRef()
  const input4Ref = React.createRef()

  /* */
  useEffect(() => {
    // if formvalues is not empty
    if (Object.keys(formValues).length !== 0) {
      if (formValues.input1) setFocusState("input2")
      if (formValues.input2) setFocusState("input3")
      if (formValues.input3) setFocusState("input4")
      if (formValues.input4) setFocusState("")
    }
  }, [formValues])

  useEffect(() => {
    // @ts-ignore
    if (focusState === "input1") input1Ref.current.focus()
    // @ts-ignore
    if (focusState === "input2") input2Ref.current.focus()
    // @ts-ignore
    if (focusState === "input3") input3Ref.current.focus()
    // @ts-ignore
    if (focusState === "input4") input4Ref.current.focus()
  }, [focusState])

  useEffect(() => {
    if (focusState === "") {
      const code = "".concat(
        formValues.input1,
        formValues.input2,
        formValues.input3,
        formValues.input4
      )
      const intCode = parseInt(code, 10)

      validateCode({
        variables: {
          validateActionCodeInfos: {
            codeId: context.codeId,
            code: intCode,
          },
        },
      })
    }
  }, [focusState])

  useEffect(() => {
    if (data && !data.validateActionCode) {
      clearFormvalues()
      setFocusState("input1")
    }
  }, [data])

  return (
    <>
      <Typography variant="h6" className={styles.subTitle}>
        Entrez le code présent dans l'email:
      </Typography>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={3}>
          <TextField
            name="input1"
            inputProps={{ style: { textAlign: "center" } }}
            variant="outlined"
            InputLabelProps={{ shrink: false }}
            inputRef={input1Ref}
            value={formValues.input1 || ""}
            onChange={formChangeHandler}
            disabled={focusState === "input1" ? false : true}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="input2"
            inputProps={{ style: { textAlign: "center" } }}
            variant="outlined"
            InputLabelProps={{ shrink: false }}
            inputRef={input2Ref}
            value={formValues.input2 || ""}
            onChange={formChangeHandler}
            disabled={focusState === "input2" ? false : true}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="input3"
            inputProps={{ style: { textAlign: "center" } }}
            variant="outlined"
            InputLabelProps={{ shrink: false }}
            inputRef={input3Ref}
            value={formValues.input3 || ""}
            onChange={formChangeHandler}
            disabled={focusState === "input3" ? false : true}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="input4"
            inputProps={{ style: { textAlign: "center" } }}
            variant="outlined"
            InputLabelProps={{ shrink: false }}
            inputRef={input4Ref}
            value={formValues.input4 || ""}
            onChange={formChangeHandler}
            disabled={focusState === "input4" ? false : true}
          />
        </Grid>
      </Grid>
      {loading && (
        <Box mt={3}>
          <CircularProgress />
        </Box>
      )}
      {data && !data.validateActionCode && (
        <Box mt={3}>
          Le code renseigné n'est pas correct, veuillez réessayer.
        </Box>
      )}
    </>
  )
}

export default ValidateEmailCodeForm
