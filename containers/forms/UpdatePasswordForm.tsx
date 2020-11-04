/* eslint react/prop-types: 0 */
import {ChangeEvent, useCallback} from "react"
import PropTypes from "prop-types"
import {Box, Grid, makeStyles, Typography} from "@material-ui/core"
import TextField from "components/form/TextField"
import ClassicButton from "components/buttons/ClassicButton"
import {withApollo} from "hoc/withApollo"
import gql from "graphql-tag"
import FormController, {
  RenderCallback,
  ValidationRules,
  ValidationRuleType,
} from "components/controllers/FormController"

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: theme.spacing(5),
  },
  label: {
    fontWeight: 600,
  },
}))

type FormItemProps = {
  label: string
  inputName: string
  formChangeHandler: (event: ChangeEvent) => void
  value: string
  autoComplete?: string
}

const FormItem = (props: FormItemProps) => {
  const { label, inputName, formChangeHandler, value, autoComplete } = props
  const styles = useStyles()

  return (
    <>
      <Grid item sm={3} xs={12}>
        <Typography variant="body1" color="primary" className={styles.label}>
          {label} :
        </Typography>
      </Grid>
      <Grid item sm={9} xs={12}>
        <TextField
          variant="outlined"
          type="password"
          defaultValue=""
          value={value}
          label={label}
          name={inputName}
          onChange={formChangeHandler}
          autoComplete={autoComplete}
        />
      </Grid>
    </>
  )
}

FormItem.propTypes = {
  formChangeHandler: PropTypes.func.isRequired,
  inputName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  autoComplete: PropTypes.string,
}

const validationRules: ValidationRules = {
  newPassword1: {
    rule: ValidationRuleType.password,
  },
  newPassword2: {
    rule: ValidationRuleType.equalTo,
    field: "newPassword1",
  },
}

const UPDATE_USER_PASSWORD = gql`
  mutation updateUserPassword($formValues: UpdatePasswordInfos,$userId: Int!) {
    updateUserPassword(updatePasswordInfos: $formValues,userId: $userId)
  }
`

const queryOptions = {
  query: UPDATE_USER_PASSWORD,
  mutationResultControl: 'builtin',
  resultLabel: "updateUserPassword",
  snackbarSucceedMessage: 'Mot de passe modifié avec succès.',
  clearAfterUpdate: true,
}

const UserInfosForm = () => {
  const styles = useStyles()

  const Form: RenderCallback = ({
    formChangeHandler,
    submitHandler,
    isModified,
    formValues,
    validationResult,
  }) => {
    const checkPssdValidation = useCallback(
      (field: string, validationRule: string) => {
        const fieldResult = validationResult?.result[field]
        if (fieldResult?.includes(validationRule)) return false
        return true
      },
      [validationResult]
    )

    return (
      <Grid container>
        <Grid item lg={7}>
          <Grid
            container
            alignItems="center"
            // justify='center'
            spacing={3}
            className={styles.gridContainer}
          >
            <FormItem
              label="Nouveau mot de passe"
              inputName="newPassword1"
              formChangeHandler={formChangeHandler}
              value={formValues.newPassword1}
              autoComplete="new-password"
            />
            <FormItem
              label="Confirmation"
              inputName="newPassword2"
              formChangeHandler={formChangeHandler}
              value={formValues.newPassword2}
            />

            <Grid item xs={12}>
              <ClassicButton
                onClick={submitHandler}
                disabled={!isModified || !validationResult?.global}
              >
                Changer de mot de passe
              </ClassicButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={5}>
          <Box bgcolor="lightBox.main" p={2} borderRadius="10px">
            <Typography variant="h6">Mon nouveau mot de passe: </Typography>
            <br />
            <Typography
              color={
                checkPssdValidation("newPassword1", "min") &&
                checkPssdValidation("newPassword1", "max")
                  ? "secondary"
                  : "primary"
              }
            >
              Doit contenir entre 8 et 15 caractères
            </Typography>
            <Typography
              color={
                checkPssdValidation("newPassword1", "uppercase")
                  ? "secondary"
                  : "primary"
              }
            >
              Doit posséder au moins une majuscule
            </Typography>
            <Typography
              color={
                checkPssdValidation("newPassword1", "lowercase")
                  ? "secondary"
                  : "primary"
              }
            >
              Doit posséder au moins une minuscule
            </Typography>
            <Typography
              color={
                checkPssdValidation("newPassword1", "digits")
                  ? "secondary"
                  : "primary"
              }
            >
              Doit posséder au moins un chiffre
            </Typography>
            <Typography
              color={
                checkPssdValidation("newPassword1", "symbols")
                  ? "secondary"
                  : "primary"
              }
            >
              Doit posséder au moins caractère spécial
            </Typography>
            <Typography
              color={
                checkPssdValidation("newPassword1", "spaces")
                  ? "secondary"
                  : "primary"
              }
            >
              Ne doit contenir aucun espace
            </Typography>
            <br />
            <Typography variant="h6">Confirmation: </Typography>
            <br />
            <Typography
              color={
                checkPssdValidation("newPassword2", "equalTo") &&
                formValues?.newPassword1?.length > 0
                  ? "secondary"
                  : "primary"
              }
            >
              Les deux mots de passe renseignés doivent être identiques
            </Typography>
            {/* <Typography>Les deux mots de passe renseigné doivent être identiques</Typography> */}
          </Box>
        </Grid>
      </Grid>
    )
  }


  return (
    <FormController
      render={Form}
      withQuery={true}
        // @ts-ignore
      queryOptions={queryOptions}
      validationRules={validationRules}
    />
  )
}

export default withApollo()(UserInfosForm)
