/* eslint react/prop-types: 0 */
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';
import graphqlTag from 'graphql-tag';
import { useSnackbar } from 'notistack';
import { useRouter, withRouter } from 'next/router';
import classnames from 'classnames';

import { Container, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import List from '@mui/material/List';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import RadioGroup from '@mui/material/RadioGroup';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import TreeView from '@mui/lab/TreeView';
import { Autocomplete } from '@mui/material';
import Head from 'next/head';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from 'components/form/TextField';
import CustomRadioGroup from 'components/form/CustomRadioGroup';
import ClassicButton from 'components/buttons/ClassicButton';
import { withApollo } from 'hoc/withApollo';
import FormController, {
  RenderCallback,
} from 'components/controllers/FormController';
import { getImageUrl } from 'utils/utils';
import ImagesDropZone from 'components/ImageCropper/ImagesDropZone';
import ImagesDisplay from 'components/ImageCropper/ImagesDisplay';
import { useSessionState } from 'context/session/session';
import useImageReader from '../../hooks/useImageReader';
import useDnDStateManager from '../../hooks/useDnDStateManager';
import {
  ValidationRules,
  ValidationRuleType,
} from '../../components/controllers/FormController';
import withDndProvider from '../../hoc/withDnDProvider';
import StyledTreeItem from '../../components/filters/StyledTreeItem';
import Entries from './Entries';
import RadioGroupForContext from './RadioGroupForContext';
import SchedulerContainer from './BusinessHoursForm/SchedulerContainer';

const EDIT_ACTOR = gql`
  mutation editActor(
    $formValues: ActorInfos
    $actorId: Int!
    $userId: Int!
    $description: String!
    $volunteerDescription: String
    $logoPictures: [InputPictureType]
    $mainPictures: [InputPictureType]
    $pictures: [InputPictureType]
    $openingHours: [InputOpeningHour]
  ) {
    editActor(
      actorInfos: $formValues
      actorId: $actorId
      userId: $userId
      mainPictures: $mainPictures
      logoPictures: $logoPictures
      pictures: $pictures
      description: $description
      volunteerDescription: $volunteerDescription
      openingHours: $openingHours
    ) {
      id
      name
      email
      phone
      address
      postCode
      city
      website
      socialNetwork
      siren
      description
      lat
      lng
      activity
      shortDescription
      volunteerDescription
      pictures {
        id
        label
        originalPicturePath
        originalPictureFilename
        position
        logo
        main
      }
      entries {
        id
        label
        icon
        color
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
      contact_id
      openingHours {
        id
        days {
          id
          day
          selected
          identifier
        }
        hours
        place
      }
      referents {
        id
        surname
        lastname
      }
    }
  }
`;

const GET_USERS = graphqlTag`
  query users
  {
    users
    {
      id,
      surname,
      lastname,
    }
  }
`;

const GET_ACTOR = gql`
  query actor($id: String!) {
    actor(id: $id) {
      id
      name
      email
      phone
      address
      postCode
      city
      website
      socialNetwork
      siren
      hasVideoVouaaar
      enableOpenData
      description
      lat
      lng
      activity
      shortDescription
      volunteerDescription
      pictures {
        id
        label
        originalPicturePath
        originalPictureFilename
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
      contact_id
      openingHours {
        id
        days {
          id
          day
          selected
          identifier
        }
        hours
        place
      }
      referents {
        id
        surname
        lastname
      }
    }
  }
`;

const GET_COLLECTIONS = gql`
  {
    collections {
      id
      label
      code
      multipleSelection
      position
      actor
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

const DELETE_ACTOR = gql`
  mutation deleteActor($actorId: Int!, $deleteEvent: Boolean) {
    deleteActor(actorId: $actorId, deleteEvent: $deleteEvent)
  }
`;

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: theme.spacing(5),
  },
  label: {
    fontWeight: 600,
  },
  labelDefault: {
    marginRight: 5,
  },
  titleContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  field: {
    marginBottom: theme.spacing(3),
    width: '100%!important',
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
        border: 'solid 1px black',
      },
      '&:focus': {
        border: 'solid 2px black',
      },
      '&:active': {
        border: 'solid 2px black',
      },
    },
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dropZone: {
    padding: '1em',
    margin: '2em',
  },
  collectionLabel: {
    textAlign: 'center',
    color: '#2C367E',
    fontWeight: 600,
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
    fontSize: '1.5em!important',
  },
  helperText: {
    lineHeight: '1.66',
    fontSize: '0.75rem',
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'justify',
  },

  referentList: {
    flex: 1,
  },
}));

type FormItemProps = {
  label: string;
  inputName: string;
  formChangeHandler: (event: ChangeEvent) => void;
  value: string;
  required: boolean;
  errorBool: boolean;
  errorText: string;
  helperText?: string;
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
    helperText,
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
      helperText={errorBool ? errorText : helperText}
    />
  );
};

type TitleWithTooltipProps = {
  title: string | any;
  tooltipTitle?: string;
  collection?: boolean;
};

const TitleWithTooltip = (props: TitleWithTooltipProps) => {
  const { title, tooltipTitle, collection = false } = props;
  const styles = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={styles.titleContainer}
    >
      <Typography
        color="primary"
        className={classnames(
          collection ? styles.collectionLabel : styles.label,
          styles.labelDefault,
        )}
      >
        {title}
      </Typography>
      {!!tooltipTitle && (
        <Tooltip title={tooltipTitle} color="primary">
          <InfoIcon />
        </Tooltip>
      )}
    </Grid>
  );
};

const EditActorForm = (props) => {
  const styles = useStyles();
  const user = useSessionState();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [checked, setChecked] = useState([0]);
  const [openingHours, setOpeningHours] = useState();

  const { data: dataUsers } = useQuery(GET_USERS, {});

  const [open] = React.useState([false]);
  const router = useRouter();

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
    loading: actorLoading,
    error: actorError,
    data: actorData,
  } = useQuery(GET_ACTOR, {
    variables: { id: props.id.toString() },
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (user === undefined || user == null) {
        enqueueSnackbar(
          'Veuillez vous connecter pour effectuer des modifications.',
          {
            preventDuplicate: true,
          },
        );
        router.push('/');
      } else if (
        !(containUser(data.actor.referents) || user.role === 'admin')
      ) {
        enqueueSnackbar("Vous n'avez pas les droits d'éditer cet acteur", {
          preventDuplicate: true,
        });
        router.push('/');
      }
    },
  });

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

  if (actorLoading) return null;
  if (actorError) return `Error! ${actorError.message}`;

  const imgInit = [];
  if (
    actorData
    && actorData.actor.pictures
    && actorData.actor.pictures.length > 0
  ) {
    actorData.actor.pictures
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
    actorData
    && actorData.actor.pictures
    && actorData.actor.pictures.length > 0
  ) {
    actorData.actor.pictures
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
    actorData
    && actorData.actor.pictures
    && actorData.actor.pictures.length > 0
  ) {
    actorData.actor.pictures
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

  function getEntryPresentInCollection(entries, collection) {
    let entryFound;
    let isPresent = false;
    // @ts-ignore
    entries.map((entry) => {
      if (collection.entries) {
        collection.entries.map((entryCollection) => {
          if (entryCollection.id === entry) {
            isPresent = true;
            entryFound = entry;
          }
          return isPresent;
        });
      }
      return entry;
    });
    if (entryFound) return entryFound;
  }

  const validationRules: ValidationRules = {
    name: {
      rule: ValidationRuleType.required,
    },
    email: {
      rule: ValidationRuleType.required && ValidationRuleType.email,
    },
    shortDescription: {
      rule: ValidationRuleType.only && ValidationRuleType.maxLength,
      maxLimit: 90,
    },
    phone: {
      rule: ValidationRuleType.only && ValidationRuleType.maxLength,
      //    type: 'number',
      maxLimit: 10,
    },

  };

  const Form: RenderCallback = ({
    formChangeHandler,
    formValues,
    validationResult,
  }) => {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [showOtherContact, setShowOtherContact] = useState(
      formValues.contactId !== actorData.actor.id,
    );
    const [showOtherContactList, setShowOtherContactList] = useState(false);
    const [descriptionEditor, setDescriptionEditor] = useState();
    const [volunteerEditor, setVolunteerEditor] = useState();
    const [estlarochelle, setEstlarochelle] = useState(false);
    const [firstRender, setFirstRender] = useState(true);
    const [deleteActorAndEvent, setdeleteActorAndEvent] = useState(true);

    const [hasVideoVouaaar, setHasVideoVouaaar] = useState(
      actorData.actor.hasVideoVouaaar,
    );
    const [enableOpenData, setEnableOpenData] = useState(actorData.actor.enableOpenData);

    const handleEnableOpenData = () => {
      setEnableOpenData(!enableOpenData);
      formValues.enableOpenData = !enableOpenData;
    };

    const [
      initentriesWithInformation,
      setInitentriesWithInformation,
    ] = useState([]);
    const [showAddReferent, setShowAddReferent] = useState(false);
    const [openAddReferentlist, setOpenAddReferentlist] = useState(false);
    const [
      edit,
      { data: editData, loading: editLoading, error: editError },
    ] = useMutation(EDIT_ACTOR);

    const [setImagesList, loading, result, imagesListState] = useImageReader();
    const editorRef = useRef();

    // @ts-ignore
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    const [
      deleteActor,
      { data: deleteData, error: deleteError, loading: deleteLoading },
    ] = useMutation(DELETE_ACTOR);
    const [openDeletePopup, setOpenDeletePopup] = React.useState(false);

    const handleHasVideoVouaaar = () => {
      setHasVideoVouaaar(!hasVideoVouaaar);
      formValues.hasVideoVouaaar = !hasVideoVouaaar;
    };

    const handleClickOpen = () => {
      setOpenDeletePopup(true);
    };

    const handleClose = () => {
      setOpenDeletePopup(false);
    };

    const submitDeleteActor = () => {
      deleteActor({
        variables: {
          actorId: parseInt(props.id),
          deleteEvent: deleteActorAndEvent,
        },
      });
      setOpenDeletePopup(false);
    };

    useEffect(() => {
      if (!deleteLoading && deleteData?.deleteActor) {
        enqueueSnackbar('Acteur supprimé avec succès.', {
          preventDuplicate: true,
        });
        router.push('/');
      } else if (deleteError) {
        enqueueSnackbar("La suppression de l'acteur a échoué.", {
          preventDuplicate: true,
        });
      }
    }, [deleteData, deleteError, deleteLoading]);

    useEffect(() => {
      // @ts-ignore
      editorRef.current = {
        CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
        ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
      };
      setEditorLoaded(true);
    }, []);

    const [
      setImagesLogoList,
      loadingLogo,
      resultLogo,
      imagesLogoListState,
    ] = useImageReader();

    const inputChangeHandler = useCallback((event) => {
      if (event.target.value) {
        if (event.target.value.length < 3) {
          if (event.target.name === 'referents') {
            setOpenAddReferentlist(false);
          } else {
            setShowOtherContactList(false);
          }
        } else if (event.target.name === 'referents') {
          setOpenAddReferentlist(true);
        } else {
          setShowOtherContactList(true);
        }
      }
    }, []);

    const autocompleteHandler = (event, value) => {
      if (value) {
        formValues.contactId = value.id;
      }
      setShowOtherContactList(false);
    };

    const handleChangeReferent = useCallback(
      (event, value) => {
        if (value) {
          // @ts-ignore
          const currentReferents: string[] = formValues.referents || [];
          currentReferents.push(value);
          // @ts-ignore
          formValues.referents = currentReferents;
        }
        setShowAddReferent(false);
        setOpenAddReferentlist(false);
      },
      [formValues],
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
    } = useDnDStateManager(imgInitLogo);

    const onDropLogoHandler = useCallback(
      (files) => {
        let hasAlreadyOnePicture = false;
        if (objectsListLogo) {
          objectsListLogo.map((object) => {
            if (!object.deleted) {
              hasAlreadyOnePicture = true;
            }
          });
        }
        if (hasAlreadyOnePicture) {
          enqueueSnackbar('Une seule photo de logo possible', {
            preventDuplicate: true,
          });
        } else {
          if (files.length > 1) {
            files = files.slice(0, 1);
            enqueueSnackbar('Une seule photo de logo possible', {
              preventDuplicate: true,
            });
          }
          // @ts-ignore
          setImagesLogoList(files);
        }
      },
      [setImagesLogoList, objectsListLogo],
    );

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

    const onDropMainHandler = useCallback(
      (files) => {
        let hasAlreadyOnePicture = false;
        if (objectsListMain) {
          objectsListMain.map((object) => {
            if (!object.deleted) {
              hasAlreadyOnePicture = true;
            }
          });
        }
        if (hasAlreadyOnePicture) {
          enqueueSnackbar('Une seule photo principale possible', {
            preventDuplicate: true,
          });
        } else {
          if (files.length > 1) {
            files = files.slice(0, 1);
            enqueueSnackbar('Une seule photo principale possible', {
              preventDuplicate: true,
            });
          }
          // @ts-ignore
          setImagesMainList(files);
        }
      },
      [setImagesMainList, objectsListMain],
    );

    useEffect(() => {
      if (resultMain) addValuesMain(resultMain);
      // @ts-ignore
    }, resultMain);

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

    useEffect(() => {
      if (result) addValues(result);
      // @ts-ignore
    }, result);

    const onDropHandler = useCallback(
      (files) => {
        // @ts-ignore
        setImagesList(files);
      },
      [setImagesList],
    );

    const submitHandler = useCallback(async () => {
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
      let files;
      // @ts-ignore
      if (objectsList) {
        files = objectsList.map((object) => {
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
      for await (const element of logoPictures.concat(mainPictures).concat(files)){
        if(element.newpic ==true){
          const newFiles = new FormData();
          newFiles.append('files', element.file.originalPicture);
          await fetch('/api/files', {
            method: 'POST',
            body: newFiles,
          });
          element.file.filename=element.file.originalPicture.name;
          element.file.originalPicture=undefined;
       
        }
      }

      edit({
        variables: {
          formValues: {
            ...formValues,
            // @ts-ignore
            referents: formValues.referents.map((item) => item.id),
          },
          // eslint-disable-next-line radix
          actorId: parseInt(actorData.actor.id),
          pictures: files,
          logoPictures,
          userId: parseInt(user.id),
          mainPictures,
          // @ts-ignore
          description: descriptionEditor.getData(),
          // @ts-ignore
          volunteerDescription: volunteerEditor.getData(),
          openingHours,
        },
      });
    }, [
      formValues,
      edit,
      objectsListLogo,
      objectsList,
      objectsListMain,
      descriptionEditor,
      volunteerEditor,
      openingHours,
    ]);

    useEffect(() => {
      if (!editError && !editLoading && editData) {
        enqueueSnackbar('Acteur mis à jour.', {
          preventDuplicate: true,
        });
        router.push(`/actor/${actorData.actor.id}`);
      }
    }, [editLoading, editError]);

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
    const [valueContactId, setValueContactId] = React.useState(
      formValues.contactId === actorData.actor.id ? 'me' : 'other',
    );

    const radioChangeHandler = (results, name) => {
      setValueContactId(name);
      if (name === 'other') {
        setShowOtherContact(true);
      } else {
        setShowOtherContact(false);
      }
    };
    // const getTimeFramesFromData = (initDatas) => {
    //   console.log('initDatas', initDatas);
    //   const openingHours = initDatas.map((openingHour) => {
    //     const timeFrames = [3];
    //     timeFrames[0] = openingHour.days;
    //     timeFrames[1] = openingHour.hours;
    //     timeFrames[2] = openingHour.place;
    //     return timeFrames;
    //   });
    //   console.log('opening hours', openingHours);
    //   return openingHours;
    // };

    const getAddressDetails = (results) => {
      formValues.address = `${getObjectLongName(
        results,
        'street_number',
      )} ${getObjectLongName(results, 'route')}`.trim();
      formValues.city = getObjectLongName(results, 'locality');
      formValues.postCode = getObjectLongName(results, 'postal_code');
      if (formValues.postCode === '17000') {
        setEstlarochelle(true);
      } else {
        setEstlarochelle(false);
      }
    };
    const addLineBreaks = (string) => string.split('\n').map((text, index) => (
      <React.Fragment key={`${text}-${index}`}>
        {text}
        <br />
      </React.Fragment>
    ));
    const updateFormValues = () => {
      formValues.name = actorData.actor.name;
      formValues.email = actorData.actor.email;
      formValues.phone = actorData.actor.phone;
      formValues.website = actorData.actor.website;
      formValues.description = actorData.actor.description;
      formValues.socialNetwork = actorData.actor.socialNetwork;
      formValues.address = actorData.actor.address;
      formValues.postCode = actorData.actor.postCode;
      formValues.city = actorData.actor.city;
      formValues.lat = actorData.actor.lat;
      formValues.lng = actorData.actor.lng;
      formValues.activity = actorData.actor.activity;
      formValues.volunteerDescription = actorData.actor.volunteerDescription;
      formValues.shortDescription = actorData.actor.shortDescription;
      formValues.referents = actorData.actor.referents;
      formValues.contactId = actorData.actor.contact_id;
      formValues.siren = actorData.actor.siren;
      formValues.hasVideoVouaaar = actorData.actor.hasVideoVouaaar;

      if (formValues.postCode === '17000') {
        setEstlarochelle(true);
      } else {
        setEstlarochelle(false);
      }

      const entries = [];
      actorData.actor.entries.forEach((actorentry) => {
        // @ts-ignore
        entries.push(actorentry.id);
      });

      // @ts-ignore
      formValues.entries = entries;

      const entriesWithInformation = [];
      actorData.actor.entries.forEach((actorentry) => {
        // @ts-ignore
        entriesWithInformation.push({
          // @ts-ignore
          entryId: actorentry.id,
          // @ts-ignore
          linkDescription: actorentry.actorEntries.linkDescription,
          // @ts-ignore
          topSEO: actorentry.actorEntries.topSEO,
        });

        if (actorentry.parentEntry != null) {
          // if top seo add in at the beginning of the list
          // @ts-ignore
          if (actorentry.actorEntries.topSEO) {
            // @ts-ignore
            initentriesWithInformation.unshift(parseInt(actorentry.id, 10));
          } else {
            // @ts-ignore
            initentriesWithInformation.push(parseInt(actorentry.id, 10));
          }
        }
      });

      // @ts-ignore
      formValues.entriesWithInformation = entriesWithInformation;
    };

    const isEntriesWithInformationContains: Function = (
      entriesWithInformationArray: Array<Object>,
      id: number,
    ) => {
      let existingEntryInformation;
      let index = 0;
      entriesWithInformationArray.map((linkDescription) => {
        index += 1;
        // @ts-ignore
        if (linkDescription.entryId === id) {
          existingEntryInformation = linkDescription;
        }
        return '';
      });
      if (existingEntryInformation !== undefined) {
        return existingEntryInformation;
      }
      return null;
    };
    const getDefaultValueContact = () => {
      let defaultUser;
      if (dataUsers && dataUsers.users !== null) {
        dataUsers.users.map((user) => {
          if (user.id === actorData.actor.contact_id) {
            defaultUser = user;
          }
        });
      }
      return defaultUser;
    };

    if (firstRender && !actorLoading && !actorError) {
      updateFormValues();
      setFirstRender(false);
    }

    const handleClickAddReferent = useCallback(() => {
      setShowAddReferent(!showAddReferent);
    }, [showAddReferent]);

    const handleClickDeleteReferent = useCallback(
      (referent) => {
        // @ts-ignore
        let currentReferents = [...formValues.referents];
        // @ts-ignore
        currentReferents = currentReferents.filter(
          (item) => item.id !== referent.id,
        );
        formChangeHandler({
          target: {
            // @ts-ignore
            value: currentReferents,
            name: 'referents',
          },
        });
      },
      [formValues],
    );

    return <>
      <Container component="main" maxWidth="sm">
        <FormItem
          label="Nom"
          inputName="name"
          formChangeHandler={formChangeHandler}
          value={formValues.name}
          required
          errorBool={
            !validationResult?.global && !!validationResult?.result.name
          }
          errorText="Nom de l'acteur requis."
        />
        <FormItem
          label="Email"
          inputName="email"
          formChangeHandler={formChangeHandler}
          value={formValues.email}
          required
          errorBool={
            !validationResult?.global && !!validationResult?.result.email
          }
          errorText="Format de l'email invalide."
          helperText="Un email générique type « contact@structure.fr » est préférable à un mail nominatif type «prenom.nom@gmail.com » notamment pour limiter la pollution publicitaire des boites mail (robots parsant le web)"

        />
        <FormItem
          label="Téléphone"
          inputName="phone"
          formChangeHandler={formChangeHandler}
          value={formValues.phone}
          errorBool={
            !validationResult?.global && !!validationResult?.result.phone
          }
          required={false}
          errorText="Format du téléphone invalide. Maximum 10 chiffres."
        />

        <FormItem
          label="Réseau social"
          inputName="socialNetwork"
          formChangeHandler={formChangeHandler}
          value={formValues.socialNetwork}
          required={false}
          errorBool={false}
          errorText=""
        />
        <FormItem
          label="Site Internet"
          inputName="website"
          formChangeHandler={formChangeHandler}
          required={false}
          errorBool={false}
          value={formValues.website}
          errorText=""
        />
        <FormItem
          label="Siren"
          inputName="siren"
          formChangeHandler={formChangeHandler}
          value={formValues.siren}
          required={false}
          errorBool={false}
          errorText=""
        />
        {user.role === 'admin' && (
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="hasVideoVouaaar"
                onChange={handleHasVideoVouaaar}
                checked={hasVideoVouaaar}
              />
            }
            label="possède une vidéo de la série acteur à voir. La vidéo doit être déjà présente sur le serveur."
          />
        )}
        <div className={styles.field}>
          <Grid className={styles.location}>
            <GooglePlacesAutocomplete
              apiKey="AIzaSyDvUKXlWS1470oj8C-vD6s62Bs9Y8XQf00"
              placeholder="Taper et sélectionner la localisation *"
              initialValue={
                formValues.address
                  ? formValues.address
                    .concat(' ')
                    .concat(formValues.postCode)
                    .concat(' ')
                    .concat(formValues.city)
                  : formValues.city && formValues.city
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
        </div>
        {
          /* @ts-ignore */
          dataCollections.collections
          /* @ts-ignore */
          && dataCollections.collections.map((collection) => {
            if (collection.code !== 'larochelle_quarter' || !estlarochelle) {
              return '';
            }
            if (!collection.actor) return '';

            return (
              <div key={collection.id}>
                <TitleWithTooltip title={collection.label} collection />
                <RadioGroupForContext
                  initValue={getEntryPresentInCollection(
                    formValues.entries,
                    collection,
                  )}
                >
                  <CustomRadioGroup
                    formChangeHandler={formChangeHandler}
                    entries={collection.entries}
                    defaultValue={getEntryPresentInCollection(
                      formValues.entries,
                      collection,
                    )}
                  />
                </RadioGroupForContext>
              </div>
            );
          })
        }


{
          /* @ts-ignore */
          dataCollections.collections &&
            /* @ts-ignore */
            dataCollections.collections.map((collection) => {
              if (collection.code !== 'actor_status') {
                return '';
              }
              let { label } = collection;
              let helperText = '';

               label = 'Statut';
               helperText =
                'service public : toutes les collectivités, mairies, cda, cdc participant directement ou via des projets à la transition / ex : la rochelle territoire zéro carbone entreprise : tous les acteurs économiques de la transition, de l’economie sociale et solidaire... association & ONG  : toutes les structures à but non lucratif';
           
                let defaultValue = '';
            if (
              !IsTree(collection)
              && !collection.multipleSelection
              && formValues
              && formValues.entries
            ) {
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
            }
              //    const [display, setDisplay] = useState(false);
              return (
                <div>
                  <br />
                  <Typography className={styles.collectionLabel}>
                    {label}{' '}
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
                      <FormControl component="fieldset">
                         <RadioGroupForContext initValue={defaultValue}>
                      <CustomRadioGroup
                        formChangeHandler={formChangeHandler}
                        entries={collection.entries}
                        defaultValue={defaultValue}
                      />
                    </RadioGroupForContext>
                      </FormControl>
                    )
                  }
                </div>
              );
            })
        }
        <p />
        <br />
        <FormItem
          label="Activité principale de votre structure / Métier"
          inputName="activity"
          formChangeHandler={formChangeHandler}
          value={formValues.activity}
          required={false}
          errorBool={false}
          errorText=""
          helperText="Indiquez ici l'activité principale ou votre métier.  Cette info servira à mieux référencer votre page dans les moteurs de recherche. Ex : boulanger bio"
        />

        <p />

        <FormItem
          label="Description courte"
          inputName="shortDescription"
          formChangeHandler={formChangeHandler}
          value={formValues.shortDescription}
          required={false}
          errorBool={
            !validationResult?.global
            && !!validationResult?.result.shortDescription
          }
          errorText="90 caractères maximum"
          helperText="Cette description courte s’affichera en vue liste et dans les blocs de survol/clic de la carte. Merci de synthétiser vos objectifs en quelques mots."
        />

        <TitleWithTooltip title="Description" />

        <Typography className={styles.helperText}>
          Cette description longue est intégrée à votre page acteur. Elle se
          veut la plus explicite et détaillée possible. Un langage simple, des
          mots compréhensibles de tous, vous permettront d’expliquer de manière
          didactique vos liens avec les questions de transition, vos
          missions/actions, votre organisation, etc. Au delà de l’accès à une
          information claire pour tous les internautes (y compris en situation
          de handicap) utilisant
          {' '}
          <i>OUAAA!</i>
          , ce texte permettra un meilleur
          référencement de votre page dans le moteur de recherche interne. Pour
          cela, pensez à utiliser des mots clé du champ sémantique de votre
          activité. Ex : vous êtes une asso de recyclerie : zéro déchet,
          réutilisation, matière, matériaux, économie circulaire, upcycling,
          nouvelle vie, objet, dépôt, vente, réinsertion….
        </Typography>

        <br />

        {editorLoaded ? (
          <>
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
          </>
        ) : (
          <div>Editor loading</div>
        )}
        <p />

        {
          /* @ts-ignore */
          dataCollections.collections
          /* @ts-ignore */
          && dataCollections.collections.map((collection) => {
            if (!collection.actor) return '';
            if (collection.code !== 'category') return '';
            //    const [display, setDisplay] = useState(false);
            let { label } = collection;
            let helperText;
            if (collection.code === 'category') {
              label =  "Sujets d'actions principaux";
              helperText = 'Vous avez la possibilité d’ajouter un texte libre pour expliquer votre lien au sujet choisi. Vous pouvez sélectionner jusqu’a 3 sujet.';
            } 
            let defaultValue = '';
            if (
              !IsTree(collection)
              && !collection.multipleSelection
              && formValues
              && formValues.entries
            ) {
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
            }
            return (
              <div key={collection.code}>
                <TitleWithTooltip
                  title={label}
                  tooltipTitle={helperText}
                  collection
                />
                {
                  // display &&
                  IsTree(collection) && (
                    // @ts-ignore
                    <Entries initValues={initentriesWithInformation}>
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
                                icon={entry.icon}
                                hideCheckBox
                                color={entry.color}
                                isForm
                                isParent
                                hasSubEntries={
                                  entry.subEntries
                                  && entry.subEntries.length > 0
                                }
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
                                        icon={subEntry.icon}
                                        color={entry.color}
                                        formValues={updateFormValues}
                                        categoryChange={formChangeHandler}
                                        linkDescription={
                                          isEntriesWithInformationContains(
                                            formValues.entriesWithInformation,
                                            subEntry.id,
                                          ) !== null
                                            ? isEntriesWithInformationContains(
                                              formValues.entriesWithInformation,
                                              subEntry.id,
                                            ).linkDescription
                                            : ''
                                        }
                                        isForm
                                        checked={
                                          formValues
                                          && formValues.entriesWithInformation
                                          && isEntriesWithInformationContains(
                                            formValues.entriesWithInformation,
                                            subEntry.id,
                                          ) !== null
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
              </div>
            );
          })
        }

        <TitleWithTooltip title="Votre logo" />

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

        <TitleWithTooltip
          title="Photo principale"
          tooltipTitle="Une seule photo principale est possible, vous pouvez supprimer celle affichée via la poubelle puis en télécharger une nouvelle. Seul le format JPG est accepté. Veuillez à ce que le fichier n’excède pas 4Mo"
        />

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
          text="Déposez ici votre photo principale au  et de poids inférieur à 4Mo"
        />

        <TitleWithTooltip
          title="Autres photos"
          tooltipTitle="Vous pouvez supprimer l'image affichée via la poubelle puis en télécharger une nouvelle. Seul le format JPG est accepté. Veuillez à ce que chaque fichier n’excède pas 4Mo"
        />

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

      <Typography variant="body1" color="primary" className={styles.label}>
          Jour et horaire d'ouverture {' '}
          <Tooltip title={addLineBreaks('Pour chaque ligne vous pouvez : \n'
          + '1. Sélectionner les différents jours où vous êtes ouvert aux mêmes horaires. Le(s) jour(s) sélectionné(s) passe(nt) en bleu foncé.\n'
          + '2. Indiquer des tranches horaires associés à ce(s) jour(s). Vous pouvez ajouter autant de tranches horaires que nécessaire pour le(s) même(s) jour(s) en cliquant sur la phrase « ajouter des horaires »\n'
          + '3. Ajouter un lieu à chaque ligne. Vous n’avez pas d’adresse fixe mais êtes mobile de manière récurrentes, en cliquant en haut sur « indiquer des emplacements », c’est possible ! Attention néanmoins, pour les rdv spéciaux qui ne sont pas hebdomadaires ou les marchés… nous vous invitons à créer par la suite des pages événements dédiés à chacune de vos actions. Ces pages événements vous permettront de donner plus d’infos aux visiteurs et d’être visible dans l’agenda. Pour ajouter un lieu, indiquez l’adresse dans l’espace dédié et cliquez n’importe où sur l’écran pour valider. L’adresse s’affichera alors dans un bloc grisé.\n'
          + '4. une erreur ? un horaire qui n’existe plus ? Tout est modifiable et, si besoin, vous pouvez totalement supprimer la ligne grâce à l\'icone poubelle\n\n'
      + 'Vous avez rempli votre 1ere ligne mais il vous reste d’autres jours à indiquer ? Cliquez sur le + et ajoutez autant de ligne que nécessaire\n')}>
            <InfoIcon />
          </Tooltip>
        </Typography>
        <Typography className={styles.helperText}>Si vous faites de l’accueil du public, ou si vous avez un standard téléphonique</Typography>
        <SchedulerContainer
          onChange={setOpeningHours}
          initData={actorData && actorData?.actor?.openingHours}
        />


        <p />
  {/*
        <TitleWithTooltip
          title={(
            <p>
              CONTACT PRIVE pour les échanges avec
              {' '}
              <i>OUAAA!</i>
            </p>
          )}
        />

        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="gender"
            name="contact"
            value={valueContactId}
            onChange={radioChangeHandler}
          >
            <FormControlLabel
              value="me"
              control={<Radio />}
              label="C'est moi "
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label={(
                <>
                  c’est un autre (avec un compte
                  {' '}
                  <i>OUAAA!</i>
                  {' '}
                  existant)
                </>
              )}
            />
          </RadioGroup>
          <p>
            {showOtherContact ? (
              <Autocomplete
                id="combo-box-demo"
                options={dataUsers && dataUsers.users}
                // @ts-ignore
                onInput={inputChangeHandler}
                open={showOtherContactList}
                // @ts-ignore
                getOptionLabel={(option) => `${option.surname} ${option.lastname}`}
                onChange={autocompleteHandler}
                defaultValue={getDefaultValueContact()}
                style={{ width: 300 }}
                // eslint-disable-next-line react/jsx-props-no-spreading
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Contact OUAAA!"
                    variant="outlined"
                    placeholder="Tapez les 3 premières lettres"
                  />
                )}
                noOptionsText="Pas de compte associé"
                clearText="Effacer"
                closeText="Fermer"
              />
            ) : (
              ''
            )}
          </p>
        </FormControl>

      
            */}

      


        {
          /* @ts-ignore */
          dataCollections.collections
          /* @ts-ignore */
          && dataCollections.collections.map((collection) => {
            if (!collection.actor) return '';
            if (collection.code === 'larochelle_quarter') return '';
            if (collection.code === 'category') return '';
            if (collection.code === 'actor_status') return '';
            //    const [display, setDisplay] = useState(false);
            let { label } = collection;
            let helperText;
            if (collection.code === 'public_target') {
              label =
                'Public';
              helperText =
                'Ici nous vous proposons de choisir votre public principal. Bien sûr à chaque action (événement, campagne…) que vous créerez vous pourrez indiquer des publics différents. de votre public principal. Tout public = familles ; Jeunes adultes = 15-25 ans, étudiants ; précaires = SDF, familles en difficulté, etc. ; discriminés = femmes, LGBTQIA+, migrants, etc';
            } else if (collection.code === 'collectif') {
              label =
                'Membre de collectifs ou réseaux :';
              helperText =
                'Sont référencés ici des collectifs et réseaux du territoire. Les groupes locaux de réseaux nationaux (ex Greenpeace) ne sont pas inclus dans cette liste';
            } else if (collection.code === 'actor_location_action') {
              label = "Périmètre d'action (1 seul choix) *";
              helperText =
                'Si vous êtes une antenne, le territoire d’action est celui qui concerne votre structure chapeau (ex : Greenpeace, choisir « International »)';
            }
            let defaultValue = '';
            if (
              !IsTree(collection)
              && !collection.multipleSelection
              && formValues
              && formValues.entries
            ) {
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
            }
            return (
              <div key={collection.code}>
                <TitleWithTooltip
                  title={label}
                  tooltipTitle={helperText}
                  collection
                />
                {
                  // display &&
                  IsTree(collection) && (
                    // @ts-ignore
                    <Entries initValues={initentriesWithInformation}>
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
                                icon={entry.icon}
                                hideCheckBox
                                isForm
                                isParent
                                hasSubEntries={
                                  entry.subEntries
                                  && entry.subEntries.length > 0
                                }
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
                                        icon={subEntry.icon}
                                        color={entry.color}
                                        formValues={updateFormValues}
                                        categoryChange={formChangeHandler}
                                        linkDescription={
                                          isEntriesWithInformationContains(
                                            formValues.entriesWithInformation,
                                            subEntry.id,
                                          ) !== null
                                            ? isEntriesWithInformationContains(
                                              formValues.entriesWithInformation,
                                              subEntry.id,
                                            ).linkDescription
                                            : ''
                                        }
                                        isForm
                                        checked={
                                          formValues
                                          && formValues.entriesWithInformation
                                          && isEntriesWithInformationContains(
                                            formValues.entriesWithInformation,
                                            subEntry.id,
                                          ) !== null
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
                              {/* @ts-ignore */}
                              <Checkbox
                                edge="start"
                                tabIndex={-1}
                                disableRipple
                                onChange={formChangeHandler}
                                name="entries"
                                value={entry.id}
                                // @ts-ignore
                                checked={
                                  formValues
                                  && formValues.entries
                                  && formValues.entries.includes(entry.id)
                                }
                                onClick={(e) => e.stopPropagation()}
                              />
                              <ListItemText primary={entry.label} />
                              
                            </ListItem>
                          );
                        })}
                    </List>
                  )
                }
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
          title="Nos recherches en bénévolat :"
          tooltipTitle="Décrivez ici les missions de bénévolat générales chez vous ou sur un de
          vos projets spécifiques afin de donner envie aux visiteurs de cliquer sur «je deviens
          bénévole» de votre page."
        />

        <p />
        {editorLoaded ? (
          <>
            <CKEditor
              config={{
                toolbar: ['bold', 'italic', 'link'],
              }}
              editor={ClassicEditor}
              data={formValues.volunteerDescription}
              onReady={(editor) => {
                setVolunteerEditor(editor);
              }}
            />
          </>
        ) : (
          <div>Editor loading</div>
        )}
        <TitleWithTooltip
          title="Référent(s) associé(s) à l’acteur"
          tooltipTitle="Permet d’ajouter d’autres référents pour un acteur"
        />

        <Grid container>
          <List className={styles.referentList}>
            {
              // @ts-ignore
              (formValues?.referents || []).map((referent) => {
                return (
                  <ListItem key={referent.id}>
                    <ListItemIcon>
                      <Avatar>
                        {referent.lastname[0] + referent.surname[0]}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      id={`referent-list-${referent.id}`}
                      primary={`${referent.lastname} ${referent.surname}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => handleClickDeleteReferent(referent)} size="large">
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
            onClick={handleClickAddReferent}
            size="large">
            <AddCircleOutline />
          </IconButton>

          {showAddReferent && (
            <Autocomplete
              id="combo-box-add-referent"
              options={dataUsers.users}
              // @ts-ignore
              getOptionLabel={(option) => `${option.surname} ${option.lastname}`}
              onChange={handleChangeReferent}
              open={openAddReferentlist}
              style={{ width: 300 }}
              // @ts-ignore
              onInput={inputChangeHandler}
              // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Référents"
                  variant="outlined"
                  name="referents"
                />
              )}
            />
          )}
        </Grid>

        <br />

        <FormControlLabel
          control={
            <Checkbox
              value="remember"
              color="primary"
              onChange={handleEnableOpenData}
              checked={enableOpenData}

            />
          }
          label="Gagner en visibilité en autorisant votre commune, transicope ou une autre plateforme à afficher vos événements et informations acteurs."
        />
        <br /> <br />

        <Grid item xs={12}>

          {!editLoading && (
            <ClassicButton
              onClick={submitHandler}
              fullWidth
              disabled={!validationResult?.global || user == null}
            >
              Mettre à jour cet acteur
            </ClassicButton>
          )}
          {editLoading && (
            <CircularProgress />
          )}
          {!deleteLoading && (
            <ClassicButton
              fullWidth
              variant="contained"
              className={styles.delete}
              onClick={handleClickOpen}
            >
              Supprimer cet acteur
            </ClassicButton>
          )}
          {deleteLoading && (
            <CircularProgress />
          )}


          <Dialog
            open={openDeletePopup}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Êtes-vous sûr(e) de vouloir supprimer cet acteur ?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Une fois supprimé, cet acteur sera définitivement supprimé. Il
                ne sera plus visible sur notre plateforme, ni pour vous, ni pour
                les visiteurs.
              </DialogContentText>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked onClick={() => setdeleteActorAndEvent(!deleteActorAndEvent)} />} label="je souhaite également supprimer les actions dont l'acteur est l'unique référent" />
              </FormGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Annuler
              </Button>
              <Button onClick={submitDeleteActor} color="primary" autoFocus>
                Supprimer
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Container>
    </>;
  };

  return (
    <div>
      <FormController render={Form} validationRules={validationRules} />
    </div>
  );
};

export default withDndProvider(withRouter(withApollo()(EditActorForm)));
