import React, {
  ChangeEvent, useCallback, useEffect, useRef, useState,
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import CustomRadioGroupForm from 'components/form/CustomRadioGroupForm';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Avatar from '@material-ui/core/Avatar';

import { getImageUrl } from 'utils/utils';
import IconButton from '@material-ui/core/IconButton';
import { Autocomplete } from '@material-ui/lab';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import ImagesDropZone from 'components/ImageCropper/ImagesDropZone';
import ImagesDisplay from 'components/ImageCropper/ImagesDisplay';
import Entries from './Entries';
import { useSessionState } from '../../context/session/session';
import StyledTreeItem from '../../components/filters/StyledTreeItem';
import RadioGroupForContext from './RadioGroupForContext';
import useImageReader from '../../hooks/useImageReader';
import useDnDStateManager from '../../hooks/useDnDStateManager';
import withDndProvider from '../../hoc/withDnDProvider';

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
  justify: {
    textAlign: 'justify',
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
    width: '100%',
  },
  container: {
    textAlign: 'center',
  },
}));

const isEntriesWithInformationContains: Function = (entriesWithInformationArray: Array<Object>, id: number) => {
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
    $practicalInfo: String
    $logoPictures: [InputPictureType]
    $mainPictures: [InputPictureType]
    $pictures: [InputPictureType]
  ) {
    createEvent(
      eventInfos: $eventInfos
      actorId: $actorId
      userId: $userId
      description: $description
      practicalInfo: $practicalInfo
      pictures: $pictures
      mainPictures: $mainPictures
      logoPictures: $logoPictures
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
      registerLink
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

const GET_ACTORS = gql`
query actors {
  actors {
    id
    name
    pictures {
      originalPicturePath
      logo
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
const GET_ACTOR = gql`
  query actor($id: String!) {
    actor(id: $id) {
      id
      name
      pictures {
        id
        label
        originalPicturePath
        originalPictureFilename
        croppedPicturePath
        croppedPictureFilename
        croppedX
        croppedY
        croppedZoom
        croppedRotation
        position
        logo
        main
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
      rule: ValidationRuleType.required && ValidationRuleType.maxLength,
      maxLimit: 90,
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

    const {
      data: actorsData,
      loading: actorsLoading,
      error: actorsError,
    } = useQuery(GET_ACTORS);

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
    const [showOtherActors, setShowOtherActors] = useState(false);
    const [showRegisterLink, setShowRegisterLink] = useState(false);

    const [actors] = useState([]);
    const [actorsId] = useState([]);
    const {
      loading: actorLoading,
      error: actorError,
      data: actorData,
    } = useQuery(GET_ACTOR, {
      variables: { id: actorId },
    });

    const [
      setImagesLogoList,
      loadingLogo,
      resultLogo,
      imagesLogoListState,
    ] = useImageReader();

    const onDropLogoHandler = useCallback(
      (files) => {

        // @ts-ignore
        setImagesLogoList(files);
      },
      [setImagesLogoList],
    );

    const {
      objectsList: objectsListLogo,
      moveObject: moveObjectLogo,
      findObject: findObjectLogo,
      updateActiveIndicator: updateActiveIndicatorLogo,
      updateDeletedIndicator: updateDeletedIndicatorLogo,
      initState: initStateLogo,
      addValues: addValuesLogo,
      updateKeyIndicator: updateKeyIndicatorLogo,
    } = useDnDStateManager([]);

    useEffect(() => {
      if (resultLogo) addValuesLogo(resultLogo);
      // @ts-ignore
    }, resultLogo);

    const [
      setImagesMainList,
      loadingMain,
      resultMain,
      imagesMainListState,
    ] = useImageReader();

    const onDropMainHandler = useCallback(
      (files) => {
        // @ts-ignore
        setImagesMainList(files);
      },
      [setImagesMainList],
    );
    const {
      objectsList: objectsListMain,
      moveObject: moveObjectMain,
      findObject: findObjectMain,
      updateActiveIndicator: updateActiveIndicatorMain,
      updateDeletedIndicator: updateDeletedIndicatorMain,
      initState: initStateMain,
      addValues: addValuesMain,
      updateKeyIndicator: updateKeyIndicatorMain,
    } = useDnDStateManager([]);

    useEffect(() => {
      if (resultMain) addValuesMain(resultMain);
      // @ts-ignore
    }, resultMain);

    const [setImagesList, loading, result, imagesListState] = useImageReader();

    const onDropHandler = useCallback(
      (files) => {
        // @ts-ignore
        setImagesList(files);
      },
      [setImagesList],
    );

    const {
      objectsList,
      moveObject,
      findObject,
      updateActiveIndicator,
      updateDeletedIndicator,
      initState,
      addValues,
      updateKeyIndicator,
    } = useDnDStateManager([]);

    useEffect(() => {
      if (result) addValues(result);
      // @ts-ignore
    }, result);

    const [
      selectedStartDate,
      setSelectedStartDate,
    ] = React.useState<Date | null>(moment().set('minute', 0).set('hour', 14).add(1, 'day')
      .toDate());
    const [selectedEndDate, setSelectedEndDate] = React.useState<Date | null>(
      moment().set('minute', 0).set('hour', 18).add(1, 'day')
        .toDate(),
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
        || !formValues.entries
        || formValues.entries?.length === 0
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
    const [practicalInfoEditor, setPracticalInfoEditor] = useState();

    
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
    const getLogo = (pictures) => {
      let logo;
      if (typeof pictures !== 'undefined') {
        pictures
          .sort((a, b) => (a.position > b.position ? 1 : -1))
          .map((picture, index) => {
            if (picture.logo) {
              logo = getImageUrl(picture.originalPicturePath);
            }
          });
      }
      return logo;
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
      let logoPictures;
      // @ts-ignore
      if (objectsListLogo) {
        logoPictures = objectsListLogo.map((object) => {
          // return object.file
          return {
            id: object.serverId,
            newpic: object.newpic,
            deleted: object.deleted,
            logo: true,
            file: {
              originalPicture: object.file,
              croppedPicture: object.croppedImg.file,
              croppedPictureModified: object.croppedImg.modified,
              croppedX: object.croppedImg.crop.x,
              croppedY: object.croppedImg.crop.y,
              croppedZoom: object.croppedImg.zoom,
              croppedRotation: object.croppedImg.rotation,
            },
          };
        });
      }
      let mainPictures;
      // @ts-ignore
      if (objectsListMain) {
        mainPictures = objectsListMain.map((object) => {
          // return object.file
          return {
            id: object.serverId,
            newpic: object.newpic,
            deleted: object.deleted,
            main: true,
            file: {
              originalPicture: object.file,
              croppedPicture: object.croppedImg.file,
              croppedPictureModified: object.croppedImg.modified,
              croppedX: object.croppedImg.crop.x,
              croppedY: object.croppedImg.crop.y,
              croppedZoom: object.croppedImg.zoom,
              croppedRotation: object.croppedImg.rotation,
            },
          };
        });
      }
      let pictures;
      // @ts-ignore
      if (objectsList) {
        pictures = objectsList.map((object) => {
          // return object.file
          return {
            id: object.serverId,
            newpic: object.newpic,
            deleted: object.deleted,
            file: {
              originalPicture: object.file,
              croppedPicture: object.croppedImg.file,
              croppedPictureModified: object.croppedImg.modified,
              croppedX: object.croppedImg.crop.x,
              croppedY: object.croppedImg.crop.y,
              croppedZoom: object.croppedImg.zoom,
              croppedRotation: object.croppedImg.rotation,
            },
          };
        });
      }

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
            entries: formValues.entries,
            lat: parseFloat(formValues.lat),
            lng: parseFloat(formValues.lng),
            address,
            postCode: formValues.postCode,
            city,
            registerLink: formValues.registerLink,
            categories: formValues.categories,
            actors: formValues.actors,
          },
          actorId: parseInt(actorId),
          userId: parseInt(user.id),
          // @ts-ignore
          description: descriptionEditor.getData(),
          // @ts-ignore
          practicalInfo: practicalInfoEditor.getData(),
          logoPictures,
          mainPictures,
          pictures,
        },
      });
    };

    const autocompleteHandler = (event, valueActor) => {
      let eventModified = event;
      
      /* @ts-ignore */
      actors.push(valueActor);
      /* @ts-ignore */
      actorsId.push(valueActor.id);
      eventModified.target.name = 'actors';
      eventModified.target.value = actorsId;
      formChangeHandler(eventModified);
      setShowOtherActors(false);
    };
    const handleAddActor = () => {
      setShowOtherActors(true);
    };

    return (
      <Container component="main" maxWidth="sm" className={styles.container}>
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
            if (collection.code === 'event_type') {
              label = 'Type d’action * (choix unique)';
              helperText = 'attention si vous proposez une action dans le cadre d’un festival, coché ici le type d’action et non la case festival. Vous pourrez plus loin dans le formulaire rattaché votre action au festival dans laquelle elle s’inclue';
            } else if (collection.code === 'category') {
              label = "Catégorie de l'événement";
              helperText = 'un événement peut traiter un sous-sujet non  associé au départ avec la page acteur. Vous pouvez choisir plusieurs sujets à rattacher à votre événement';
            }

            if (collection.code === 'event_price') return '';
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
                  IsTree(collection) && collection.multipleSelection && (
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
                  IsTree(collection) && !collection.multipleSelection && (
                    <Entries initValues={[]}>
                      <RadioGroupForContext initValue={' '}>
                        <TreeView
                          className={styles.rootTree}
                          defaultCollapseIcon={<ArrowDropDownIcon />}
                          defaultExpandIcon={<ArrowRightIcon />}
                          defaultEndIcon={<div style={{ width: 24 }} />}
                        >
                          <CustomRadioGroupForm
                            formChangeHandler={formChangeHandler}
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
                                          && entry.subEntries.map((entry) => {
                                            return (
                                              <FormControlLabel
                                                value={entry.id}
                                                control={<Radio />}
                                                label={entry.label}
                                              />
                                            );
                                          })}
                                </StyledTreeItem>
                              );
                            })}
                          </CustomRadioGroupForm>
                        </TreeView>
                      </RadioGroupForContext>
                    </Entries>
                  )
                }
                {// display &&
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
                        entries={collection.entries}
                      
                      />
                    </RadioGroupForContext>

                  )
                }

              </div>
            );
          })
        }
        <Grid className={styles.location}>
          <Typography>Adresse complète de l’événement *</Typography>
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
        <br />
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
            }
            if (collection.code !== 'event_price') return '';

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
                        entries={collection.entries}
                      />
                    </RadioGroupForContext>

                  )
                }
              </div>
            );
          })
        }
        <br />
        <Typography className={styles.collectionLabel}>
          Acteur(s) associé(s) à l’action
          {' '}
          <Tooltip title="Permet d’ajouter d’autres acteurs pour une action co-réalisée">
            <InfoIcon />
          </Tooltip>
        </Typography>
        <br />

        <Grid container>
          { actorData && (
          <Tooltip title={actorData.actor.name}>
            <Avatar alt={actorData.actor.name} src={getLogo(actorData.actor.pictures)} />
          </Tooltip>
          )}
          { actors && actors.map((actor) => (
            <div>
              {/* @ts-ignore */}
              <Tooltip title={actor.name}>
                {/* @ts-ignore */}
                <Avatar alt={actor.name} src={getLogo(actor.pictures)} />
              </Tooltip>
            </div>
          ))}
          <IconButton key="close" aria-label="Close" color="inherit" onClick={handleAddActor}>
            <AddCircleOutline />
          </IconButton>
        </Grid>

        {showOtherActors ? (
          <Autocomplete
            id="combo-box-demo"
            options={actorsData.actors}
                // @ts-ignore
            getOptionLabel={(option) => `${option.name} `}
            onChange={autocompleteHandler}
            style={{ width: 300 }}
                // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => (
              <TextField
                {...params}
                label="Acteurs"
                variant="outlined"
              />
            )}
          />
        ) : (
          ''
        )}
        <br />


        <Typography variant="body1" color="primary" className={styles.label}>
          Infos pratiques complément :
          {' '}
        </Typography>
        <p />
        {editorLoaded ? (
          <>
            <CKEditor
              editor={ClassicEditor}
              data={formValues.practicalInfo}
              onReady={(editor) => {
                setPracticalInfoEditor(editor);
              }}
            />

          </>
        ) : (
          <div>Editor loading</div>
        )}
        <br />
        <br />
        <Typography className={styles.collectionLabel}>
          Inscription à l’évement
          {' '}
        </Typography>
        <br />
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="register"
            name="register"
            onChange={formChangeHandler}
          >

            <p>
              <Grid container>
                <Grid item xs={11}>
                  <FormControlLabel
                    value="withoutLink"
                    control={<Radio />}
                    label="'Je participe à l’action' j’accepte que mes coordonnées soient transmises à l’acteur pour les infos concernant cette action"
                    onChange={() => setShowRegisterLink(false)}
                    className={styles.justify}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Tooltip title="Permet de récupérer les adresses mails et téléphones des gens, donc évite à l'utilisateur de remplir un formulaire">
                    <InfoIcon />
                  </Tooltip>
                </Grid>
              </Grid>
            </p>
            <FormControlLabel
              value="withLink"
              control={<Radio />}
              className={styles.justify}
              label="'Je participe à l’action'  envoie vers un Lien externe de l'événement valable si vous avez un formulaire plus précis que les fichier ouaaa (ex : stage, formation) ou billeterie en ligne"
              onChange={() => setShowRegisterLink(true)}
            />
            {showRegisterLink && (
              <FormItem
                label="Lien externe de participation à l'événement"
                inputName="registerLink"
                formChangeHandler={formChangeHandler}
                value={formValues.registerLink}
                required={false}
                errorBool={false}
                errorText=""
              />
            )}
          </RadioGroup>
        </FormControl>
        <p />
        <FormItem
          label="Lien externe de l'événement (Facebook ou site)"
          inputName="facebookUrl"
          formChangeHandler={formChangeHandler}
          value={formValues.facebookUrl}
          required={false}
          errorBool={false}
          errorText=""
        />
        <FormItem
          label="Description courte"
          inputName="shortDescription"
          formChangeHandler={formChangeHandler}
          value={formValues.shortDescription}
          required
          errorBool={
            !validationResult?.global
            && !!validationResult?.result.shortDescription
          }
          errorText={`Maximum 90 caractères. ${formValues.shortDescription?.length - 90
          } caractères en trop.`}
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
        <br />
        <Typography variant="body1" color="primary" className={styles.label}>
          Votre logo
        </Typography>
        {objectsListLogo ? (
          <ImagesDisplay
            cards={objectsListLogo}
            moveCard={moveObjectLogo}
            findCard={findObjectLogo}
            updateDeletedIndicator={updateDeletedIndicatorLogo}
            updateKeyIndicator={updateKeyIndicatorLogo}
          />
        ) : null}
        <ImagesDropZone
          onDropHandler={onDropLogoHandler}
          text="Déposez ici votre logo au format jpg"
        />
        <br />
        <Typography variant="body1" color="primary" className={styles.label}>
          Photo principale
        </Typography>
        {objectsListMain ? (
          <ImagesDisplay
            cards={objectsListMain}
            moveCard={moveObjectMain}
            findCard={findObjectMain}
            updateDeletedIndicator={updateDeletedIndicatorMain}
            updateKeyIndicator={updateKeyIndicatorMain}
          />
        ) : null}
        <ImagesDropZone
          onDropHandler={onDropMainHandler}
          text="Déposez ici votre photo principale au format jpg"
        />
        <br />
        <Typography variant="body1" color="primary" className={styles.label}>
          Autres photos
        </Typography>
        {objectsList ? (
          <ImagesDisplay
            cards={objectsList}
            moveCard={moveObject}
            findCard={findObject}
            updateDeletedIndicator={updateDeletedIndicator}
            updateKeyIndicator={updateKeyIndicator}
          />
        ) : null}
        <ImagesDropZone
          onDropHandler={onDropHandler}
          text="Déposez ici votre autres photos au format jpg"
        />

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

export default withDndProvider(withApollo()(AddEventForm));
function value(value: any) {
  throw new Error('Function not implemented.');
}
