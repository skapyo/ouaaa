import React, {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'hoc/withApollo';
import {
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import ClassicButton from 'components/buttons/ClassicButton';
import FormController, {
  RenderCallback,
  ValidationRules,
  ValidationRuleType,
} from 'components/controllers/FormController';
import { useMutation, useQuery } from '@apollo/client';
import useGraphQLErrorDisplay from 'hooks/useGraphQLErrorDisplay';
import Checkbox from '@material-ui/core/Checkbox';
import useCookieRedirection from 'hooks/useCookieRedirection';
import { useSnackbar } from 'notistack';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';
import { useRouter } from 'next/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import DateFnsUtils from '@date-io/date-fns';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import TreeView from '@material-ui/lab/TreeView';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'moment';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CustomRadioGroup from 'components/form/CustomRadioGroup';
import Entries from './Entries';
import { useSessionState } from '../../context/session/session';
import StyledTreeItem from '../../components/filters/StyledTreeItem';
import RadioGroupForContext from './RadioGroupForContext';

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
  },
  label: {
    fontWeight: 600,
  },
  collectionLabel: {
    textAlign: 'center',
    color: '#bf083e',
  },
  rootTree: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  treeParent: {
    border: '1px solid #ccc!important',
    padding: '5px 0 5px 0',
  },
}));

const isEntriesWithInformationContains: Function = (entriesWithInformationArray: Array<Object>, id : number) => {
  let existingEntryInformation;
  let index = 0;
  entriesWithInformationArray.map(
    (linkDescription) => {
      index += 1;
      // @ts-ignore
      if (linkDescription.entryId === id) {
        existingEntryInformation = linkDescription;
      }
      return '';
    },
  );
  if (existingEntryInformation !== undefined) {
    return true;
  }
  return false;
};

const ADDEVENT = gql`
  mutation createEvent(
    $eventInfos: EventInfos
    $actorId: Int!
    $userId: Int!
    $description: String!
  ) {
    createEvent(
      eventInfos: $eventInfos
      actorId: $actorId
      userId: $userId
      description: $description
    ) {
      id
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
      id
      label
      activated
      subCategories {
        id
        label
        icon
      }
    }
  }
`;
const GET_COLLECTIONS = gql`
  {
    collections {
      id
      code
      label
      multipleSelection
      position
      actor
      event
      entries {
        id
        label
        subEntries {
          id
          label
        }
      }
    }
  }
`;

type FormItemProps = {
  label: string;
  inputName: string;
  formChangeHandler: (event: ChangeEvent) => void;
  value: string;
  required: boolean;
  errorBool: boolean;
  errorText: string;
};

const FormItem = (props: FormItemProps) => {
  const styles = useStyles();
  const {
    label,
    inputName,
    formChangeHandler,
    value,
    required,
    errorBool,
    errorText,
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
    label,
    inputName,
    formChangeHandler,
    value,
    required,
    errorBool,
    errorText,
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
    },
  };
  function IsTree(collection) {
    let isTree = false;
    if (collection.entries) {
      collection.entries.map((entry) => {
        if (entry.subEntries) {
          entry.subEntries.map((subentry) => {
            isTree = true;
            return isTree;
          });
        }
      });
    }
    return isTree;
  }
  const Form: RenderCallback = ({
    formChangeHandler,
    validationResult,
    formValues,
  }) => {
    // const { formChangeHandler, formValues, validationResult } = props;
    const [addEvent, { data, error }] = useMutation(ADDEVENT);
    const {
      data: categoryData,
      loading: categoryLoading,
      error: categoryError,
    } = useQuery(GET_CATEGORIES);
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

    const [
      selectedStartDate,
      setSelectedStartDate,
    ] = React.useState<Date | null>(moment().add(1, 'hour').toDate());
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
      if (
        (selectedStartDate
          && selectedEndDate
          && selectedStartDate >= selectedEndDate)
        || (selectedStartDate && moment(selectedStartDate) <= moment())
        || !formValues.shortDescription
        || !formValues.categories
        || formValues.categories?.length === 0
        || (!address && !city)
      ) setValidated(false);
      else setValidated(true);
    });

    const editorRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);
    // @ts-ignore
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    useEffect(() => {
      // @ts-ignore
      editorRef.current = {
        CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
        ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
      };
      setEditorLoaded(true);
    }, []);

    const [descriptionEditor, setDescriptionEditor] = useState();

    const handleChange = (
      category: any,
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
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
      if (!results || !results[0] || !results[0].address_components) {
        return '';
      }
      const object = results[0].address_components.find(
        (element) => element.types.find((type) => type == name) != undefined,
      );
      if (object == undefined) {
        return '';
      }
      return object.long_name;
    };

    const getAddressDetails = (results) => {
      setAddress(
        `${getObjectLongName(results, 'street_number')} ${getObjectLongName(
          results,
          'route',
        )}`.trim(),
      );
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

    const [dataCollections, setDataCollections] = useState({});
    const { loading: loadingCollections, error: errorCollections } = useQuery(
      GET_COLLECTIONS,
      {
        fetchPolicy: 'network-only',
        onCompleted: (datac) => {
          setDataCollections(datac);
        },
      },
    );

    const submitHandler = () => {
      const checkboxes = Object.keys(state);
      let categoriesArray: number[];
      categoriesArray = [];
      checkboxes.forEach((key) => {
        if (state[key]) {
          categoriesArray.push(parseInt(key));
        }
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
          description: descriptionEditor.getData(),
        },
      });
    };

    return (
      <Container component="main" maxWidth="sm">
        <Typography className={styles.field} color="secondary" variant="h6">
          Ajouter un événement
        </Typography>
        <FormItem
          label="Nom de l'événement"
          inputName="label"
          formChangeHandler={formChangeHandler}
          value={formValues.label}
          required
          errorBool={
            !validationResult?.global && !!validationResult?.result.label
          }
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
          errorBool={
            !validationResult?.global
            && !!validationResult?.result.shortDescription
          }
          errorText={`Minimum 50 caractères. ${
            50 - formValues.shortDescription?.length
          } caractères restants minimum.`}
        />
        <Typography variant="body1" color="primary" className={styles.label}>
          Description :
        </Typography>
        <p />
        {editorLoaded ? (
          <CKEditor
            editor={ClassicEditor}
            data={formValues.description}
            onReady={(editor) => {
              setDescriptionEditor(editor);
            }}
          />
        ) : (
          <div>Editor loading</div>
        )}
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
                error={
                  !!selectedStartDate
                  && moment(selectedStartDate) <= moment(Date.now())
                }
                helperText={
                  selectedStartDate
                  && moment(selectedStartDate) <= moment(Date.now())
                    ? 'La date de début ne peut être dans le passé.'
                    : ''
                }
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
                error={
                  !!selectedStartDate && moment(selectedStartDate) <= moment()
                }
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
                error={
                  !!selectedStartDate
                  && !!selectedEndDate
                  && moment(selectedStartDate) >= moment(selectedEndDate)
                }
                helperText={
                  selectedStartDate
                  && selectedEndDate
                  && selectedStartDate >= selectedEndDate
                    ? 'La date de fin doit être après la date de début.'
                    : ''
                }
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
                error={
                  !!selectedStartDate
                  && !!selectedEndDate
                  && moment(selectedStartDate) >= moment(selectedEndDate)
                }
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        {
          /* @ts-ignore */
          dataCollections.collections
            /* @ts-ignore */
            && dataCollections.collections.map((collection) => {
              if (!collection.event) return '';
              if (collection.code === 'larochelle_quarter') return '';
              //    const [display, setDisplay] = useState(false);
              let { label } = collection;
              let helperText = '';
              if (collection.code === 'category') {
                label = 'Choisissez les sous-sujets dans lesquels vous souhaitez apparaître (en priorité)';
                helperText = 'Vous avez la possibilité d’ajouter un texte libre pour expliquer votre lien au sujet choisi. Vous pouvez sélectionner autant de sujet que nécessaire, les 3 premiers serviront à référencer votre page dans les moteurs de recherches info bulle : expliquant les ensemble et les sujets qu’ils contiennent aisni que les liens avec les sous-sujets et pourquoi pas ODD / transiscope. Ces infos bulles sont aussi visible dans le filtre sur la carte pour aider les usagers de Ouaaa à filtrer leur recherche';
              } else if (collection.code === 'actor_status') {
                label = 'Quel est votre statut ?';
                helperText = 'service public : toutes les collectivités, mairies, cda, cdc participant directement ou via des projets à la transition / ex : la rochelle territoire zéro carbone entreprise : tous les acteurs économiques de la transition, de l’economie sociale et solidaire... association & ONG  : toutes les structures à but non lucratif';
              } else if (collection.code === 'public_target') {
                label = 'Quel public visez vous principalement dans vos actions ?';
                helperText = 'Ici nous vous proposons de choisir votre public principal. Bien sur à chaque action (evenement, campagne…) que vous créerez vous pourrez indiquer des publics différents de votre public principal.';
              } else if (collection.code === 'collectif') {
                label = 'En tant qu’acteur, je fais partie des collectifs & réseaux suivants :';
                helperText = 'Sont référencés ici des collectifs et réseaux locaux. Les groupes locaux de réseaux nationaux (ex Greenpeace) ne sont pas incluent dans cette liste';
              } else if (collection.code === 'actor_location_action') {
                label = "Territoire d'action (1 seul choix) *";
                helperText = 'un acteur n’est pas à côté de chez vous mais peut être se déplace-t-il dans votre zone pour le savoir cocher cette case pour faire apparaître les zones d’actions';
              }

              return (
                <div>
                  <br />
                  <Typography className={styles.collectionLabel}>
                    {label}
                    {' '}
                    {helperText !== '' && (
                      <Tooltip title={helperText}>
                        <InfoIcon />
                      </Tooltip>
                    )}
                  </Typography>
                  <br />
                  {
                    // display &&
                    IsTree(collection) && (
                      <Entries initValues={[]}>
                        <TreeView
                          className={styles.rootTree}
                          defaultCollapseIcon={<ArrowDropDownIcon />}
                          defaultExpandIcon={<ArrowRightIcon />}
                          defaultEndIcon={<div style={{ width: 24 }} />}
                        >
                          {collection.entries
                            && collection.entries.map((entry) => {
                              return (
                                // @ts-ignore
                                <StyledTreeItem
                                  key={entry.id}
                                  nodeId={entry.id}
                                  labelText={entry.label}
                                  hideCheckBox
                                  isForm
                                  className={styles.treeParent}
                                >
                                  {entry.subEntries
                                    && entry.subEntries.map((subEntry) => {
                                      return (
                                        <StyledTreeItem
                                          key={subEntry.id}
                                          // @ts-ignore
                                          nodeId={subEntry.id}
                                          labelText={subEntry.label}
                                          categoryChange={formChangeHandler}
                                          isForm
                                          checked={
                                            formValues
                                            && formValues.entriesWithInformation
                                            && isEntriesWithInformationContains(formValues.entriesWithInformation, subEntry.id)
                                          }
                                        />
                                      );
                                    })}
                                </StyledTreeItem>
                              );
                            })}
                        </TreeView>
                      </Entries>
                    )
                  }

                  {
                    // display &&
                    !IsTree(collection) && collection.multipleSelection && (
                      <List>
                        {collection.entries
                          && collection.entries.map((entry) => {
                            return (
                              <ListItem key={entry.id} role={undefined} dense>
                                <ListItemText primary={entry.label} />
                                <Checkbox
                                  edge="start"
                                  tabIndex={-1}
                                  disableRipple
                                  onChange={formChangeHandler}
                                  name="entries"
                                  value={entry.id}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </ListItem>
                            );
                          })}
                      </List>
                    )
                  }
                  {
                    // display &&
                    !IsTree(collection) && !collection.multipleSelection && (
                      <RadioGroupForContext initValue={' '}>
                        <CustomRadioGroup
                          formChangeHandler={formChangeHandler}
                          collection={collection}
                        />
                      </RadioGroupForContext>

                    )
                  }
                </div>
              );
            })
        }
        <Grid className={styles.location}>
          <Typography>Lieu</Typography>
          <GooglePlacesAutocomplete
            placeholder="Taper et sélectionner l'adresse*"
            initialValue={
              formValues.address
              && formValues.address
                .concat(' ')
                .concat(formValues.postCode)
                .concat(' ')
                .concat(formValues.city)
            }
            onSelect={({ description }) => geocodeByAddress(description).then((results) => {
              getLatLng(results[0])
                .then((value) => {
                  formValues.lat = `${value.lat}`;
                  formValues.lng = `${value.lng}`;
                })
                .catch((error) => console.error(error));
              getAddressDetails(results);
            })}
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

  return <FormController render={Form} validationRules={validationRules} />;
};

export default withApollo()(AddEventForm);
