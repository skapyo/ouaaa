/* eslint react/prop-types: 0 */
import { useMutation, useQuery } from '@apollo/client';
import {
  Container, Grid, makeStyles, Typography,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TreeView from '@material-ui/lab/TreeView';
import ClassicButton from 'components/buttons/ClassicButton';
import FormController, { RenderCallback } from 'components/controllers/FormController';
import TextField from 'components/form/TextField';
import { useSessionDispatch, useSessionState } from 'context/session/session';
import { default as gql, default as graphqlTag } from 'graphql-tag';
import { withApollo } from 'hoc/withApollo';
import { useRouter, withRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, {
  ChangeEvent, useCallback, useEffect, useRef, useState,
} from 'react';
import { useCookies } from 'react-cookie';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { Redirect } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Autocomplete } from '@material-ui/lab';
import useCookieRedirection from '../../hooks/useCookieRedirection';
import Link from '../../components/Link';
import StyledTreeItem from '../../components/filters/StyledTreeItem';
import { QueryOptions, ValidationRules, ValidationRuleType } from '../../components/controllers/FormController';

const CREATE_ACTOR = gql`
  mutation createActor($formValues: ActorInfos,$userId: Int!,$description:String!) {
    createActor(actorInfos: $formValues,userId: $userId,description:$description) { 
      id
      name
      email
      phone
      address
      postCode
      city
      website,
      socialNetwork 
      description
      lat
      lng
    }
  }
`;

const GET_COLLECTIONS = gql`
{ collections
  {   id,
      code,
      label,
      multipleSelection,
      position,
      actor
      entries {
          id,
          label
          subEntries {
              id,
              label
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
    short_description,
    createdAt,
    updatedAt,
    socialNetwork,
    city,
    lat,
    lng,
    categories{
      label
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
}));

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
  });
  const { data: dataUsers } = useQuery(GET_USERS, {
  });
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
  const {
    loading: loadingCollections,
    error: errorCollections,
  } = useQuery(GET_COLLECTIONS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setDataCollections(data);
    },
  });
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

    // @ts-ignore
    const { CKEditor, ClassicEditor } = editorRef.current || {};
    const [descriptionEditor, setDescriptionEditor] = useState();
    const [volunteerEditor, setVolunteerEditor] = useState();

    const [estlarochelle, setEstlarochelle] = useState(false);
    const [create, { data: createData, loading: createLoading, error: createError }] = useMutation(CREATE_ACTOR);

    useEffect(() => {
      // @ts-ignore
      editorRef.current = {
        CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
        ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),

      };
      setEditorLoaded(true);
    }, []);

    const submitHandler = useCallback(() => {
      create({
        variables: {
          formValues,
          // @ts-ignore
          description: descriptionEditor.getData(),
          // @ts-ignore
          volunteer: volunteerEditor.getData(),
          userId: parseInt(user.id),
        },
      });
    }, [formValues, create, descriptionEditor]);
    useEffect(() => {
      if (!createError && !createLoading && createData) {
        enqueueSnackbar('Acteur ajouté avec succès.', {
          preventDuplicate: true,
        });
        router.push(`/actor/${createData.createActor.id}`);
      }
    }, [createLoading, createError, createData]);

    const getObjectLongName = (results, name) => {
      if (!results || !results[0] || !results[0].address_components) { return (''); }
      const object = results[0].address_components.find((element) => element.types.find((type) => type == name) != undefined);
      if (object == undefined) { return (''); }
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
      formValues.address = (`${getObjectLongName(results, 'street_number')} ${getObjectLongName(results, 'route')}`).trim();
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
        { dataAdminActors && dataAdminActors.actorsAdmin.length > 0 && (

        <Typography>
          Bravo. Vous avez déjà créé des pages acteurs.
          {' '}
          <br />
          Cliquez sur leurs noms pour éditer la page :
          {dataAdminActors.actorsAdmin.map((actor) => {
            { /* @ts-ignore */ }
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

          Vous pouvez créer un autre acteur en remplissant le formulaire ci dessous :
          <br />
          <br />
        </Typography>
        )}
        <Typography variant="h2" color="primary" className={styles.label}> Coordonnées </Typography>
        <FormItem
          label="Nom de l'acteur"
          inputName="name"
          formChangeHandler={formChangeHandler}
          value={formValues.name}
          required
          errorBool={!validationResult?.global && !!validationResult?.result.name}
          errorText="Nom de l'acteur requis."
        />
        <FormItem
          label="Email"
          inputName="email"
          formChangeHandler={formChangeHandler}
          value={formValues.email}
          required
          errorBool={!!formValues.email && !validationResult?.global && !!validationResult?.result.email}
          errorText="Format de l'email invalide."
        />
        <FormItem
          label="Téléphone"
          inputName="phone"
          formChangeHandler={formChangeHandler}
          value={formValues.phone}
          required={false}
          errorBool={!validationResult?.global && !!validationResult?.result.phone}
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
              initialValue={formValues.address ? formValues.address.concat(' ').concat(formValues.postCode).concat(' ').concat(formValues.city) : formValues.city && formValues.city}
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
        </div>
        { /* @ts-ignore */ }
        {dataCollections.collections && dataCollections.collections.map((collection) => {
          if (collection.code !== 'larochelle_quarter' || !estlarochelle) return '';

          //    const [display, setDisplay] = useState(false);
          return (
            <div>
              <br />
              <Typography
                className={classes.collectionLabel}
              >
                {collection.label}
              </Typography>
              { // display &&
             !IsTree(collection) && !collection.multipleSelection && (

             <FormControl component="fieldset">
               <RadioGroup row aria-label="gender" name="gender1">
                 {collection.entries && collection.entries.map((entry) => {
                   return (
                     <FormControlLabel value={entry.id} control={<Radio />} label={entry.label} />
                   );
                 })}

               </RadioGroup>
             </FormControl>

             )
          }

            </div>
          );
        })}
        <Typography variant="body1" color="primary" className={styles.label}>
          Jour et heure d'ouverture
        </Typography>
        <Typography variant="body1" color="primary" className={styles.label}>
          CONTACT PRIVE pour les échanges avec Ouaaa
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup row aria-label="gender" name="contact" onChange={radioChangeHandler}>
            <FormControlLabel value="me" control={<Radio />} label="C'est moi " />
            <FormControlLabel value="other" control={<Radio />} label="c’est un autre (avec un compte Ouaaa existant)" />
            { showOtherContact ? (
              <Autocomplete
                id="combo-box-demo"
                options={dataUsers.users}
                   // @ts-ignore
                getOptionLabel={(option) => `${option.surname} ${option.lastname}`}
                style={{ width: 300 }}
                // eslint-disable-next-line react/jsx-props-no-spreading
                renderInput={(params) => <TextField {...params} label="Contact Ouaaa" variant="outlined" />}
              />
            ) : ('')}
          </RadioGroup>
        </FormControl>

        <Typography variant="body1" color="primary" className={styles.label}>
          Description :
        </Typography>
        <p />
        { editorLoaded ? (
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
          Nos recherches en bénévolat : :
        </Typography>
        <p />
        { editorLoaded ? (
          <CKEditor
            editor={ClassicEditor}
            data={formValues.volunteer}
            onReady={(editor) => {
              setVolunteerEditor(editor);
            }}
          />
        ) : (
          <div>Editor loading</div>
        )}

        { /* @ts-ignore */ }
        {dataCollections.collections && dataCollections.collections.map((collection) => {
          if (collection.code === 'larochelle_quarter') return '';
          //    const [display, setDisplay] = useState(false);
          return (
            <div>
              <br />
              <Typography
                className={classes.collectionLabel}
              >
                {collection.label}
              </Typography>
              { // display &&
            IsTree(collection) && (
            <TreeView
              className={classes.rootTree}
              defaultCollapseIcon={<ArrowDropDownIcon />}
              defaultExpandIcon={<ArrowRightIcon />}
              defaultEndIcon={<div style={{ width: 24 }} />}
            >

              {collection.entries && collection.entries.map((entry) => {
                return (
                // @ts-ignore
                  <StyledTreeItem
                    key={entry.id}
                    nodeId={entry.id}
                    labelText={entry.label}
                    hideCheckBox
                  >
                    {entry.subEntries && entry.subEntries.map((subEntry) => {
                      return (
                        <StyledTreeItem
                          key={subEntry.id}
                           // @ts-ignore
                          nodeId={subEntry.id}
                          labelText={subEntry.label}
                          categoryChange={formChangeHandler}
                        />
                      );
                    })}
                  </StyledTreeItem>
                );
              })}
            </TreeView>
            )
}

              { // display &&
             !IsTree(collection) && collection.multipleSelection && (
             <List>
               {collection.entries && collection.entries.map((entry) => {
                 return (
                   <ListItem
                     key={entry.id}
                     role={undefined}
                     dense
                   >
                     <ListItemText primary={entry.label} />
                     <Checkbox
                       edge="start"
                       tabIndex={-1}
                       disableRipple
                       onChange={formChangeHandler}
                       name="entries"
                       value={entry.id}
                       onClick={(e) => (e.stopPropagation())}
                     />
                   </ListItem>
                 );
               })}
             </List>
             )
          }
              { // display &&
             !IsTree(collection) && !collection.multipleSelection && (

             <FormControl component="fieldset">
               <RadioGroup row aria-label="gender" name="gender1">
                 {collection.entries && collection.entries.map((entry) => {
                   return (
                     <FormControlLabel value={entry.id} control={<Radio />} label={entry.label} />
                   );
                 })}

               </RadioGroup>
             </FormControl>

             )
          }

            </div>
          );
        })}
        <br />
        <div>Une fois créé, vous pourrez modifier les informations et ajouter des photos dans votre espace acteur</div>
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

  return (
    <FormController
      render={Form}
      validationRules={validationRules}
    />
  );
};

export default withRouter(withApollo()(AddActorForm));
