import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import gql from 'graphql-tag';
import {withApollo} from 'hoc/withApollo';
import {Container, Grid, makeStyles, TextField, Typography,} from '@material-ui/core';
import ClassicButton from 'components/buttons/ClassicButton';
import FormController, {
  RenderCallback,
  ValidationRules,
  ValidationRuleType,
} from 'components/controllers/FormController';
import {useMutation, useQuery} from '@apollo/client';
import useGraphQLErrorDisplay from 'hooks/useGraphQLErrorDisplay';
import Checkbox from '@material-ui/core/Checkbox';
import useCookieRedirection from 'hooks/useCookieRedirection';
import {useSnackbar} from 'notistack';
import GooglePlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import {useRouter} from 'next/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse/Collapse';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import moment from 'moment';
import {useSessionState} from '../../context/session/session';

const useStyles = makeStyles((theme) => ({
  field: {
    marginBottom: theme.spacing(3),
  },
  datetime: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  categories: {
    '& span': {
      fontWeight: '100',
    },
  },
  location: {
    margin: '1em 0',
    '& input': {
      height: '3.5em',
      borderRadius: '4px',
      boxShadow: 'none',
      border: 'solid 1px lightgray',
      fontFamily: 'Roboto',
      fontSize: '16px',
      width: '100%',
      '&:hover': {
        border: 'solid 1px lightgray',
      },
      '&:focus': {
        border: 'solid 1px lightgray',
      },
      '&:active': {
        border: 'solid 1px lightgray',
      },
    },
  },label: {
    fontWeight: 600,
  },
}));

const ADDEVENT = gql`
  mutation createEvent(
    $eventInfos: EventInfos,$actorId: Int!$userId: Int!,$description:String!
  ) {
    createEvent(
      eventInfos: $eventInfos,actorId: $actorId,userId: $userId,description:$description
    ) {
      id
      label
      short_description
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

type FormItemProps = {
  label: string
  inputName: string
  formChangeHandler: (event: ChangeEvent) => void
  value: string
  required:boolean
  errorBool: boolean
  errorText: string
}

const FormItem = (props: FormItemProps) => {
  const styles = useStyles();
  const {
    label, inputName, formChangeHandler, value, required, errorBool, errorText,
  } = props;
  return (
    <TextField
      className={styles.field}
      variant="outlined"
      value={value}
      label={label}
      name={inputName}
      onChange={formChangeHandler}
      defaultValue=""
      fullWidth
      required={required}
      error={errorBool}
      helperText={errorBool ? errorText : ''}
    />
  );
};

const FormItemTextareaAutosize = (props: FormItemProps) => {
  const styles = useStyles();
  const {
    label, inputName, formChangeHandler, value, required, errorBool, errorText,
  } = props;
  return (
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
      required={required}
      error={errorBool}
      helperText={errorBool ? errorText : ''}
    />
  );
};

const AddEventForm = ({ actorId }) => {
  const validationRules: ValidationRules = {
    label: {
      rule: ValidationRuleType.required,
    },
    shortDescription: {
      rule: ValidationRuleType.required && ValidationRuleType.minLength,
      minLimit: 50,
    }
  };

  const Form: RenderCallback = ({
    formChangeHandler,
    validationResult,
    formValues,
  }) => {
    // const { formChangeHandler, formValues, validationResult } = props;
    const [addEvent, { data, error }] = useMutation(ADDEVENT);
    const { data: categoryData, loading: categoryLoading, error: categoryError } = useQuery(
      GET_CATEGORIES,
    );
    useGraphQLErrorDisplay(error);
    const styles = useStyles();
    const redirect = useCookieRedirection();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const user = useSessionState();
    const router = useRouter();
    const [state, setState] = React.useState({});
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [validated, setValidated] = useState(false);

    const [selectedStartDate, setSelectedStartDate] = React.useState<Date | null>(
      moment().add(1, 'hour').toDate(),
    );
    const [selectedEndDate, setSelectedEndDate] = React.useState<Date | null>(
      moment().add(2, 'hour').toDate(),
    );

    const handleStartDateChange = (date: Date | null) => {
      setSelectedStartDate(date);
    };
    const handleEndDateChange = (date: Date | null) => {
      setSelectedEndDate(date);
    };

    useEffect(() => {
      if ((selectedStartDate && selectedEndDate && (selectedStartDate >= selectedEndDate))
          || (selectedStartDate && moment(selectedStartDate) <= moment())
          || !formValues.shortDescription
          || !formValues.categories
          || formValues.categories?.length === 0
          || (!address && !city)) setValidated(false);
      else setValidated(true);
    });

    const editorRef = useRef()
    const [ editorLoaded, setEditorLoaded ] = useState( false )
    // @ts-ignore
    const { CKEditor, ClassicEditor } = editorRef.current || {}

    useEffect( () => {
      // @ts-ignore
      editorRef.current = {
        CKEditor: require( '@ckeditor/ckeditor5-react' ).CKEditor,
        ClassicEditor: require( '@ckeditor/ckeditor5-build-classic' )

      }
      setEditorLoaded( true )
    }, [] )

    const [descriptionEditor, setDescriptionEditor] = useState()

    const handleChange = (category: any, event: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [category.id.toString()]: event.target.checked });
    };
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
      open[index] = !open[index];
    };

    const getObjectLongName = (results, name) => {
      if (!results || !results[0] || !results[0].address_components) { return (''); }
      const object = results[0].address_components.find((element) => element.types.find((type) => type == name) != undefined);
      if (object == undefined) { return (''); }
      return object.long_name;
    };

    const getAddressDetails = (results) => {
      setAddress((`${getObjectLongName(results, 'street_number')} ${getObjectLongName(results, 'route')}`).trim());
      setCity(getObjectLongName(results, 'locality'));
      formValues.postCode = getObjectLongName(results, 'postal_code');
    };

    useEffect(() => {
      if (data) {
        enqueueSnackbar('Événement créé avec succès.', {
          preventDuplicate: true,
        });
        router.push(`/event/${data.createEvent.id}`);
      }
    }, [data]);

    const submitHandler = () => {
      const checkboxes = Object.keys(state);
      let categoriesArray: number[];
      categoriesArray = [];
      checkboxes.forEach((key) => {
        if (state[key]) { categoriesArray.push(parseInt(key)); }
      });
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
            address,
            postCode: formValues.postCode,
            city,

          },
          actorId: parseInt(actorId),
          userId: parseInt(user.id),
          // @ts-ignore
          description:descriptionEditor.getData()
        },
      });
    };

    return (
      <Container component="main" maxWidth="sm">
        <Typography
          className={styles.field}
          color="secondary"
          variant="h6"
        >
          Ajouter un événement
        </Typography>
        <FormItem
          label="Nom de l'événement"
          inputName="label"
          formChangeHandler={formChangeHandler}
          value={formValues.label}
          required
          errorBool={!validationResult?.global && !!validationResult?.result.label}
          errorText="Nom de l'événement requis."
        />
        <FormItem
          label="Lien Facebook de l'événement"
          inputName="facebookUrl"
          formChangeHandler={formChangeHandler}
          value={formValues.facebookUrl}
          required={false}
          errorBool={false}
          errorText=""
        />
        <FormItemTextareaAutosize
          label="Description courte"
          inputName="shortDescription"
          formChangeHandler={formChangeHandler}
          value={formValues.shortDescription}
          required
          errorBool={!validationResult?.global && !!validationResult?.result.shortDescription}
          errorText={`Minimum 50 caractères. ${50 - formValues.shortDescription?.length} caractères restants minimum.`}
        />
        <Typography variant="body1" color="primary" className={styles.label}>
          Description :
        </Typography>
        <p></p>
        { editorLoaded ? (  <CKEditor
            editor={ ClassicEditor }
            data={formValues.description}
            onReady={ editor => {
              setDescriptionEditor(editor)
            } }

        />) : (
            <div>Editor loading</div>
        )
        }
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
                error={!!selectedStartDate && moment(selectedStartDate) <= moment(Date.now())}
                helperText={(selectedStartDate && moment(selectedStartDate) <= moment(Date.now())) ? 'La date de début ne peut être dans le passé.' : ''}
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
                ampm={false}
                minutesStep={5}
                error={!!selectedStartDate && (moment(selectedStartDate) <= moment())}
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
                error={!!selectedStartDate && !!selectedEndDate && (moment(selectedStartDate) >= moment(selectedEndDate))}
                helperText={selectedStartDate && selectedEndDate && (selectedStartDate >= selectedEndDate) ? 'La date de fin doit être après la date de début.' : ''}
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
                ampm={false}
                minutesStep={5}
                error={!!selectedStartDate && !!selectedEndDate && (moment(selectedStartDate) >= moment(selectedEndDate))}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid>
          <Typography>Catégorie(s) de l'événement *</Typography>
          <List className={styles.field}>
            {typeof categoryData !== 'undefined' && categoryData.categories.map((category, index) => (
              <div>
                <ListItem key={category.id} role={undefined} dense button onClick={handleToggle(0, index)}>
                  <ListItemIcon />
                  <ListItemText primary={category.label} />
                  {open[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {typeof category.subCategories !== 'undefined' && category.subCategories != null && category.subCategories.map((subcategory, subIndex) => (
                  <Collapse in={open[index]} timeout="auto" unmountOnExit>

                    <List component="div" disablePadding>
                      <ListItem button>
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
                        <ListItemText primary={subcategory.label} />
                      </ListItem>
                    </List>
                  </Collapse>
                ))}
              </div>
            ))}
          </List>
        </Grid>
        <Grid className={styles.location}>
          <Typography>Lieu</Typography>
          <GooglePlacesAutocomplete
            placeholder="Taper et sélectionner l'adresse*"
            initialValue={formValues.address && formValues.address.concat(' ').concat(formValues.postCode).concat(' ').concat(formValues.city)}
            onSelect={({ description }) => (
              geocodeByAddress(description).then((results) => {
                getLatLng(results[0]).then((value) => {
                  formValues.lat = `${value.lat}`;
                  formValues.lng = `${value.lng}`;
                }).catch((error) => console.error(error));
                getAddressDetails(results);
              })
            )}
          />
        </Grid>
        <ClassicButton
          fullWidth
          variant="contained"
          className={styles.submit}
          onClick={submitHandler}
          disabled={!validationResult?.global || !validated}
        >
          Créer cet événement
        </ClassicButton>
      </Container>
    );
  };

  return (
    <FormController
      render={Form}
      validationRules={validationRules}
    />
  );
};

export default withApollo()(AddEventForm);
