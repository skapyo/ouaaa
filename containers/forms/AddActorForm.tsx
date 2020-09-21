/* eslint react/prop-types: 0 */
import React, { ChangeEvent,useState } from "react"
import {Grid, makeStyles, Typography, Theme, Container} from "@material-ui/core"
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
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import {useQuery} from "@apollo/react-hooks";
import TreeView from "@material-ui/lab/TreeView/TreeView";
import graphqlTag from 'graphql-tag'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { Redirect } from 'react-router-dom'
import {QueryOptions} from "../../components/controllers/FormController";

const CREATE_ACTOR = gql`
  mutation createActor($formValues: ActorInfos) {
    createActor(actorInfos: $formValues) {
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


const AddActorForm = () => {
  const user = useSessionState()
  const sessionDispatch = useSessionDispatch()
  const [latitude, setLatitude] = useState(false)
  const [longitude, setLongitude] = useState(false)

  const styles = useStyles()
  const [checked, setChecked] = useState([0]);
  const classes = useStyles();

    const {data,loading,error} = useQuery(GET_CATEGORIES,{fetchPolicy:"network-only"});
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
      setOpen(!open);
  };
  const Form: RenderCallback = ({
    formChangeHandler,
    submitHandler,
    isModified,
    formValues,
  }) => (


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
          value={formValues.website}
      />
      <FormItemTextareaAutosize
          label="Description"
          inputName="description"
          formChangeHandler={formChangeHandler}
          value={formValues.description}
      />
    <div  className={styles.field}>
            <GooglePlacesAutocomplete
                placeholder="Taper et sélectionner l'adresse"
                onSelect={({ description }) => (
                    geocodeByAddress(description).then(results => getLatLng(results[0]).then((value) => {
                      formValues['lat'] = ''+value.lat
                      formValues['lng'] = ''+value.lng
                    }))
                        .catch(error => console.error(error))
                    // setLatitude(.),
                    // setLongitude(description)
                )}


            />
    </div>




        <Typography variant="body1" color="primary" className={styles.label}>
          Selectionner une categorie :
        </Typography>


        <List  className={styles.field}>
            {typeof data !== "undefined" && data.categories.map((category, index) => {
                return (
                    <div>
                    <ListItem key={category.id} role={undefined} dense button onClick={handleToggle(0)}>
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText primary={category.label}/>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                        {typeof category.subCategories !== "undefined" && category.subCategories !=null && category.subCategories.map((subcategory, index) => {
                            return (
                                <Collapse in={open} timeout="auto" unmountOnExit>
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
                        })
                        }
                    </div>
                );
            })
            }

        </List>

      <Grid item xs={12}>
        <ClassicButton onClick={submitHandler} disabled={!isModified}>
          Sauvegarder les modifications
        </ClassicButton>
      </Grid>
      </Container>
    // )
  )

  const afterUpdate = useCallback(
    (formValues) => {
      debugger;
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
      initValues={user}
      withQuery={true}
      queryOptions={queryOptions}
    />
  )
}

export default withApollo()(AddActorForm);
