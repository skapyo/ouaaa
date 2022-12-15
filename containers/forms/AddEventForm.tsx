import React, {
  ChangeEvent, useCallback, useEffect, useRef, useState,
} from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'hoc/withApollo';
import { Container, Grid, TextField, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import frLocale from 'date-fns/locale/fr';
import ClassicButton from 'components/buttons/ClassicButton';
import FormController, {
  RenderCallback,
  ValidationRules,
  ValidationRuleType,
} from 'components/controllers/FormController';
import { useMutation, useQuery } from '@apollo/client';
import useGraphQLErrorDisplay from 'hooks/useGraphQLErrorDisplay';
import Checkbox from '@mui/material/Checkbox';
import useCookieRedirection from 'hooks/useCookieRedirection';
import { useSnackbar } from 'notistack';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import TreeView from '@mui/lab/TreeView';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import moment from 'moment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CustomRadioGroup from 'components/form/CustomRadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import CustomRadioGroupForm from 'components/form/CustomRadioGroupForm';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import Avatar from '@mui/material/Avatar';

import { getImageUrl } from 'utils/utils';
import IconButton from '@mui/material/IconButton';
import { Autocomplete } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import ImagesDropZone from 'components/ImageCropper/ImagesDropZone';
import ImagesDisplay from 'components/ImageCropper/ImagesDisplay';
import RecurringEventInput from 'components/form/recurringEventInput/RecurringEventInput';
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
    color: '#2C367E',
    fontWeight: 600,
  },
  errorautocomplete: {
    border: 'solid 1px #ff1744!important',
    color: '#ff1744!important',
    paddingLeft: '15px',
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
  checkbox: {
    padding: '0px!important',
  },
  container: {
    textAlign: 'center',
  },
  tooltip: {
    marginLeft: '10px',
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
      dateRule
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

const GET_EVENTS = gql`
query events ($notFinished: Boolean ) {
  events (notFinished: $notFinished){
    id
    label
    startedAt
    endedAt
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
        icon
        color
        description
        subEntries {
          id
          label
          icon
          description
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

const TitleWithTooltip = (props: TitleWithTooltipProps) => {
  const { title, tooltipTitle, collection = false } = props;
  const styles = useStyles();

  return (
    <Grid container justifyContent="center" alignItems="center" className={styles.titleContainer}>
      <Typography color="primary" className={classnames(collection ? styles.collectionLabel : styles.label, styles.labelDefault)}>
        {title}
      </Typography>
      {
        !!tooltipTitle &&
        <Tooltip title={tooltipTitle} color="primary" className={styles.tooltip}>
          <InfoIcon />
        </Tooltip>
      }
    </Grid>
  );
};

const isTree = (collection) => {
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
};

const validationRules: ValidationRules = {
  label: {
    rule: ValidationRuleType.required,
  },
  shortDescription: {
    rule: ValidationRuleType.required && ValidationRuleType.maxLength,
    maxLimit: 90,
  },
};

const AddEventForm = ({ actorId }) => {
  const Form: RenderCallback = ({
    formChangeHandler,
    validationResult,
    formValues,
  }) => {
    const [addEvent, { data, error }] = useMutation(ADDEVENT);

    const [showOtherEventList, setShowOtherEventList] = useState(false);
    const [locationError, setlocationError] = useState(true);
    const { data: dataActors } = useQuery(GET_ACTORS, {});
    const { data: dataEvents } = useQuery(GET_EVENTS, {
      variables: {
        notFinished: true,
      },
    });

    const inputHasParentChangeHandler = (event, value) => {
      if (event.target.value) {
        if (event.target.value.length < 3) {
          setShowOtherEventList(false);
        } else {
          setShowOtherEventList(true);
        }
      }
    };
    const autocompleteHasParentHandler = (event, value) => {
      if (value) {
        formValues.parentEventId = value.id;
      }
      setShowOtherEventList(false);
    };

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
    const [showAddActor, setShowAddActor] = useState(false);
    const [actors] = useState([]);
    const [actorsId] = useState([]);
    const [dateRule, setDateRule] = useState();
    const {
      loading: actorLoading,
      error: actorError,
      data: actorData,
    } = useQuery(GET_ACTOR, {
      variables: { id: actorId },
    });
    const [hasParentEvent, setHasParentEvent] = useState(false);
    const handleClickAddActor = useCallback(() => {
      setShowAddActor(!showAddActor);
    }, [showAddActor]);
    const hasParentChangeHandler = (result) => {
      setHasParentEvent(!hasParentEvent);
    };
    const handleClickDeleteActor = useCallback(actor => {
      // @ts-ignore
      let currentActors = [...formValues.actors];
      // @ts-ignore
      currentActors = currentActors.filter(item => item.id !== actor.id);
      formChangeHandler({
        target: {
          // @ts-ignore
          value: currentActors,
          name: 'actors'
        }
      })
    }, [formValues]);

    const [
      setImagesLogoList,
      loadingLogo,
      resultLogo,
      imagesLogoListState,
    ] = useImageReader();

    const inputChangeHandler = useCallback(event => {
      if (event.target.value) {
        if (event.target.value.length < 3) {
          if (event.target.name === 'actors') {
            setOpenAddActorlist(false);
          } else {
            setShowOtherContactList(false);
          }
        } else {
          if (event.target.name === 'actors') {
            setOpenAddActorlist(true);
          } else {
            setShowOtherContactList(true);
          }
        }
      }
    }, []);

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

    useEffect(() => {
      if (actorData && formValues) {
        formValues.actors = [];
        formValues.actors.push(actorData.actor);
      }
      // @ts-ignore
    }, [formValues, actorData]);

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

    const handleStartDateChange = (date) => {
      setSelectedStartDate(date);
    };
    const handleEndDateChange = (date) => {
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

    const [openAddActorlist, setOpenAddActorlist] = useState(false);

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
            parentEventId: formValues.parentEventId,
            // @ts-ignore
            actors: formValues.actors.map(item => item.id),
            dateRule,
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

    const handleChangeActor = useCallback((event, value) => {
      if (value) {
        // @ts-ignore
        let currentActors: string[] = formValues.actors || [];
        currentActors.push(value);
        // @ts-ignore
        formValues.actors = currentActors;
      }
      setShowAddActor(false);
      setOpenAddActorlist(false);
    }, [formValues]);

    const handleChangeDateRule = useCallback((rule) => {
      setDateRule(rule);
    }, []);

    return (
      <Container component="main" maxWidth="sm" className={styles.container}>
        <Typography className={styles.field} color="secondary" variant="h6">
          Ajouter une action
        </Typography>
        <FormItem
          label="Nom de l'action"
          inputName="label"
          formChangeHandler={formChangeHandler}
          value={formValues.label}
          required
          errorBool={
            !validationResult?.global && !!validationResult?.result.label
          }
          errorText="Nom de l'action requis."
        />
        <Grid className={styles.location}>
          <Typography className={styles.collectionLabel}>Adresse complète de l’événement *</Typography>
          <br />
          <GooglePlacesAutocomplete
            apiKey="AIzaSyDvUKXlWS1470oj8C-vD6s62Bs9Y8XQf00"
            placeholder="Taper et sélectionner l'adresse*"
            inputClassName={locationError && styles.errorautocomplete}
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
                  setlocationError(false);
                })
                .catch((error) => console.error(error));
              getAddressDetails(results);
            })
          
          }
          />
        </Grid>
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
          Description *
        </Typography>
        <p />
        {editorLoaded ? (
          <CKEditor
            config={{
              toolbar: ['bold', 'italic', 'link'],
            }}
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
        <FormItem
          label="Lien externe de l'action (Facebook ou site)"
          inputName="facebookUrl"
          formChangeHandler={formChangeHandler}
          value={formValues.facebookUrl}
          required={false}
          errorBool={false}
          errorText=""
        />
        <br />
        <TitleWithTooltip
          title="Infos pratiques"
          tooltipTitle="Ici vous pouvez indiquer toutes les infos comme tarifs, parking, moyen d’accès, … elles apparaitront ainsi aux visiteurs de OUAAA dans un bloc dédié plus lisible"
        />
        <p />
        {editorLoaded ? (
          <>
            <CKEditor
              config={{
                toolbar: ['bold', 'italic', 'link'],
              }}
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
            } else if (collection.code === 'event_public_target') {
              helperText = 'contrairement à votre page acteur, ici vous pouvez ajouter plusieurs catégories de publics pour un même événement';
            }

            if (collection.code === 'event_price') return '';
            return (
              <div>
                <br />
                <Typography className={styles.collectionLabel}>
                  {label}
                  {' '}
                  {helperText !== '' && (
                    <Tooltip title={helperText} className={styles.tooltip}>
                      <InfoIcon />
                    </Tooltip>
                  )}
                </Typography>
                <br />
                {
                  // display &&
                  isTree(collection) && collection.multipleSelection && (
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
                                description={entry.description}
                                hideCheckBox
                                isForm
                                isParent
                                hasSubEntries={entry.subEntries && entry.subEntries.length > 0}
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
                                        description={subEntry.description}
                                        categoryChange={formChangeHandler}
                                        icon={subEntry.icon}
                                        color={entry.color}
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
                  isTree(collection) && !collection.multipleSelection && (
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
                                    hasSubEntries={entry.subEntries && entry.subEntries.length > 0}
                                    isParent
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
                  !isTree(collection) && collection.multipleSelection && (
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
                                className={styles.checkbox}
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
                  !isTree(collection) && !collection.multipleSelection && (
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
        <TitleWithTooltip
          title="Calendrier "
          tooltipTitle="Vous pourrez ajouter des infos plus détaillés dans le corps du texte de la déscription ou dans le bloc infos pratiques"
        />
        <br />
        <Grid className={styles.datetime}>
          <LocalizationProvider locale={frLocale} dateAdapter={AdapterDateFns}>
            <Grid container justifyContent="space-around">
              <DateTimePicker
                value={selectedStartDate}
                onChange={handleStartDateChange}
                ampm={false}
                inputFormat="dd MMM yyyy HH:mm"
                minDate={new Date()}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Date de début"
                    helperText={selectedStartDate && moment(selectedStartDate) <= moment(Date.now())
                      ? 'La date de début ne peut être dans le passé.' : ''
                    }
                  />
                )}
              />

              <DateTimePicker
                value={selectedEndDate}
                onChange={handleEndDateChange}
                ampm={false}
                inputFormat="dd MMM yyyy HH:mm"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                minDate={
                  !!selectedStartDate
                  && !!selectedEndDate
                  && selectedStartDate
                }
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Date de fin"
                    helperText={selectedStartDate && selectedEndDate && selectedStartDate >= selectedEndDate
                      ? 'La date de fin ne peut être dans le début.' : ''
                    }
                  />
                )}
              />
            </Grid>
          </LocalizationProvider>
          <RecurringEventInput onChange={handleChangeDateRule} value={dateRule} startDate={selectedStartDate} />
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
            helperText = 'Vous pourrez ajouter plus de détail dans le bloc infos pratiques ci dessous';

            if (collection.code !== 'event_price') return '';

            return (
              <div>
                <br />
                <Typography className={styles.collectionLabel}>
                  {label}
                  {' '}
                  {helperText !== '' && (
                    <Tooltip title={helperText} className={styles.tooltip}>
                      <InfoIcon />
                    </Tooltip>
                  )}
                </Typography>
                <br />
                {
                  // display &&
                  !isTree(collection) && collection.multipleSelection && (
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
                  !isTree(collection) && !collection.multipleSelection && (
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
        <TitleWithTooltip
          title="Acteur(s) associé(s) à l’action "
          tooltipTitle="Permet d’ajouter d’autres acteurs pour une action co-réalisée"
        />

        <Grid container>
          <List className={styles.actorList}>
            {
              // @ts-ignore
              (formValues?.actors || []).map(actor => {
                return (
                  <ListItem key={actor.id}>
                    <ListItemIcon>
                      <Avatar>
                        {actor && actor.name.split(' ').length > 1 && (
                          <>{actor.name.split(' ')[0][0]}{actor.name.split(' ')[1][0]}</>
                        )}
                        {actor && actor.name.split(' ').length <= 1 && (
                          <>{actor.name}</>
                        )}
                        {actor.name}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      id={"actor-list-" + actor.id}
                      primary={`${actor.name}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => handleClickDeleteActor(actor)} size="large">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })
            }
          </List>
        </Grid>

        <Grid container direction="row">
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={handleClickAddActor}
            size="large">
            <AddCircleOutline />
          </IconButton>

          {showAddActor && (
            <Autocomplete
              id="combo-box-add-actor"
              options={dataActors.actors}
              // @ts-ignore
              getOptionLabel={(option) => `${option.name}`}
              onChange={handleChangeActor}
              open={openAddActorlist}
              style={{ width: 300 }}
              // @ts-ignore
              onInput={inputChangeHandler}
              // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Acteurs"
                  variant="outlined"
                  name="actors"
                />
              )}
            />
          )}
        </Grid>



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
        <Typography variant="body1" color="primary" className={styles.label}>
          Logo de l'événement
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
          text="Déposez ici votre logo au format jpg et de poids inférieur à 4Mo"
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
          text="Déposez ici votre photo principale au format jpg et de poids inférieur à 4Mo"
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
        <FormControlLabel
          control={(
            <Checkbox
              edge="start"
              tabIndex={-1}
              disableRipple
              onChange={hasParentChangeHandler}
              name="hasParent"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          label="est affilié à un autre événement existant"
        />
        {hasParentEvent ? (
          <Autocomplete
            id="combo-box-parentEvent"
            options={dataEvents && dataEvents.events}
            // @ts-ignore
            onInput={inputHasParentChangeHandler}
            open={showOtherEventList}
            // @ts-ignore
            getOptionLabel={(option) => `${option.label} du ${moment(parseInt(option.startedAt)).format('DD/MM/YYYY HH:mm')} au ${moment(parseInt(option.endedAt)).format('DD/MM/YYYY HH:mm')} `}
            onChange={autocompleteHasParentHandler}
            // defaultValue={getDefaultValueParentEvent()}
            style={{ width: 300 }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => (
              <TextField
                {...params}
                label="Evénement parent"
                variant="outlined"
                placeholder="Tapez les 3 premières lettres"
              />
            )}
            noOptionsText="Pas d'événement trouvé'"
            clearText="Effacer"
            closeText="Fermer"
          />
        ) : (
          ''
        )}
        <ClassicButton
          fullWidth
          variant="contained"
          className={styles.submit}
          onClick={submitHandler}
          disabled={!validationResult?.global || !validated}
        >
          Créer cette action
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
