/* eslint react/prop-types: 0 */
import React, { ChangeEvent,useState } from "react"
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
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress,getLatLng} from 'react-google-places-autocomplete';
import {useQuery} from "@apollo/react-hooks";
import TreeView from "@material-ui/lab/TreeView/TreeView";
import graphqlTag from 'graphql-tag'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

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
              value={value}
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


    <Grid
      container
      alignItems="center"
      spacing={3}
      className={styles.gridContainer}
    >
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
      <Grid item sm={3} xs={12}>
        <Typography variant="body1" color="primary" className={styles.label}>
         Adresse :
        </Typography>
      </Grid>
      <Grid item sm={9} xs={12}>
        <GooglePlacesAutocomplete
            placeholder="Taper et selectionner l'adresse"
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
      </Grid>



      <Grid item sm={3} xs={12}>
        <Typography variant="body1" color="primary" className={styles.label}>
          Categorie(s) :
        </Typography>
      </Grid>
      <Grid item sm={9} xs={12}>
        <List>
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
                                        <ListItem button className={classes.nested}>
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
      </Grid>
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
      query: CREATE_ACTOR,
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
