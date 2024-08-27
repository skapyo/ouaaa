/* eslint react/prop-types: 0 */
import { useMutation, useQuery } from '@apollo/client';
import { Container, Grid, IconButton, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import BugReportIcon from '@mui/icons-material/BugReport';
import InfoIcon from '@mui/icons-material/Info';
import CustomRadioGroup from 'components/form/CustomRadioGroup';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Avatar from '@mui/material/Avatar';
import ClassicButton from 'components/buttons/ClassicButton';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ActorForm from '../../containers/forms/ActorForm';
import classnames from 'classnames';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Autocomplete } from '@mui/material';
import ImagesDropZone from 'components/ImageCropper/ImagesDropZone';
import ImagesDisplay from 'components/ImageCropper/ImagesDisplay';
import Hidden from '@mui/material/Hidden';
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

const ADD_STAGE = gql`
  mutation createActor(
    $actorInfos: ActorInfos
    $userId: Int!
    $description: String!
    $volunteerDescription: String
    $logoPictures: [InputPictureType]
    $mainPictures: [InputPictureType]
    $pictures: [InputPictureType]
    $openingHours: [InputOpeningHour]
  ) {
    createActor(
      actorInfos: $actorInfos
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
      url
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
const GET_ACTORS_ADMIN = graphqlTag`

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
    siren,
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
const GET_ACTORS = graphqlTag`
query actors {
  actors {
    id
    name
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
      cursor: 'default',
    },
  },
  editIcon: {
    width: '15px',
    height: '15px',
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
  const [dataActorReferent, setDataActorReferent] = useState(null);
  const { proposeNewActor } = router.query;
  const [addActor, { data, loading, error }] = useMutation(ADD_STAGE);
  const { data: dataAdminActors } = useQuery(GET_ACTORS_ADMIN, {
    variables: {
      userId: user.id,
    },
    fetchPolicy: 'no-cache',
  });
  const { data: datactors } = useQuery(GET_ACTORS, {});
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
  const handleSubmit: SubmitHandler<ActorFields> = useCallback(async (formValues) => {
    const {
      address,
      email,
      phone,
      shortDescription,
      description,
      mainPicture,
      website,
      socialNetwork,
      activity,
      entries,
      entriesWithInformation,
      volunteerDescription,
      siren,
      enableOpenData,
      memberOf,
      referencingActor,
      removeReferencingActor,
      logoPicture,
      pictures,
    } = formValues;

    debugger;
    await uploadPictures([ ...logoPicture,...mainPicture, ...pictures,]);

    addActor({
      variables: {
        actorInfos: {
          name: address.city,
          email,
          phone,
          address: address.address,
          postCode: address.postcode,
          city: address.city,
          shortDescription,
          lat: address.lat,
          lng: address.lng,
          activity,
          website,
          socialNetwork,
          entries,
          entriesWithInformation,
          siren,
          enableOpenData,
          memberOf,
          referencingActor,
          removeReferencingActor
        },
        userId: parseInt(user.id),
        description,
        volunteerDescription,
        mainPictures: mainPicture.map((picture) => ({
          main: true,
          logo: false,
          ...formatPicture(picture),
        })),
        pictures: pictures.map((picture) => ({
          main: false,
          logo: false,
          ...formatPicture(picture),
        })),
        logoPictures: logoPicture.map((picture) => ({
          logo: true,
          main: false,
          ...formatPicture(picture),
        })),
      },
    });
  }, []);

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
    const [charterAccepted, setCharterAccepted] = useState(false);

  
    return (
      <Container component="main" maxWidth="sm">
        <br />
        { proposeNewActor === undefined && (
          <>
        <Typography className={styles.introduction}>
          Avec votre compte personnel, vous pouvez maintenant créer une ou plusieurs « page acteur », 
          pour chacune des structures dont vous êtes membre. 
          Toute personne physique ou morale, organisation privée, publique, de la société civile peut disposer de sa page.
        </Typography>

        <Typography className={styles.introduction}>
          Une fois votre inscription validée par notre équipe, votre page sera visible sur le site.
        <br />
          Complétez les champs ci-dessous, ceux marqués d'une « * » sont indispensables.
          Vous pourrez renseigner les autres ultérieurement et actualiser ces informations avec d'autres personnes que vous pouvez ajouter en référent de la page.
          <br />
          <br />
          Une campagne annuelle de vérification des comptes a lieu afin de
          vérifier la validité des adresses email. A cet effet une prise
          de contact téléphonique peut avoir lieu.
          <br />
          <br />
          Vous pourrez actualiser les infos de votre/vos "page(s) acteurs" via votre espace acteur (rubrique « administrer mes pages
          acteurs ») ou directement via {' '}
          <Fab size="small" className={styles.fab} aria-label="edit">
            <EditIcon className={styles.editIcon} />
          </Fab>{' '}
          , accessible directement depuis votre page acteur.
        </Typography>
        <br />
        <br />
        {dataAdminActors && dataAdminActors.actorsAdmin.length > 0 && (
          <Typography>
            Bravo. Vous avez déjà créé des pages acteurs. <br />
            Cliquez sur leurs noms pour éditer la page :
            {dataAdminActors.actorsAdmin.map((actor) => {
              {
                /* @ts-ignore */
              }
              return (
                <Typography>
                  {/* @ts-ignore */}
                  <Link href={`/admin/actors/${actor.id}`}>
                    {actor.name}
                  </Link>{' '}
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
        </>
        )}
        <ActorForm  loading={loading || data?.createActor}
          submitLabel="Créer la page acteur"
          onSubmit={handleSubmit}
          defaultValues={{ }} / >
      
      </Container>
    );
  };


  return <Form/>;
};

export default withDndProvider(withRouter(withApollo()(AddActorForm)));
