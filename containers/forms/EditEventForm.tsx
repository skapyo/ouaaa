import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { withApollo } from 'hoc/withApollo';
import {
  Card,
  Container,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ClassicButton from 'components/buttons/ClassicButton';
import FormController, {
  RenderCallback,
  ValidationRules,
  ValidationRuleType,
} from 'components/controllers/FormController';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import useGraphQLErrorDisplay from 'hooks/useGraphQLErrorDisplay';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import useCookieRedirection from 'hooks/useCookieRedirection';
import { useSnackbar } from 'notistack';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';
import { useRouter, withRouter } from 'next/router';
import classnames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse/Collapse';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FallbackPageNotFound from 'containers/fallbacks/FallbackPageNotFound';
import Icon from '@material-ui/core/Icon';
import ImageCropper from 'components/ImageCropper/ImageCropper';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { getImageUrl } from 'utils/utils';
import FormControl from '@material-ui/core/FormControl';
import { useDrag, useDrop } from 'react-dnd';
import HeightIcon from '@material-ui/core/SvgIcon/SvgIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDropArea } from 'react-use';
import { Autocomplete, TreeView } from '@material-ui/lab';
import RadioGroup from '@material-ui/core/RadioGroup';

import StyledTreeItem from 'components/filters/StyledTreeItem';
import InfoIcon from '@material-ui/icons/Info';
import CustomRadioGroup from 'components/form/CustomRadioGroup';
import CustomRadioGroupForm from 'components/form/CustomRadioGroupForm';
import ImagesDisplay from 'components/ImageCropper/ImagesDisplay';
import ImagesDropZone from 'components/ImageCropper/ImagesDropZone';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { FlashOnTwoTone } from '@material-ui/icons';
import RadioGroupForContext from './RadioGroupForContext';
import withDndProvider from '../../hoc/withDnDProvider';
import useImageReader from '../../hooks/useImageReader';
import useDnDStateManager from '../../hooks/useDnDStateManager';
import { useSessionState } from '../../context/session/session';
import Entries from './Entries';

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
  delete: {
    background: 'none',
    color: theme.palette.warning.main,
    border: '1px solid',
    borderColor: theme.palette.warning.main,
    '&:hover': {
      background: 'none',
    },
  },
  dropZone: {
    padding: '1em',
    margin: '2em',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  main: {
    textAlign: 'center',
  },
  label: {
    fontWeight: 600,
  },
  collectionLabel: {
    textAlign: 'center',
    color: '#2C367E',
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

const EDIT_EVENT = gql`
  mutation editEvent(
    $eventInfos: EventInfos
    $eventId: Int!
    $pictures: [InputPictureType]
    $logoPictures: [InputPictureType]
    $mainPictures: [InputPictureType]
    $description: String!
    $practicalInfo: String
  ) {
    editEvent(
      eventInfos: $eventInfos
      eventId: $eventId
      pictures: $pictures
      mainPictures: $mainPictures
      logoPictures: $logoPictures
      description: $description
      practicalInfo: $practicalInfo
    ) {
      id
      label
      shortDescription
      facebookUrl
      description
      practicalInfo
      startedAt
      endedAt
      published
      lat
      lng
      referents {
            id
            surname
            lastname
          }
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
      entries {
        id
        label
        icon
        description
        actorEntries {
          linkDescription
          topSEO
          id
        }
        parentEntry {
          id
          code
          label
        }
        subEntries {
          id
          code
          label
          icon
          description
          actorEntries {
            linkDescription
            topSEO
            id
          }
        }
        collection {
          id
          code
          label
        }
      }
      actors{
        id
        name
        referents {
            id
            surname
            lastname
          }
      }
    }
  }
`;

const GET_EVENT = gql`
  query event($id: String!) {
    event(id: $id) {
      id
      label
      shortDescription
      facebookUrl
      description
      practicalInfo
      startedAt
      endedAt
      published
      registerLink
      lat
      lng
      address
      postCode
      city
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
        main
        logo
      }
      referents {
        id
        surname
        lastname
      }
      entries {
        id
        label
        actorEntries {
        linkDescription,
        topSEO,
        id,
       }
        parentEntry {
          id
          code
          label
        }
        subEntries {
          id
          code
          label
          actorEntries {
          linkDescription,
          topSEO,
          id,
          }
        }
        collection {
          id
          code
          label
        }
      }
      actors{
        id
        name
        referents {
          id
          surname
          lastname
        }
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

const DELETE_EVENT = gql`
  mutation deleteEvent($eventId: Int!) {
    deleteEvent(eventId: $eventId)
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

type TitleWithTooltipProps = {
  title: string | any;
  tooltipTitle?: string;
  collection?: boolean;
}

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
        <Tooltip title={tooltipTitle} color="primary">
          <InfoIcon />
        </Tooltip>
      }
    </Grid>
  );
};

const EditEventForm = (props) => {
  const validationRules: ValidationRules = {
    label: {
      rule: ValidationRuleType.required,
    },
    shortDescription: {
      rule: ValidationRuleType.only && ValidationRuleType.maxLength,
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
  const [dataCollections, setDataCollections] = useState({});
  const { loading: loadingCollections, error: errorCollections } = useQuery(
    GET_COLLECTIONS,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        setDataCollections(data);
      },
    },
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const user = useSessionState();

  function containUserActorsReferent(actors) {
    let isContained = false;
    if (user !== null) {
      actors.forEach((actor) => {
        actor.referents.forEach((element) => {
          if (element.id == user.id) {
            isContained = true;
          }
        });
      });
    }
    return isContained;
  }
  function containUser(list) {
    let isContained = false;
    if (user !== null) {
      list.forEach((element) => {
        if (element.id == user.id) {
          isContained = true;
        }
      });
    }
    return isContained;
  }
  const {
    loading: eventLoading,
    error: eventError,
    data: eventData,
  } = useQuery(GET_EVENT, {
    variables: { id: props.id.toString() },
    onCompleted: (data) => {
      if (user === undefined || user == null) {
        enqueueSnackbar(
          'Veuillez vous connecter pour effectuer des modifications.',
          {
            preventDuplicate: true,
          },
        );
        router.push('/');
      } else if (!(containUser(data.event.referents) || containUserActorsReferent(data.event.actors) || user.role === 'admin')) {
        enqueueSnackbar(
          "Vous n'avez pas les droits d'éditer cet événenement",
          {
            preventDuplicate: true,
          },
        );
        router.push('/');
      }
    },
  });

  const imgInit = [];
  if (
    eventData
    && eventData.event.pictures
    && eventData.event.pictures.length > 0
  ) {
    eventData.event.pictures
      .sort((a, b) => (a.position > b.position ? 1 : -1))
      .map((picture, index) => {
        if (!picture.main && !picture.logo) {
          imgInit.push({
            // @ts-ignore
            id: index,
            // @ts-ignore
            file: null,
            // @ts-ignore
            img: getImageUrl(picture.originalPicturePath),
            // @ts-ignore
            croppedImg: {
              crop: {
                // @ts-ignore
                x: picture.croppedX,
                // @ts-ignore
                y: picture.croppedY,
              },
              // @ts-ignore
              rotation: picture.croppedRotation,
              // @ts-ignore
              zoom: picture.croppedZoom,
              // @ts-ignore
              file: null,
              // @ts-ignore
              img: getImageUrl(picture.croppedPicturePath),
              // @ts-ignore
              modified: false,
            },
            // @ts-ignore
            activated: true,
            // @ts-ignore
            deleted: false,
            // @ts-ignore
            newpic: false,
            // @ts-ignore
            serverId: picture.id,
            // @ts-ignore
            position: picture.position,
          });
        }
      });
  }

  const imgInitLogo = [];
  if (
    eventData
    && eventData.event.pictures
    && eventData.event.pictures.length > 0
  ) {
    eventData.event.pictures
      .sort((a, b) => (a.position > b.position ? 1 : -1))
      .map((picture, index) => {
        if (picture.logo) {
          imgInitLogo.push({
            // @ts-ignore
            id: index,
            // @ts-ignore
            file: null,
            // @ts-ignore
            img: getImageUrl(picture.originalPicturePath),
            // @ts-ignore
            croppedImg: {
              crop: {
                // @ts-ignore
                x: picture.croppedX,
                // @ts-ignore
                y: picture.croppedY,
              },
              // @ts-ignore
              rotation: picture.croppedRotation,
              // @ts-ignore
              zoom: picture.croppedZoom,
              // @ts-ignore
              file: null,
              // @ts-ignore
              img: getImageUrl(picture.croppedPicturePath),
              // @ts-ignore
              modified: false,
            },
            // @ts-ignore
            activated: true,
            // @ts-ignore
            deleted: false,
            // @ts-ignore
            newpic: false,
            // @ts-ignore
            serverId: picture.id,
            // @ts-ignore
            position: picture.position,
          });
        }
      });
  }

  const imgInitMain = [];
  if (
    eventData
    && eventData.event.pictures
    && eventData.event.pictures.length > 0
  ) {
    eventData.event.pictures
      .sort((a, b) => (a.position > b.position ? 1 : -1))
      .map((picture, index) => {
        if (picture.main) {
          imgInitMain.push({
            // @ts-ignore
            id: index,
            // @ts-ignore
            file: null,
            // @ts-ignore
            img: getImageUrl(picture.originalPicturePath),
            // @ts-ignore
            croppedImg: {
              crop: {
                // @ts-ignore
                x: picture.croppedX,
                // @ts-ignore
                y: picture.croppedY,
              },
              // @ts-ignore
              rotation: picture.croppedRotation,
              // @ts-ignore
              zoom: picture.croppedZoom,
              // @ts-ignore
              file: null,
              // @ts-ignore
              img: getImageUrl(picture.croppedPicturePath),
              // @ts-ignore
              modified: false,
            },
            // @ts-ignore
            activated: true,
            // @ts-ignore
            deleted: false,
            // @ts-ignore
            newpic: false,
            // @ts-ignore
            serverId: picture.id,
            // @ts-ignore
            position: picture.position,
          });
        }
      });
  }
  
  const { data: dataActors } = useQuery(GET_ACTORS, {});

  
  const [
    deleteEvent,
    { data: deleteData, error: deleteError, loading: deleteLoading },
  ] = useMutation(DELETE_EVENT);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitDeleteEvent = () => {
    deleteEvent({
      variables: {
        eventId: parseInt(props.id),
      },
    });
    setOpen(false);
  };

  useEffect(() => {
    if (!deleteLoading && deleteData?.deleteEvent) {
      enqueueSnackbar('Événement supprimé.', {
        preventDuplicate: true,
      });
      router.push('/actorAdmin/event');
    } else if (deleteError) {
      enqueueSnackbar("La suppression de l'événement a échoué.", {
        preventDuplicate: true,
      });
    }
  }, [deleteData, deleteError, deleteLoading]);

  const Form: RenderCallback = ({
    formChangeHandler,
    validationResult,
    formValues,
  }) => {
    // const { formChangeHandler, formValues, validationResult } = props;
    const [editEvent, { data, error }] = useMutation(EDIT_EVENT);
    useGraphQLErrorDisplay(error);
    const styles = useStyles();
    const redirect = useCookieRedirection();
    
    const [state, setState] = React.useState({});
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [validated, setValidated] = useState(false);
    const [dateChange, setDateChange] = useState(false);
    const [showOtherActors, setShowOtherActors] = useState(false);
    const [showRegisterLink, setShowRegisterLink] = useState(false);
    ;
    const [
      selectedStartDate,
      setSelectedStartDate,
    ] = React.useState<Date | null>(moment().add(1, 'hour').toDate());
    const [selectedEndDate, setSelectedEndDate] = React.useState<Date | null>(
      moment().add(2, 'hour').toDate(),
    );

    const handleStartDateChange = (date: Date | null) => {
      setSelectedStartDate(date);
      setDateChange(true);
    };
    const handleEndDateChange = (date: Date | null) => {
      setSelectedEndDate(date);
      setDateChange(true);
    };

    useEffect(() => {
      if (
        (selectedStartDate
          && selectedEndDate
          && selectedStartDate >= selectedEndDate)
        || (selectedStartDate && moment(selectedStartDate) <= moment())
        || !formValues.shortDescription
        // || !formValues.categories
        // || formValues.categories?.length === 0
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

    useEffect(() => {
      if (data) {
        enqueueSnackbar('Événement mis à jour avec succès.', {
          preventDuplicate: true,
        });
        router.push(`/event/${eventData.event.id}`);
      }
    }, [data]);

    const [firstRender, setFirstRender] = useState(true);
    const [showAddActor, setShowAddActor] = useState(false);
    const [openAddActorlist, setOpenAddActorlist] = useState(false);

    const initFormValues = () => {
      formValues.label = '';
      formValues.facebookUrl = '';
      formValues.shortDescription = '';
      formValues.description = '';
      formValues.address = '';
      formValues.postCode = '';
      formValues.city = '';
      formValues.lat = '';
      formValues.lng = '';
    };
    const updateFormValues = () => {
      formValues.label = eventData.event.label;
      formValues.facebookUrl = eventData.event.facebookUrl;
      formValues.shortDescription = eventData.event.shortDescription;
      formValues.description = eventData.event.description;
      formValues.practicalInfo = eventData.event.practicalInfo;
      formValues.address = eventData.event.address;
      formValues.postCode = eventData.event.postCode;
      formValues.city = eventData.event.city;
      formValues.lat = eventData.event.lat;
      formValues.lng = eventData.event.lng;
      formValues.registerLink = eventData.event.registerLink;
      formValues.actors = eventData.event.actors;
      setShowRegisterLink(formValues.registerLink !== undefined && formValues.registerLink !== '');

      setAddress(eventData.event.address);
      setCity(eventData.event.city);
      setSelectedStartDate(new Date(parseInt(eventData.event.startedAt)));
      setSelectedEndDate(new Date(parseInt(eventData.event.endedAt)));
      const entries = [];
      eventData.event.entries.forEach((actorentry) => {
        // @ts-ignore
        entries.push(actorentry.id);
      });
      // @ts-ignore
      formValues.entries = entries;
    };
    if (firstRender) {
      initFormValues();
    }
    if (firstRender && !eventLoading && !eventError) {
      updateFormValues();
      setFirstRender(false);
    }
    const handleClickAddActor = useCallback(() => {
      setShowAddActor(!showAddActor);
    }, [showAddActor]);

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
    const autocompleteHandler = (event, value) => {
      formValues.contactId = value.id;
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

    const {
      objectsList: objectsListLogo,
      moveObject: moveObjectLogo,
      findObject: findObjectLogo,
      updateActiveIndicator: updateActiveIndicatorLogo,
      updateDeletedIndicator: updateDeletedIndicatorLogo,
      initState: initStateLogo,
      addValues: addValuesLogo,
      updateKeyIndicator: updateKeyIndicatorLogo,
    } = useDnDStateManager(imgInitLogo);

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
    } = useDnDStateManager(imgInitMain);

    useEffect(() => {
      if (resultMain) addValuesMain(resultMain);
      // @ts-ignore
    }, resultMain);

    const [setImagesList, loading, result, imagesListState] = useImageReader();

    const handleAddActor = () => {
      setShowOtherActors(true);
    };

    const onDropHandler = useCallback(
      (files) => {
        // @ts-ignore
        setImagesList(files);
      },
      [setImagesList],
    );

    useEffect(() => {
      if (result) addValues(result);
      // @ts-ignore
    }, result);

    const {
      objectsList,
      moveObject,
      findObject,
      updateActiveIndicator,
      updateDeletedIndicator,
      initState,
      addValues,
      updateKeyIndicator,
    } = useDnDStateManager(imgInit);

    const submitHandler = () => {
      const checkboxes = Object.keys(state);
      let categoriesArray: number[];
      categoriesArray = [];
      checkboxes.forEach((key) => {
        if (state[key]) {
          categoriesArray.push(parseInt(key));
        }
      });
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
      editEvent({
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
            registerLink: formValues.registerLink,
            lat: parseFloat(formValues.lat),
            lng: parseFloat(formValues.lng),
            address,
            postCode: formValues.postCode,
            city,
            // @ts-ignore
            actors: formValues.actors.map(item => item.id)
          },
          eventId: parseInt(eventData.event.id),
          logoPictures,
          mainPictures,
          pictures,
          // @ts-ignore
          description: descriptionEditor.getData(),
          // @ts-ignore
          practicalInfo: practicalInfoEditor.getData(),
        },
      });
    };

    useEffect(() => {
      if (result) addValues(result);
      // @ts-ignore
    }, result);

    return (
      <Container component="main" maxWidth="sm" className={styles.main}>
        <Typography className={styles.field} color="secondary" variant="h6">
          Éditer un événement
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
                                        icon={subEntry.icon}
                                        color={entry.color}
                                        categoryChange={formChangeHandler}
                                        checked={
                                          formValues
                                          && formValues.entries.includes(subEntry.id)
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
                    // @ts-ignore
                    <Entries initValues={formValues.entries}>
                      <RadioGroupForContext initValue={formValues.entries}>
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
                                            // @ts-ignore
                                            checked={
                                              formValues.entries
                                              && formValues.entries.includes(entry.id)
                                            }
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
                                // @ts-ignore
                                checked={
                                  formValues
                                  && formValues.entries
                                  && formValues.entries.includes(entry.id)
                                }
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
                  dateChange
                  && !!selectedStartDate
                  && moment(selectedStartDate) <= moment(Date.now())
                }
                helperText={
                  dateChange
                    && selectedStartDate
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
                  dateChange
                  && !!selectedStartDate
                  && moment(selectedStartDate) <= moment()
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
                  dateChange
                  && !!selectedStartDate
                  && !!selectedEndDate
                  && moment(selectedStartDate) >= moment(selectedEndDate)
                }
                helperText={
                  dateChange
                    && selectedStartDate
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
                  dateChange
                  && !!selectedStartDate
                  && !!selectedEndDate
                  && moment(selectedStartDate) >= moment(selectedEndDate)
                }
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <p />
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
            let defaultValue = '';
            // @ts-ignore
            formValues.entries.map((entry) => {
              let isPresent = false;
              if (collection.entries) {
                collection.entries.map((entryCollection) => {
                  if (entryCollection.id === entry) isPresent = true;
                  return isPresent;
                });
              }
              if (isPresent) defaultValue = entry;
            });
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
                  !IsTree(collection) && !collection.multipleSelection && (
                    <RadioGroupForContext initValue={defaultValue}>
                      <CustomRadioGroup
                        formChangeHandler={formChangeHandler}
                        entries={collection.entries}
                        defaultValue={defaultValue}
                      />
                    </RadioGroupForContext>

                  )
                }
              </div>
            );
          })
        }



        <TitleWithTooltip
          title="Acteur(s) associé(s) à l’action"
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
                        {actor.name.split(' ').length > 1 && (
                          <>{actor.name.split(' ')[0][0]}{actor.name.split(' ')[1][0]}</>
                        )}
                        {actor.name.split(' ').length <= 1 && (
                          <>{actor.name}</>
                        )}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      id={"actor-list-" + actor.id}
                      primary={`${actor.name}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => handleClickDeleteActor(actor)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              })
            }
          </List>
        </Grid>

        <Grid container direction="row">
          <IconButton key="close" aria-label="Close" color="inherit" onClick={handleClickAddActor}>
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
                    onChange={() => { setShowRegisterLink(false); formValues.registerLink = ''; }}
                    className={styles.justify}
                    checked={!showRegisterLink}
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
              checked={showRegisterLink}
            />
            {showRegisterLink && (
              <FormItem
                label="Lien externe de participation à l'événement"
                inputName="registerLink"
                formChangeHandler={formChangeHandler}
                required={false}
                errorBool={false}
                errorText=""
                value={formValues.registerLink}
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
          text="Déposez ici votre logo au format jpg  et de poids inférieur à 4Mo"
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
          text="Déposez ici votre autres photos au format jpg et de poids inférieur à 4Mo"
        />
        <ClassicButton
          fullWidth
          variant="contained"
          className={styles.submit}
          onClick={submitHandler}
          disabled={!validationResult?.global || !validated}
        >
          Mettre à jour cet événement
        </ClassicButton>
        <ClassicButton
          fullWidth
          variant="contained"
          className={styles.delete}
          onClick={handleClickOpen}
        >
          Supprimer cet événement
        </ClassicButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Êtes-vous sûr(e) de vouloir supprimer cet événement ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Une fois supprimé, cet événement sera définitivement supprimé. Il
              ne sera plus visible sur notre plateforme, ni pour vous, ni pour
              les visiteurs.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={submitDeleteEvent} color="primary" autoFocus>
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  };

  if (eventLoading) {
    return null;
  }
  if (eventError) {
    return <FallbackPageNotFound />;
  }
  return <FormController render={Form} validationRules={validationRules} />;
};

export default withDndProvider(withRouter(withApollo()(EditEventForm)));
