/* eslint react/prop-types: 0 */
import {ChangeEvent, useCallback, useMemo} from "react"
import {Grid, makeStyles, Typography} from "@material-ui/core"
import TextField from "components/form/TextField"
import ClassicButton from "components/buttons/ClassicButton"
import {withApollo} from "hoc/withApollo"
import {useSessionDispatch, useSessionState} from "context/session/session"
import gql from "graphql-tag"
import FormController, {RenderCallback,} from "components/controllers/FormController"

const UPDATE_USER_INFOS = gql`
  mutation updateUserInfos($formValues: UserInfos) {
    updateUserInfos(userInfos: $formValues) {
      id
      surname
      lastname
      email
      role
      phone
      address
      postCode
      city
    }
  }
`

const resultLabel = "updateUserInfos"

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
}

const FormItem = (props: FormItemProps) => {
  const styles = useStyles()
  const { label, inputName, formChangeHandler, value } = props
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
          value={value}
          label={label}
          name={inputName}
          onChange={formChangeHandler}
          defaultValue=""
        />
      </Grid>
    </>
  )
}

const UserInfosForm = () => {
  const user = useSessionState()
  const sessionDispatch = useSessionDispatch()

  const styles = useStyles()

  const Form: RenderCallback = ({
    formChangeHandler,
    submitHandler,
    isModified,
    formValues,
  }) => (
    <Grid
      container
      alignItems="center"
      spacing={3}
      className={styles.gridContainer}
    >
      <FormItem
        label="Prénom"
        inputName="surname"
        formChangeHandler={formChangeHandler}
        value={formValues.surname}
      />
      <FormItem
        label="Nom"
        inputName="lastname"
        formChangeHandler={formChangeHandler}
        value={formValues.lastname}
      />
      <FormItem
        label="Email"
        inputName="email"
        formChangeHandler={formChangeHandler}
        value={formValues.email}
      />
      <FormItem
        label="Téléphone"
        inputName="phone"
        formChangeHandler={formChangeHandler}
        value={formValues.phone}
      />
      <FormItem
        label="Adresse"
        inputName="address"
        formChangeHandler={formChangeHandler}
        value={formValues.address}
      />
      <FormItem
        label="Code postal"
        inputName="postCode"
        formChangeHandler={formChangeHandler}
        value={formValues.postCode}
      />
      <FormItem
        label="Ville"
        inputName="city"
        formChangeHandler={formChangeHandler}
        value={formValues.city}
      />

      <Grid item xs={12}>
        <ClassicButton onClick={submitHandler} disabled={!isModified}>
          Sauvegarder les modifications
        </ClassicButton>
      </Grid>
    </Grid>
    // )
  )

  const afterUpdate = useCallback(
    (formValues) => {
      sessionDispatch({
        type: "login",
        payload: formValues,
      })
    },
    [sessionDispatch]
  )

  const queryOptions = useMemo(() => {
    return {
      query: UPDATE_USER_INFOS,
      resultLabel: resultLabel,
      afterUpdate: afterUpdate,
    }
  }, [afterUpdate])

  return (
    <FormController
      render={Form}
      initValues={user}
      withQuery={true}
      queryOptions={queryOptions}
    />
  )
}

export default withApollo()(UserInfosForm)
