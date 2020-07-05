/* eslint react/prop-types: 0 */
import { ChangeEvent } from "react"
import { Grid, makeStyles, Typography, Theme } from "@material-ui/core"
import TextField from "components/form/TextField"
import ClassicButton from "components/buttons/ClassicButton"
import { withApollo } from "hoc/withApollo"
import { useSessionState, useSessionDispatch } from "context/session/session"
import gql from "graphql-tag"
import FormController, {
  RenderCallback,
} from "components/controllers/FormController"
import { useCallback, useMemo } from "react"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, TextareaAutosize  } from "@material-ui/core"
const UPDATE_USER_INFOS = gql`
  mutation updateAddActor($formValues: AddActor) {
    updateAddActor(userInfos: $formValues) {
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

const resultLabel = "updateAddActor"

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

const FormItemTextareaAutosize = (props: FormItemProps) => {
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
          <TextareaAutosize
              aria-label="minimum height"
              rowsMin={3}
              placeholder="Minimum 3 rows"
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


const AddActorForm = () => {
  const user = useSessionState()
  const sessionDispatch = useSessionDispatch()

  const styles = useStyles()
  const [checked, setChecked] = React.useState([0]);
  const classes = useStyles();

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
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
      <FormItem
          label="Site Internet"
          inputName="website"
          formChangeHandler={formChangeHandler}
          value={formValues.city}
      />
      <FormItem
          label="Site Internet"
          inputName="website"
          formChangeHandler={formChangeHandler}
          value={formValues.city}
      />
      <FormItemTextareaAutosize
          label="Description"
          inputName="description"
          formChangeHandler={formChangeHandler}
          value={formValues.city}
      />


      <List className={classes.root}>

              <ListItem key={0} role={undefined} dense button onClick={handleToggle(0)}>
                <ListItemIcon>
                  <Checkbox
                      edge="start"
                      checked={checked.indexOf(0) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': 0 }}
                  />
                </ListItemIcon>
                <ListItemText id={0} primary={`Agriculture`} />
              </ListItem>
            <ListItem key={1} role={undefined} dense button onClick={handleToggle(1)}>
              <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={checked.indexOf(1) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': 0 }}
                />
              </ListItemIcon>
              <ListItemText id={1} primary={`Alimentation`} />
            </ListItem>
      </List>

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

export default withApollo()(AddActorForm);
