/* eslint react/prop-types: 0 */
import React, {
  ChangeEvent, useCallback, useState, useEffect,
} from 'react';
import {
  Container, Grid, makeStyles, Typography,
} from '@material-ui/core';
import TextField from 'components/form/TextField';
import ClassicButton from 'components/buttons/ClassicButton';
import { withApollo } from 'hoc/withApollo';
import { useRouter, withRouter } from 'next/router';
import gql from 'graphql-tag';
import graphqlTag from 'graphql-tag';
import FormController, { RenderCallback } from 'components/controllers/FormController';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { useQuery, useMutation } from '@apollo/react-hooks';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { useCookies } from 'react-cookie';
import { useSnackbar } from 'notistack';
import { QueryOptions, ValidationRules, ValidationRuleType } from '../../components/controllers/FormController';
import useCookieRedirection from '../../hooks/useCookieRedirection';

const EDIT_ACTOR = gql`
  mutation editActor($formValues: ActorInfos, $actorId: Int!) {
    editActor(actorInfos: $formValues, actorId: $actorId) {
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
      description
      lat
      lng
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
}));

type FormItemProps = {
  label: string
  inputName: string
  formChangeHandler: (event: ChangeEvent) => void
  value: string
  required: boolean
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

const EditActorForm = (props) => {
  const redirect = useCookieRedirection();
  const styles = useStyles();
  const [checked, setChecked] = useState([0]);
  const { data, loading, error } = useQuery(GET_CATEGORIES, { fetchPolicy: 'network-only' });
  const [open, setOpen] = React.useState([false]);
  const [cookies, setCookie, removeCookie] = useCookies();

  const { loading: actorLoading, error: actorError, data: actorData } = useQuery(GET_ACTOR, {
    variables: { id: props.id.toString() },
  });

  if (actorLoading) return null;
  if (actorError) return `Error! ${actorError.message}`;

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
      type: 'number',
      maxLimit: 10,
    },
    description: {
      rule: ValidationRuleType.required && ValidationRuleType.minLength,
      minLimit: 120,
    },
  };

  const Form: RenderCallback = ({
    formChangeHandler,
    formValues,
    validationResult,
  }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [edit, { data: editData, loading: editLoading, error: editError }] = useMutation(EDIT_ACTOR);

    const submitHandler = useCallback(() => {
      edit({
        variables: {
          formValues,
          actorId: parseInt(actorData.actor.id),
        },
      });
    }, [formValues, edit]);

    useEffect(() => {
      if (!editError && !editLoading && editData) {
        enqueueSnackbar('Acteur mis à jour.', {
          preventDuplicate: true,
        });
      }
    }, [editLoading, editError]);

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

    const [firstRender, setFirstRender] = useState(true);
    const updateFormValues = () => {
      formValues.name = actorData.actor.name;
      formValues.email = actorData.actor.email;
      formValues.phone = actorData.actor.phone;
      formValues.website = actorData.actor.website;
      formValues.description = actorData.actor.description;
      formValues.address = actorData.actor.address;
      formValues.postCode = actorData.actor.postCode;
      formValues.city = actorData.actor.city;
      formValues.lat = actorData.actor.lat;
      formValues.lng = actorData.actor.lng;
    };
    if (firstRender) {
      updateFormValues();
      setFirstRender(false);
    }

    return (
      <Container component="main" maxWidth="sm">
        <FormItem
          label="Nom"
          inputName="name"
          formChangeHandler={formChangeHandler}
          value={formValues.name}
          required
          errorBool={!validationResult?.global && validationResult?.result.name}
          errorText="Nom de l'acteur requis."
        />
        <FormItem
          label="Email"
          inputName="email"
          formChangeHandler={formChangeHandler}
          value={formValues.email}
          required
          errorBool={!validationResult?.global && validationResult?.result.email}
          errorText="Format de l'email invalide."
        />
        <FormItem
          label="Téléphone"
          inputName="phone"
          formChangeHandler={formChangeHandler}
          value={formValues.phone}
          errorBool={!validationResult?.global && validationResult?.result.phone}
          errorText="Format du téléphone invalide. Maximum 10 chiffres."
        />
        <FormItem
          label="Site Internet"
          inputName="website"
          formChangeHandler={formChangeHandler}
          value={formValues.website}
        />
        <FormItemTextareaAutosize
          label="Description"
          inputName="description"
          formChangeHandler={formChangeHandler}
          value={formValues.description}
          required
          errorBool={!validationResult?.global && validationResult?.result.description}
          errorText={`Minimum 120 caractères. ${120 - formValues.description?.length} caractères restants.`}
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

        <Typography variant="body1" color="primary" className={styles.label}>
          Sélectionner une catégorie :
        </Typography>
        <List className={styles.field}>
          {typeof data !== 'undefined' && data.categories && data.categories.map((category, index) => (
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

        <Grid item xs={12}>
          <ClassicButton
            onClick={submitHandler}
            disabled={!validationResult?.global}
          >
            Sauvegarder les modifications
          </ClassicButton>
        </Grid>
      </Container>
    );
  };

  return (
    <FormController
      render={Form}
      validationRules={validationRules}
    />
  );
};

export default withRouter(withApollo()(EditActorForm));
