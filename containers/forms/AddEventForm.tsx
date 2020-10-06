import React, {useCallback, useEffect, useState} from "react"
import gql from "graphql-tag"
import {withApollo} from "hoc/withApollo"
import {Container, Grid, makeStyles, TextField, Typography,} from "@material-ui/core"
import ClassicButton from "components/buttons/ClassicButton"
import FormController, {RenderCallback} from "components/controllers/FormController"
import {useMutation, useQuery} from "@apollo/react-hooks"
import useGraphQLErrorDisplay from "hooks/useGraphQLErrorDisplay"
import Checkbox from '@material-ui/core/Checkbox';
import useCookieRedirection from "hooks/useCookieRedirection"
import {useSnackbar} from 'notistack';
import GooglePlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import {useSessionState} from "../../context/session/session";
import {useRouter} from "next/router";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from "@material-ui/core/Collapse/Collapse";
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  field: {
    marginBottom: theme.spacing(3),
  },
  datetime: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  categories: {
    '& span': {
      fontWeight: "100",
    },
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
        border: "solid 1px lightgray",
      },
      '&:focus': {
        border: "solid 1px lightgray",
      },
      '&:active': {
        border: "solid 1px lightgray",
      },
    },
  },
}))

const ADDEVENT = gql`
  mutation createEvent(
    $eventInfos: EventInfos,$actorId: Int!$userId: Int!
  ) {
    createEvent(
      eventInfos: $eventInfos,actorId: $actorId,userId: $userId
    ) {
        id,
      label
      shortDescription
      facebookUrl
      description
      startedAt
      endedAt
      published
      lat
      lng
    }
  }
`;

const GET_CATEGORIES = gql`
query categories {
  categories {
    id,
    label,
    activated
    subCategories {
      id
      label
      icon
    }
  }
}
`;

const AddEventForm = ({actorId}) => {
  const Form: RenderCallback = (props) => {

    const { formChangeHandler, formValues, validationResult } = props
    const [addEvent, {data, error}] = useMutation(ADDEVENT)
    const {data: categoryData, loading: categoryLoading, error: categoryError} = useQuery(
      GET_CATEGORIES
    )
    useGraphQLErrorDisplay(error)
    const styles = useStyles()
    const redirect = useCookieRedirection()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const user = useSessionState()
      const router = useRouter()
    const [state, setState] = React.useState({})
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")

    const [selectedStartDate, setSelectedStartDate] = React.useState<Date | null>(
        new Date(),
    );
    const [selectedEndDate, setSelectedEndDate] = React.useState<Date | null>(
        new Date(),
    );

    const handleStartDateChange = (date: Date | null) => {
      setSelectedStartDate(date);
    };
    const handleEndDateChange = (date: Date | null) => {
      setSelectedEndDate(date);
    };

    const validateFields = useCallback(() => {
      if (formValues.shortDescription && formValues.shortDescription.length > 240) return false
      // check if at least one checkbox is checked
      if (!(formValues.categories && formValues.categories.length > 0)) return false
      if (!address && !city) return false
      if (selectedStartDate&& selectedEndDate &&  (selectedStartDate >= selectedEndDate)) return false
      // detail error cases
      return true
    }, [formValues, state, address, city])

    const handleChange = (category: any, event: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [category.id.toString()]: event.target.checked });
    }
    const [checked, setChecked] = useState([0]);
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
      setAddress((getObjectLongName(results, "street_number") + " " + getObjectLongName(results, "route")).trim())
      setCity(getObjectLongName(results, "locality"))
      formValues.postCode = getObjectLongName(results, "postal_code")
    }

    useEffect(() => {
      if(data) {
        enqueueSnackbar("Événement créé avec succès.", {
          preventDuplicate: true,
        })
          router.push('/event/'+data.createEvent.id)
      }
    },[data]);


    const submitHandler = () => {
      const checkboxes = Object.keys(state)
      let categoriesArray: number[]
      categoriesArray = []
      checkboxes.forEach( key => {
        if (state[key])
          categoriesArray.push(parseInt(key))
      })
      addEvent({
        variables: {
          eventInfos: {
            label: formValues.label,
            shortDescription: formValues.shortDescription,
            facebookUrl: formValues.facebookUrl,
            description: formValues.description,
            startedAt: selectedStartDate,
            endedAt: selectedEndDate,
            published: false,
            categories: formValues.categories,
            lat: parseFloat(formValues.lat),
            lng: parseFloat(formValues.lng),
            address: address,
            postCode: formValues.postCode,
            city: city,

          },
          actorId:parseInt(actorId),
          userId:parseInt(user.id)
        },
      })


    }

    return (
      <Container component="main" maxWidth="sm">
        <Typography 
          className={styles.field}
          color='secondary' 
          variant='h6'
        >
          Ajouter un événement
        </Typography>
        <TextField
          className={styles.field}
          variant="outlined"
          value={formValues.label}
          label="Nom de l'événement"
          name="label"
          onChange={formChangeHandler}
          defaultValue=""
          fullWidth
          required
        />
        <TextField
          className={styles.field}
          variant="outlined"
          value={formValues.facebookUrl}
          label="Lien Facebook de l'événement"
          name="facebookUrl"
          onChange={formChangeHandler}
          defaultValue=""
          fullWidth
        />
        <TextField
          className={styles.field}
          variant="outlined"
          value={formValues.shortDescription}
          label="Description courte"
          name="shortDescription"
          onChange={formChangeHandler}
          defaultValue=""
          fullWidth
          multiline
          rows={3}
        />
        <TextField
          className={styles.field}
          variant="outlined"
          value={formValues.description}
          label="Description détaillée"
          placeholder="Parlez-nous de l'événement, les thèmes abordés, le format, les intervenants..."
          name="description"
          onChange={formChangeHandler}
          defaultValue=""
          fullWidth
          multiline
          rows={6}
        />
        <Grid className={styles.datetime}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date de début"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
            />
            <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Heure de début"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
            />
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date de fin"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
            />
            <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Heure de fin"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
            />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid>
          <Typography>Catégorie(s) de l'événement</Typography>
          <List  className={styles.field}>
            {typeof categoryData !== "undefined" && categoryData.categories.map((category, index) => {
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
        </Grid>
        <Grid className={styles.location}>
          <Typography>Lieu</Typography>
          <GooglePlacesAutocomplete
            placeholder="Taper et sélectionner l'adresse"
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
        <ClassicButton
          fullWidth
          variant="contained"
          className={styles.submit}
          onClick={submitHandler}
          disabled={!validateFields()}
        >
          Créer cet événement
        </ClassicButton>
      </Container>
    )
  }
  

  return (
    <FormController 
      render={Form} 
      // validationRules={validationRules} 
    />
  )
}

export default withApollo()(AddEventForm)
