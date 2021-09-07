/* eslint react/prop-types: 0 */
import { useMutation, useQuery } from '@apollo/client';
import {
  Container,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import InfoIcon from '@material-ui/icons/Info';
import CustomRadioGroup from 'components/form/CustomRadioGroup';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TreeView from '@material-ui/lab/TreeView';
import ClassicButton from 'components/buttons/ClassicButton';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import FormController, {
  RenderCallback,
} from 'components/controllers/FormController';
import TextField from 'components/form/TextField';
import { useSessionDispatch, useSessionState } from 'context/session/session';
import { default as gql, default as graphqlTag } from 'graphql-tag';
import { withApollo } from 'hoc/withApollo';
import { useRouter, withRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';
import { Redirect } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Autocomplete } from '@material-ui/lab';
import ImagesDropZone from 'components/ImageCropper/ImagesDropZone';
import ImagesDisplay from 'components/ImageCropper/ImagesDisplay';
import Hidden from '@material-ui/core/Hidden';
import useCookieRedirection from '../../hooks/useCookieRedirection';
import Link from '../../components/Link';
import StyledTreeItem from '../../components/filters/StyledTreeItem';
import {
  QueryOptions,
  ValidationRules,
  ValidationRuleType,
} from '../../components/controllers/FormController';
import useImageReader from '../../hooks/useImageReader';
import useDnDStateManager from '../../hooks/useDnDStateManager';
import withDndProvider from '../../hoc/withDnDProvider';
import Entries from './Entries';
import RadioGroupForContext from './RadioGroupForContext';
import SchedulerContainer from './BusinessHoursForm/SchedulerContainer';

const CREATE_ACTOR = gql`
  mutation createActor(
    $formValues: ActorInfos
    $userId: Int!
    $description: String!
    $volunteerDescription: String
    $logoPictures: [InputPictureType]
    $mainPictures: [InputPictureType]
    $pictures: [InputPictureType]
    $openingHours: [InputOpeningHour]
  ) {
    createActor(
      actorInfos: $formValues
      userId: $userId
      description: $description
      volunteerDescription: $volunteerDescription
      pictures: $pictures
      mainPictures: $mainPictures
      logoPictures: $logoPictures
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
      description
      lat
      lng
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
const GET_ACTORS = graphqlTag`

  query actorsAdmin (
    $userId: String!
  )
  { actorsAdmin(userId: $userId)
  {   id,
    name,
    address,
    shortDescription,
    createdAt,
    updatedAt,
    socialNetwork,
    city,
    lat,
    lng,
    contact{
      id
    }
    referents{
      surname,
      lastname,
      email,
      phone
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
const resultLabel = 'createActor';

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
  collectionLabel: {
    textAlign: 'center',
    color: '#2C367E',
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
  introduction: {
    textAlign: 'justify',
  },
  helperText: {
    lineHeight: '1.66',
    fontSize: '0.75rem',
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'justify',
  },
  fab: {
    backgroundColor: '#2C367E',
    color: 'white',
    '&:hover': {
      backgroundColor: '#2C367E',
      color: 'white',
      cursor: "default"
    },
  },
  editIcon: {
    width: "15px",
    height: "15px"
  }
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
    helperText,
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
      helperText={errorBool ? errorText : helperText}
    />
  );
};

const AddActorForm = () => {
  const user = useSessionState();
  const sessionDispatch = useSessionDispatch();
  const redirect = useCookieRedirection();
  const styles = useStyles();
  const [checked, setChecked] = useState([0]);
  const classes = useStyles();
  const router = useRouter();
  const { data: dataAdminActors } = useQuery(GET_ACTORS, {
    variables: {
      userId: user.id,
    },
    fetchPolicy: 'no-cache',
  });
  const { data: dataUsers } = useQuery(GET_USERS, {});
  const [open, setOpen] = React.useState([false]);
  const [cookies, setCookie, removeCookie] = useCookies();

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
    phone: {
      rule: ValidationRuleType.only && ValidationRuleType.maxLength,
      maxLimit: 10,
    },
    shortDescription: {
      rule: ValidationRuleType.only && ValidationRuleType.maxLength,
      maxLimit: 90,
    },
    description: {
      rule: ValidationRuleType.required && ValidationRuleType.minLength,
      minLimit: 120,
    },
  };

  const Form: RenderCallback = ({
    formChangeHandler,
    validationResult,
    formValues,
  }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const editorRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [showOtherContact, setShowOtherContact] = useState(false);
    const [showOtherContactList, setShowOtherContactList] = useState(false);

    // @ts-ignore
    const { CKEditor, ClassicEditor, Alignment } = editorRef.current || {};
    const [descriptionEditor, setDescriptionEditor] = useState();
    const [volunteerEditor, setVolunteerEditor] = useState();
    const [openingHours, setOpeningHours] = useState();

    const [estlarochelle, setEstlarochelle] = useState(false);
    const [
      create,
      { data: createData, loading: createLoading, error: createError },
    ] = useMutation(CREATE_ACTOR);
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
        return true;
      }
      return false;
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
    } = useDnDStateManager([]);

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
    } = useDnDStateManager([]);

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

    useEffect(() => {
      // @ts-ignore
      editorRef.current = {
        CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
        ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
      };
      setEditorLoaded(true);
    }, []);

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

      create({
        variables: {
          formValues,
          // @ts-ignore
          description: descriptionEditor.getData(),
          // @ts-ignore
          volunteerDescription: volunteerEditor.getData(),
          userId: parseInt(user.id),
          logoPictures,
          mainPictures,
          pictures,
          openingHours,
        },
      });
    }, [
      formValues,
      create,
      descriptionEditor,
      objectsListLogo,
      objectsList,
      objectsListMain, openingHours
    ]);
    useEffect(() => {
      if (!createError && !createLoading && createData) {
        enqueueSnackbar('Acteur ajouté avec succès.', {
          preventDuplicate: true,
        });
        router.push(`/actor/${createData.createActor.id}`);
      }
    }, [createLoading, createError, createData]);

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
    const radioChangeHandler = (results, name) => {
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
      if (formValues.postCode === '17000') {
        setEstlarochelle(true);
      } else {
        setEstlarochelle(false);
      }
    };

    return (
      <Container component="main" maxWidth="sm">
        <br />
        <Typography className={styles.introduction}>
          Félicitations, vous avez un compte <i>OUAAA!</i> personnel et vous vous apprêtez à créer une page Acteur.
          {' '}
          <br />
          Voici quelques informations : avec votre compte, vous  pouvez créer plusieurs pages Acteurs,
          mais chacune d’elles doit être créée via ce formulaire.
          Vous deviendrez alors l’administrateur principal de chacune d’entre elles.
          <br />
          Un acteur de la transition peut avoir n’importe quel statut juridique,
          les collectifs et particuliers peuvent donc aussi être référencés
          sur <i>OUAAA!</i>.
          <br />
          <br />

          Nous vous invitons à lire notre
          {' '}
          <a href="/charter">charte</a>
          {' '}
          afin de savoir si vous
          adhérez aux valeurs de <i>OUAAA!</i>. Pour soumettre votre inscription, nous vous
          invitons à remplir à minima les champs marqués d’une « * ».
          {' '}
          <br />
          {' '}
          Une fois votre
          inscription validée par notre équipe, votre page acteur sera visible
          de tous les visiteurs de <i>OUAAA!</i>
          <br />
          <br />
          Vous pourrez actualiser les infos de votre/vos page(s) Acteurs dès que nécessaire
          via votre espace acteur (rubrique « administrer mes pages acteurs »)
          via  <Fab size="small" className={styles.fab} aria-label="edit">
            <EditIcon className={styles.editIcon} />
          </Fab>  accessible directement depuis votre page acteur.
        </Typography>
        <br />
        <br />
        {dataAdminActors && dataAdminActors.actorsAdmin.length > 0 && (
          <Typography>
            Bravo. Vous avez déjà créé des pages acteurs.
            {' '}
            <br />
            Cliquez sur leurs noms pour éditer la page :
            {dataAdminActors.actorsAdmin.map((actor) => {
              {
                /* @ts-ignore */
              }
              return (
                <Typography>
                  {/* @ts-ignore */}
                  <Link href={`/actorAdmin/actor/${actor.id}`}>
                    {actor.name}
                  </Link>
                  {' '}
                </Typography>
              );
            })}
            <br />
            Vous pouvez créer un autre acteur en remplissant le formulaire ci
            dessous :
            <br />
            <br />
          </Typography>
        )}
        <Typography variant="h2" color="primary" className={styles.label}>
          {' '}
          Coordonnées
          {' '}
        </Typography>
        <FormItem
          label="Nom de l'acteur"
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
            !!formValues.email
            && !validationResult?.global
            && !!validationResult?.result.email
          }
          errorText="Format de l'email invalide."
        />
        <FormItem
          label="Téléphone"
          inputName="phone"
          formChangeHandler={formChangeHandler}
          value={formValues.phone}
          required={false}
          errorBool={
            !validationResult?.global && !!validationResult?.result.phone
          }
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
          value={formValues.website}
          required={false}
          errorBool={false}
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
            if (collection.code !== 'larochelle_quarter' || !estlarochelle) {
              return '';
            }

            //    const [display, setDisplay] = useState(false);
            return (

              <div>
                <br />
                <Typography className={classes.collectionLabel}>
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
        <br />
        <Typography variant="body1" color="primary" className={styles.label}>
          Jour et heure d'ouverture
        </Typography>
        <SchedulerContainer onChange={setOpeningHours} />
        <p />
        <br />
        <Typography variant="body1" color="primary" className={styles.label}>
          CONTACT PRIVE pour les échanges avec <i>OUAAA!</i>
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="gender"
            name="contact"
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
              label={
                <>
                  c’est un autre (avec un compte <i>OUAAA!</i> existant)
                </>
              }
            />

          </RadioGroup>
          <p>
            {showOtherContact ? (
              <Autocomplete
                id="combo-box-demo"
                options={dataUsers.users}
                // @ts-ignore
                getOptionLabel={(option) => `${option.surname} ${option.lastname}`}
                onChange={autocompleteHandler}
                // @ts-ignore
                onInput={inputChangeHandler}
                open={showOtherContactList}
                style={{ width: 300 }}

                // eslint-disable-next-line react/jsx-props-no-spreading
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Contact OUAAA!"
                    variant="outlined"
                    placeholder="Tapez les 3 premières lettre du contact"
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

        <FormItem
          label="Métier / Activité principale"
          inputName="activity"
          formChangeHandler={formChangeHandler}
          value={formValues.activity}
          required={false}
          errorBool={false}
          errorText=""
          helperText="Indiquez ici votre métier ou activité principale. Cette info servira à mieux référencer votre page dans les moteurs de recherche. Ex : boulanger bio"
        />

        <Typography variant="body1" color="primary" className={styles.label}>
          Votre logo &nbsp;
          <Tooltip title="Une seule photo de logo possible, vous pouvez supprimer celle affichée via la poubelle puis en télécharger une nouvelle. Seul le format JPG est accepté. Veuillez à ce que le fichier n’excède pas 4Mo">
            <InfoIcon />
          </Tooltip>
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

        <Typography variant="body1" color="primary" className={styles.label}>
          Photo principale &nbsp;
          <Tooltip title="Une seule photo principale est possible, vous pouvez supprimer celle affichée via la poubelle puis en télécharger une nouvelle. Seul le format JPG est accepté. Veuillez à ce que le fichier n’excède pas 4Mo">
            <InfoIcon />
          </Tooltip>
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

        <Typography variant="body1" color="primary" className={styles.label}>
          Autres photos &nbsp;
          <Tooltip title="Vous pouvez supprimer l'image affichée via la poubelle puis en télécharger une nouvelle. Seul le format JPG est accepté. Veuillez à ce que chaque fichier n’excède pas 4Mo">
            <InfoIcon />
          </Tooltip>
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

        <p />
        <FormItem
          label="Description courte générale"
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

        <Typography variant="body1" color="primary" className={styles.label}>
          Description
        </Typography>
        <br />
        <Typography className={styles.helperText}>
          Cette description longue est intégrée à votre page acteur. Elle se
          veut la plus explicite et détaillée possible. Un langage simple,
          des mots compréhensibles de tous, vous permettront d’expliquer
          de manière didactique vos liens avec les questions de transition,
          vos missions/actions, votre organisation, etc. Au delà de l’accès
          à une information claire pour tous les internautes (y compris en
          situation de handicap) utilisant OUAAA !, ce texte permettra
          un meilleur référencement de votre page dans le moteur de
          recherche interne. Pour cela, pensez à utiliser des mots clé du
          champ sémantique de votre activité. Ex : vous êtes une
          asso de recyclerie : zéro déchet, réutilisation, matière,
          matériaux, économie circulaire, upcycling, nouvelle vie, objet,
          dépôt, vente, réinsertion….
        </Typography>
        <br />
        {editorLoaded ? (
          <>
            <Hidden mdDown>
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
            </Hidden>
            <Hidden lgUp>
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
            </Hidden>
          </>
        ) : (
          <div>Editor loading</div>
        )}
        <Typography variant="body1" color="primary" className={styles.label}>
          Nos recherches en bénévolat :
          {' '}
          <Tooltip title="
          Décrivez ici les missions de bénévolat générales chez vous ou sur un de
          vos projets spécifiques afin de donner envie aux visiteurs de cliquer sur «je deviens
          bénévole» de votre page."
          >
            <InfoIcon />
          </Tooltip>
        </Typography>
        <p />

        {editorLoaded ? (
          <>
            <Hidden mdDown>
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
            </Hidden>
            <Hidden lgUp>
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
            </Hidden>
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
              helperText = 'Vous avez la possibilité d’ajouter un texte libre pour expliquer votre lien au sujet choisi. Vous pouvez sélectionner autant de sujets que nécessaire, les 3 premiers que vous cocherez serviront à référencer votre page dans les moteurs de recherche. le 1er coché indiquera votre sujet principal.';
            } else if (collection.code === 'actor_status') {
              label = 'Quel est votre statut ?';
              helperText = 'service public : toutes les collectivités, mairies, cda, cdc participant directement ou via des projets à la transition / ex : la rochelle territoire zéro carbone entreprise : tous les acteurs économiques de la transition, de l’economie sociale et solidaire... association & ONG  : toutes les structures à but non lucratif';
            } else if (collection.code === 'public_target') {
              label = 'Quel public visez vous principalement dans vos actions ?';
              helperText = 'Ici nous vous proposons de choisir votre public principal. Bien sûr à chaque action (événement, campagne…) que vous créerez vous pourrez indiquer des publics différents. de votre public principal. Tout public = familles ; Jeunes adultes = 15-25 ans, étudiants ; précaires = SDF, familles en difficulté, etc. ; discriminés = femmes, LGBTQIA+, migrants, etc';
            } else if (collection.code === 'collectif') {
              label = 'En tant qu’acteur, je fais partie des collectifs & réseaux suivants :';
              helperText = 'Sont référencés ici des collectifs et réseaux du territoire. Les groupes locaux de réseaux nationaux (ex Greenpeace) ne sont pas inclus dans cette liste';
            } else if (collection.code === 'actor_location_action') {
              label = "Territoire d'action (1 seul choix) *";
              helperText = 'Si vous êtes une antenne, le territoire d’action est celui qui concerne votre structure chapeau (ex : Greenpeace, choisir « International »)';
            }

            return (
              <div>
                <br />
                <Typography className={classes.collectionLabel}>
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
                        className={classes.rootTree}
                        defaultCollapseIcon={<ArrowDropDownIcon />}
                        defaultExpandIcon={<ArrowRightIcon />}
                        defaultEndIcon={<div style={{ width: 24 }} />}
                        defaultExpanded={collection.entries && collection.entries.map((entry) => { return entry.id; })}
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
                                description={entry.description}
                                icon={entry.icon}
                                isForm
                                bgColor="grey"
                                className={classes.treeParent}
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
                                        description={subEntry.description}
                                        icon={subEntry.icon}
                                        color={entry.color}
                                        isForm
                                        checked={
                                          formValues
                                          && formValues.entriesWithInformation
                                          && isEntriesWithInformationContains(
                                            formValues.entriesWithInformation,
                                            subEntry.id,
                                          )
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
        <div>
          Une fois créé, vous pourrez modifier les informations et ajouter des
          photos dans votre espace acteur
        </div>
        <p />
        <Grid item xs={12}>
          <ClassicButton
            onClick={submitHandler}
            disabled={!validationResult?.global}
          >
            Créer le nouvel acteur
          </ClassicButton>
        </Grid>
      </Container>
    );
  };

  const afterUpdate = useCallback(
    (formValues) => {
      <Redirect to="/" />;
    },
    [sessionDispatch],
  );

  const queryOptions: QueryOptions = {
    query: CREATE_ACTOR,
    resultLabel,
    snackbarSucceedMessage: 'Acteur ajouté avec succès.',
    mutationResultControl: 'builtin',
    afterResultControlCallback: useCallback(
      (data, error) => {
        if (!error) {
          router.push(`/actor/${data.createActor.id}`);
        }
      },
      [router],
    ),

    clearFormvaluesAfterControl: true,
  };

  return <FormController render={Form} validationRules={validationRules} />;
};

export default withDndProvider(withRouter(withApollo()(AddActorForm)));
