/* eslint react/prop-types: 0 */
import React, {ChangeEvent, useCallback, useState} from "react"
import {Container, Grid, makeStyles, Typography} from "@material-ui/core"
import TextField from "components/form/TextField"
import ClassicButton from "components/buttons/ClassicButton"
import {withApollo} from "hoc/withApollo"
import {useSessionDispatch, useSessionState} from "context/session/session"
import gql from "graphql-tag"
import graphqlTag from "graphql-tag"
import FormController, {RenderCallback,} from "components/controllers/FormController"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import GooglePlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import {useQuery} from "@apollo/react-hooks";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import {Redirect} from 'react-router-dom'
import {QueryOptions, ValidationRules, ValidationRuleType} from "../../components/controllers/FormController";

const CREATE_ACTOR = gql`
  mutation createActor($formValues: ActorInfos,$userId: Int!) {
    createActor(actorInfos: $formValues,userId: $userId) {
      id
      name
      email
      phone
      address
      postCode
      city
      website
      description
      lat
      lng
    }
  }
`
const GET_CATEGORIES = graphqlTag`
    { categories
    {   id,
        label
        icon
        subCategories {
            label
            icon
                subCategories {
                label
                icon
                  subCategories {
                     label
                     icon
              }
          }
  }
    }
    }
`;

const resultLabel = "createActor"

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: theme.spacing(5),
  },
  label: {
    fontWeight: 600,
  },
  field: {
    marginBottom: theme.spacing(3),
    width:"100%!important"
  },
  location: {
    margin: "1em 0",
    '& input': {
      height: "3.5em",
      borderRadius: "4px",
      boxShadow: "none",
      border: "solid 1px lightgray",
      fontFamily: "Roboto",
      fontSize: "16px",
      width: "100%",
      '&:hover': {
        border: "solid 1px black",
      },
      '&:focus': {
        border: "solid 2px black",
      },
      '&:active': {
        border: "solid 2px black",
      },
    },
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
      <TextField
          className={styles.field}
        variant="outlined"
        value={value}
        label={label}
        name={inputName}
        onChange={formChangeHandler}
        defaultValue=""
        fullWidth
        required
      />
    </>
  )
}

const FormItemTextareaAutosize = (props: FormItemProps) => {
  const styles = useStyles()
  const { label, inputName, formChangeHandler, value } = props
  return (
      <>
      <TextField
          multiline
          rows={4}
          className={styles.field}
          variant="outlined"
          value={value}
          label={label}
          name={inputName}
          onChange={formChangeHandler}
          defaultValue=""
          fullWidth
          required
      />
      </>
  )
}

const validationRules: ValidationRules = {
  name: {
    rule: ValidationRuleType.required,
  },
  email: {
    rule: ValidationRuleType.required && ValidationRuleType.email,
  },
  description: {
    rule: ValidationRuleType.required,
  },
}

const AddActorForm = () => {
  const user = useSessionState()
  const sessionDispatch = useSessionDispatch()

  const styles = useStyles()
  const [checked, setChecked] = useState([0]);
  const classes = useStyles();

  const {data,loading,error} = useQuery(GET_CATEGORIES,{fetchPolicy:"network-only"});
  const [open, setOpen] = React.useState([false]);

  const handleToggle = (value: number, index: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    open[index]=!open[index];
  }

  const Form: RenderCallback = ({
    formChangeHandler,
    submitHandler,
    validationResult,
    formValues,
  }) => {
    const getObjectLongName = (results, name) => {
      if (!results || !results[0] || !results[0].address_components)
        return ("")
      let object = results[0].address_components.find((element) =>
        element.types.find(type => type == name) != undefined
      )
      if (object == undefined)
        return ("")
      return object.long_name
    }
  
    const getAddressDetails = (results) => {
      formValues.address = (getObjectLongName(results, "street_number") + " " + getObjectLongName(results, "route")).trim()
      formValues.city = getObjectLongName(results, "locality")
      formValues.postCode = getObjectLongName(results, "postal_code")
    }
    
    return (
      <Container component="main" maxWidth="sm">
        <FormItem
          label="Nom"
          inputName="name"
          formChangeHandler={formChangeHandler}
          value={formValues.name}
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
            label="Site Internet"
            inputName="website"
            formChangeHandler={formChangeHandler}
            value={formValues.website}
        />
        <FormItemTextareaAutosize
            label="Description"
            inputName="description"
            formChangeHandler={formChangeHandler}
            value={formValues.description}
        />
        <div  className={styles.field}>
        <Grid className={styles.location}>
          <GooglePlacesAutocomplete
            placeholder="Taper et sélectionner l'adresse *"
            initialValue={formValues.address && formValues.address.concat(" ").concat(formValues.postCode).concat(" ").concat(formValues.city)}
            onSelect={({ description }) => (
              geocodeByAddress(description).then(results => {
                getLatLng(results[0]).then((value) => {
                  formValues.lat = '' + value.lat
                  formValues.lng = '' + value.lng
                }).catch(error => console.error(error))
                getAddressDetails(results)
              })
            )}
          />
        </Grid>
        </div>

        <Typography variant="body1" color="primary" className={styles.label}>
          Sélectionner une catégorie :
        </Typography>
        <List  className={styles.field}>
          {typeof data !== "undefined" && data.categories.map((category, index) => {
            return (
              <div>
                <ListItem key={category.id} role={undefined} dense button onClick={handleToggle(0, index)}>
                  <ListItemIcon>
                  </ListItemIcon>
                  <ListItemText primary={category.label}/>
                  {open[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {typeof category.subCategories !== "undefined" && category.subCategories !=null && category.subCategories.map((subcategory, subIndex) => {
                  return (
                    <Collapse in={open[index]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItem button >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              tabIndex={-1}
                              disableRipple
                              onChange={formChangeHandler}
                              name="categories"
                              value={subcategory.id}
                            />
                          </ListItemIcon>
                          <ListItemText  primary={subcategory.label} />
                        </ListItem>
                      </List>
                    </Collapse>
                  );
                })}
              </div>
            );
          })
          }
        </List>

        <Grid item xs={12}>
          <ClassicButton 
            onClick={submitHandler} 
            disabled={!validationResult?.global}
          >
            Sauvegarder les modifications
          </ClassicButton>
        </Grid>
      </Container>
    )
  }

  const afterUpdate = useCallback(
    (formValues) => {
      <Redirect to='/' />
    },
    [sessionDispatch]
  )

  const queryOptions: QueryOptions = {
    query: CREATE_ACTOR,
    resultLabel: resultLabel,
    snackbarSucceedMessage: "Acteur ajouté avec succès.",
    mutationResultControl: "builtin",
    clearFormvaluesAfterControl:true
  }

  return (
    <FormController
      render={Form}
      withQuery={true}
      queryOptions={queryOptions}
      validationRules={validationRules}
    />
  )
}

export default withApollo()(AddActorForm);
