/* eslint react/prop-types: 0 */
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Button,
  Card,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import TextField from 'components/form/TextField';
import CustomRadioGroup from 'components/form/CustomRadioGroup';
import ClassicButton from 'components/buttons/ClassicButton';
import { withApollo } from 'hoc/withApollo';
import { useRouter, withRouter } from 'next/router';
import { gql, useMutation, useQuery } from '@apollo/client';
import graphqlTag from 'graphql-tag';
import FormController, {
  RenderCallback,
} from 'components/controllers/FormController';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { useCookies } from 'react-cookie';
import { useSnackbar } from 'notistack';
import RadioGroup from '@material-ui/core/RadioGroup';
import { getImageUrl } from 'utils/utils';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ImagesDropZone from 'components/ImageCropper/ImagesDropZone';
import ImagesDisplay from 'components/ImageCropper/ImagesDisplay';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import { Autocomplete } from '@material-ui/lab';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import { useSessionDispatch, useSessionState } from 'context/session/session';
import Hidden from '@material-ui/core/Hidden';
import useImageReader from '../../hooks/useImageReader';
import useDnDStateManager from '../../hooks/useDnDStateManager';
import useCookieRedirection from '../../hooks/useCookieRedirection';
import {
  ValidationRules,
  ValidationRuleType,
} from '../../components/controllers/FormController';
import withDndProvider from '../../hoc/withDnDProvider';
import StyledTreeItem from '../../components/filters/StyledTreeItem';
import Entries from './Entries';
import RadioGroupForContext from './RadioGroupForContext';
import UserInfosForm from './UserInfosForm';

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
      shortDescription
      description
      lat
      lng
    }
  }
`;
const GET_CATEGORIES = graphqlTag`
  { 
    categories {
      id,
      label
      icon
      subCategories {
        id
        label
        icon
          subCategories {
          id
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
const GET_USERS = graphqlTag`

  query users 
  { users
  {   id,
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
      categories {
        id
        label
        parentCategory {
          label
        }
        subCategories {
          label
        }
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
      contact_id
      
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
        subEntries {
          id
          label
        }
      }
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: theme.spacing(5),
  },
  label: {
    fontWeight: 600,
  },
  field: {
    marginBottom: theme.spacing(3),
    width: '100%!important',
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

const EditActorForm = (props) => {
  const styles = useStyles();
  const user = useSessionState();
  const [checked, setChecked] = useState([0]);
  const { data: dataUsers } = useQuery(GET_USERS, {});
  const { data } = useQuery(GET_CATEGORIES, {
    fetchPolicy: 'network-only',
  });
  const [open] = React.useState([false]);
  const router = useRouter();
  const {
    loading: actorLoading,
    error: actorError,
    data: actorData,
  } = useQuery(GET_ACTOR, {
    variables: { id: props.id.toString() },
    fetchPolicy: 'network-only',
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
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [
      edit,
      { data: editData, loading: editLoading, error: editError },
    ] = useMutation(EDIT_ACTOR);

    if (user === undefined || user == null) {
      enqueueSnackbar('Veuillez vous connecter pour effectuer des modifications.', {
        preventDuplicate: true,
      });
    }
    const [setImagesList, loading, result, imagesListState] = useImageReader();
    const editorRef = useRef();

    const [editorLoaded, setEditorLoaded] = useState(false);
    
    const [showOtherContact, setShowOtherContact] = useState(
      formValues.contactId !== actorData.actor.id,
    );
    const [showOtherContactList, setShowOtherContactList] = useState(false);
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
    const [volunteerEditor, setVolunteerEditor] = useState();
    const [estlarochelle, setEstlarochelle] = useState(false);
    const [
      setImagesLogoList,
      loadingLogo,
      resultLogo,
      imagesLogoListState,
    ] = useImageReader();

    const inputChangeHandler = (event, value) => {
      if (event.target.value) {
        if (event.target.value.length < 3) {
          setShowOtherContactList(false);
        } else {
          setShowOtherContactList(true);
        }
      }
    };
    const autocompleteHandler = (event, value) => {
      if (value) {
        formValues.contactId = value.id;
      }
      setShowOtherContactList(false);
    };

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

    const submitHandler = useCallback(() => {
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
      edit({
        variables: {
          formValues,
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
        },
      });
    }, [
      formValues,
      edit, ,
      objectsListLogo,
      objectsList,
      objectsListMain,
      descriptionEditor,
      volunteerEditor,
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
    const getAddressDetails = (results) => {
      formValues.address = `${getObjectLongName(
        results,
        'street_number',
      )} ${getObjectLongName(results, 'route')}`.trim();
      formValues.city = getObjectLongName(results, 'locality');
      formValues.postCode = getObjectLongName(results, 'postal_code');
    };

    const [firstRender, setFirstRender] = useState(true);
    const [initentriesWithInformation, setInitentriesWithInformation] = useState([]);

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
      const categories = [];
      actorData.actor.categories.forEach((actorcategory) => {
        // @ts-ignore
        categories.push(actorcategory.id);
      });

      // @ts-ignore
      formValues.categories = categories;

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
        entriesWithInformation.push({ entryId: actorentry.id, linkDescription: actorentry.actorEntries.linkDescription, topSEO: actorentry.actorEntries.topSEO });

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
        return existingEntryInformation;
      }
      return null;
    };
    const getDefaultValueContact = () => {
      let defaultUser;
      if (dataUsers.users !== null) {
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
    // @ts-ignore
    // @ts-ignore

    return (
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
        <div className={styles.field}>
          <Grid className={styles.location}>
            <GooglePlacesAutocomplete
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
            if (collection.code !== 'larochelle_quarter' || !estlarochelle) return '';
            if (!collection.actor) return '';

            //    const [display, setDisplay] = useState(false);
            return (
              <div>
                <br />
                <Typography className={styles.collectionLabel}>
                  {collection.label}
                </Typography>
                {
                  // display &&
                  !IsTree(collection) && !collection.multipleSelection && (
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="entries"
                        name="entries"
                        onChange={formChangeHandler}
                      >
                        {collection.entries
                          && collection.entries.map((entry) => {
                            return (
                              <FormControlLabel
                                value={entry.id}
                                control={<Radio />}
                                label={entry.label}
                              />
                            );
                          })}
                      </RadioGroup>
                    </FormControl>
                  )
                }
              </div>
            );
          })
        }
        <Typography variant="body1" color="primary" className={styles.label}>
          Jour et heure d'ouverture
        </Typography>
        <Typography variant="body1" color="primary" className={styles.label}>
          CONTACT PRIVE pour les échanges avec Ouaaa
        </Typography>
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
              label="c’est un autre (avec un compte Ouaaa existant)"
            />

          </RadioGroup>
          <p>

            {showOtherContact ? (
              <Autocomplete
                id="combo-box-demo"
                options={dataUsers.users}
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
                    label="Contact Ouaaa"
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
        <p />
        <FormItem
          label="Métier / Activité principale"
          inputName="activity"
          formChangeHandler={formChangeHandler}
          value={formValues.activity}
          required={false}
          errorBool={false}
          errorText=""
          helperText="Indiquez ici votre métier ou activité principale. Cette info servira à mieux référencer votre page dans les moteurs de recherches"
        />
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
          text="Déposez ici votre logo au format jpg et de poids inférieur à 2Mo"
        />

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
          text="Déposez ici votre photo principale au  et de poids inférieur à 2Mo"
        />

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
          text="Déposez ici votre autres photos au format jpg et de poids inférieur à 2Mo"
        />
        <p />
        <Tooltip title="Cette description courte s’affiche lors de la vue en liste ou dans les blocs de survol/clic de la carte. Pour qu’elle soit utile, nous vous invitons à synthéser en quelques mots le coeur de vos actions/organisation/missions">
          <FormItem
            label="Description courte générale"
            inputName="shortDescription"
            formChangeHandler={formChangeHandler}
            value={formValues.shortDescription}
            required={false}
            errorBool={
              !validationResult?.global && !!validationResult?.result.shortDescription
            }
            errorText="90 caractères maximum"
          />
        </Tooltip>
        <Typography variant="body1" color="primary" className={styles.label}>
          Description
          {' '}
          <Tooltip title="Cette description longue est intégrée à votre page acteur. Elle se veut la plus explicite et détaillée possible. Un langage simple, des mots compréhensible de tous, vous permettront d’expliquer de manière didactique vos liens avec les questions de transition, vos missions/actions, votre organisation, etc. Au delà à l’accès à une information claire pour tous les internautes (y compris en situation de handicap) utilisant Ouaaa, ce texte permettra un meilleur référencement de votre page dans le moteur de recherche interne. Pour cela, pensez à utiliser des mots clé du champs sémantique de votre activité. Ex : vous êtes une asso de recyclerie : zero déchêt, réutilisation, matière, matériaux, économie circulaire, upcycling, nouvelle vie, objet, dépôt, vente, réinsertion,….">
            <InfoIcon />
          </Tooltip>
        </Typography>
        <p />
        {editorLoaded ? (
          <>
  
              <CKEditor
                config={{
                  toolbar: ['bold', 'italic'],
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
        <Typography variant="body1" color="primary" className={styles.label}>
          Nos recherches en bénévolat :
          {' '}
          <Tooltip title="Décrivez ici les missions de bénévolat générales chez vous ou sur un de vos projet spécifique afin de donner envie aux visiteurs de cliquer sur « je deviens bénévole de votre page »">
            <InfoIcon />
          </Tooltip>
        </Typography>
        <p />
        {editorLoaded ? (
          <>
              <CKEditor
                config={{
                  toolbar: ['bold', 'italic'],
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

        {
          /* @ts-ignore */
          dataCollections.collections
          /* @ts-ignore */
          && dataCollections.collections.map((collection) => {
            if (!collection.actor) return '';
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
              <div>
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
                                        formValues={updateFormValues}
                                        categoryChange={formChangeHandler}
                                        linkDescription={isEntriesWithInformationContains(formValues.entriesWithInformation, subEntry.id) !== null ? isEntriesWithInformationContains(formValues.entriesWithInformation, subEntry.id).linkDescription : ''}
                                        isForm
                                        checked={
                                          formValues
                                          && formValues.entriesWithInformation
                                          && isEntriesWithInformationContains(formValues.entriesWithInformation, subEntry.id) !== null
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
                              <ListItemText primary={entry.label} />
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

        <Grid item xs={12}>
          <ClassicButton
            onClick={submitHandler}
            disabled={!validationResult?.global || user == null}
          >
            Sauvegarder les modifications
          </ClassicButton>
        </Grid>
      </Container>
    );
  };

  return (
    <div>
      <FormController render={Form} validationRules={validationRules} />
    </div>
  );
};

export default withDndProvider(withRouter(withApollo()(EditActorForm)));
