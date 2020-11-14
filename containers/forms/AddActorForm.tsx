/* eslint react/prop-types: 0 */
import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import {Container, Grid, makeStyles, Typography,} from '@material-ui/core';
import TextField from 'components/form/TextField';
import ClassicButton from 'components/buttons/ClassicButton';
import {withApollo} from 'hoc/withApollo';
import {useRouter, withRouter} from 'next/router';
import {useSessionDispatch, useSessionState} from 'context/session/session';
import gql from 'graphql-tag';
import graphqlTag from 'graphql-tag';
import FormController, {RenderCallback} from 'components/controllers/FormController';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import GooglePlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import {useMutation, useQuery} from '@apollo/client';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import {Redirect} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {QueryOptions, ValidationRules, ValidationRuleType} from '../../components/controllers/FormController';
import useCookieRedirection from '../../hooks/useCookieRedirection';
import Link from "../../components/Link";
import {useSnackbar} from "notistack";

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
      website
      description
      lat
      lng
    }
  }
`;
const GET_CATEGORIES = graphqlTag`
    { categories
    {   id,
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
  const { data, loading, error } = useQuery(GET_CATEGORIES, { fetchPolicy: 'network-only' });
  const {data:dataAdminActors } = useQuery(GET_ACTORS, {
    variables: {
      userId: user.id,
    },
  });
  const [open, setOpen] = React.useState([false]);
  const [cookies, setCookie, removeCookie] = useCookies();



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
    const editorRef = useRef()
    const [ editorLoaded, setEditorLoaded ] = useState( false )
    // @ts-ignore
    const { CKEditor, ClassicEditor } = editorRef.current || {}
    const [descriptionEditor, setDescriptionEditor] = useState();
    const [create, { data:createData, loading: createLoading, error:createError }] = useMutation(CREATE_ACTOR);

    useEffect( () => {
      // @ts-ignore
      editorRef.current = {
        CKEditor: require( '@ckeditor/ckeditor5-react' ).CKEditor,
        ClassicEditor: require( '@ckeditor/ckeditor5-build-classic' )

      }
      setEditorLoaded( true )
    }, [] )

    const submitHandler = useCallback(() => {
      create({
        variables: {
          formValues,
          // @ts-ignore
          description:descriptionEditor.getData(),
          userId: parseInt(user.id),
        },
      });

    }, [formValues, create,descriptionEditor]);
    useEffect(() => {
      if (!createError && !createLoading && createData) {
        enqueueSnackbar('Acteur ajouté avec succès.', {
          preventDuplicate: true,
        });
        router.push(`/actor/${createData.createActor.id}`);
      }
    }, [createLoading, createError,createData]);


    const getObjectLongName = (results, name) => {
      if (!results || !results[0] || !results[0].address_components) { return (''); }
      const object = results[0].address_components.find((element) => element.types.find((type) => type == name) != undefined);
      if (object == undefined) { return (''); }
      return object.long_name;
    };

    const getAddressDetails = (results) => {
      formValues.address = (`${getObjectLongName(results, 'street_number')} ${getObjectLongName(results, 'route')}`).trim();
      formValues.city = getObjectLongName(results, 'locality');
      formValues.postCode = getObjectLongName(results, 'postal_code');
    };

    return (
      <Container component="main" maxWidth="sm">
        { dataAdminActors && dataAdminActors.actorsAdmin.length >0 && (

            <Typography>
              Bravo. Vous avez déjà créé des pages acteurs. <br></br>Cliquez sur leurs noms pour éditer la page :
              {dataAdminActors.actorsAdmin.map((actor) => {{/* @ts-ignore */}
                return <Typography><Link href={`/actorAdmin/actor/${actor.id}`}>
                  {actor.name}
                </Link>   </Typography>
              })}

              <br></br>

            Vous pouvez créer un autre acteur en remplissant le formulaire ci dessous :
              <br></br>
              <br></br>
          </Typography>
        )}
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
          label="Site Internet"
          inputName="website"
          formChangeHandler={formChangeHandler}
          value={formValues.website}
          required={false}
          errorBool={false}
          errorText=""
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

        <Typography variant="body1" color="primary" className={styles.label}>
          Sélectionner une catégorie :
        </Typography>
        <List className={styles.field}>
          {typeof data !== 'undefined' && data.categories.map((category, index) => (
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

        <div>Une fois créé, vous pourrez modifier les informations et ajouter des photos dans votre espace acteur</div>
        <p></p>
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
      (formvalues, data, error) => {
        if (!error) {
          router.push(`/actor/${data.createActor.id}`);
        }
      },
      [data, router],
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
