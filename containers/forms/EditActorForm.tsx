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

import { getImageUrl } from 'utils/utils';

import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ImagesDropZone from 'components/ImageCropper/ImagesDropZone';
import ImagesDisplay from 'components/ImageCropper/ImagesDisplay';


import useImageReader from '../../hooks/useImageReader';
import useDnDStateManager from '../../hooks/useDnDStateManager';

import useCookieRedirection from '../../hooks/useCookieRedirection';
import {
  ValidationRules,
  ValidationRuleType,
} from '../../components/controllers/FormController';
import withDndProvider from '../../hoc/withDnDProvider';
import StyledTreeItem from '../../components/filters/StyledTreeItem';

const EDIT_ACTOR = gql`
  mutation editActor(
    $formValues: ActorInfos
    $actorId: Int!
    $pictures: [InputPictureType]
    $description: String!
  ) {
    editActor(
      actorInfos: $formValues
      actorId: $actorId
      pictures: $pictures
      description: $description
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
      },
      entries{
        id,
        label,
        parentEntry{
            id,
            code,
            label
        },
        subEntries{
            id,
            code,
            label
        },
        collection{
          id,
          code,
          label
        }
    },
    }
  }
`;

const GET_COLLECTIONS = gql`
{ collections
  {   id,
      label,
      multipleSelection,
      position
      entries {
          id,
          label
          subEntries {
              id,
              label
          }
      }
  }
}`;
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
}));

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

const EditActorForm = (props) => {
  const styles = useStyles();

  const [checked, setChecked] = useState([0]);
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
  const {
    loading: loadingCollections,
    error: errorCollections,
  } = useQuery(GET_COLLECTIONS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setDataCollections(data);
    },
  });

  if (actorLoading) return null;
  if (actorError) return `Error! ${actorError.message}`;
  let imgInit = [];
  if (
    actorData
    && actorData.actor.pictures
    && actorData.actor.pictures.length > 0
  ) {
    imgInit = actorData.actor.pictures
      .sort((a, b) => (a.position > b.position ? 1 : -1))
      .map((picture, index) => {
        return {
          id: index,
          file: null,
          img: getImageUrl(picture.originalPicturePath),
          croppedImg: {
            crop: {
              x: picture.croppedX,
              y: picture.croppedY,
            },
            rotation: picture.croppedRotation,
            zoom: picture.croppedZoom,
            file: null,
            img: getImageUrl(picture.croppedPicturePath),
            modified: false,
          },
          activated: true,
          deleted: false,
          newpic: false,
          serverId: picture.id,
          position: picture.position,
        };
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

    const [setImagesList, loading, result, imagesListState] = useImageReader();
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
          // @ts-ignore
          description: descriptionEditor.getData(),
        },
      });
    }, [formValues, edit, objectsList, descriptionEditor]);

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

    const getAddressDetails = (results) => {
      formValues.address = `${getObjectLongName(
        results,
        'street_number',
      )} ${getObjectLongName(results, 'route')}`.trim();
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
      formValues.socialNetwork = actorData.actor.socialNetwork;
      formValues.address = actorData.actor.address;
      formValues.postCode = actorData.actor.postCode;
      formValues.city = actorData.actor.city;
      formValues.lat = actorData.actor.lat;
      formValues.lng = actorData.actor.lng;
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
          label="Site Internet"
          inputName="website"
          formChangeHandler={formChangeHandler}
          required={false}
          errorBool={false}
          value={formValues.website}
          errorText=""
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
        { /* @ts-ignore */ }
        {dataCollections.collections && dataCollections.collections.map((collection) => {
          //    const [display, setDisplay] = useState(false);
          return (
            <div>
              <Typography
                className={styles.collectionLabel}
              >
                {collection.label}
              </Typography>
              { // display &&
            IsTree(collection) && (
            <TreeView
              className={styles.rootTree}
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
                          formValues={updateFormValues}
                          categoryChange={formChangeHandler}
                          checked={
                            formValues
                            && formValues.entries
                            && formValues.entries.includes(subEntry.id)
                          }
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
             !IsTree(collection) && (
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
                         // @ts-ignore
                       checked={
                          formValues
                          && formValues.entries
                          && formValues.entries.includes(entry.id)
                        }
                       onClick={(e) => (e.stopPropagation())}
                     />
                   </ListItem>
                 );
               })}
             </List>
             )
}
            </div>
          );
        })}

        <Typography variant="body1" color="primary" className={styles.label}>
          Sélectionner une catégorie :
        </Typography>
        <List className={styles.field}>
          {typeof data !== 'undefined'
            && data.categories
            && data.categories.map((category, index) => (
              <div>
                <ListItem
                  key={category.id}
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle(0, index)}
                >
                  <ListItemIcon />
                  <ListItemText primary={category.label} />
                  {open[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {typeof category.subCategories !== 'undefined'
                  && category.subCategories != null
                  && category.subCategories.map((subcategory, subIndex) => (
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
                              // @ts-ignore
                              checked={
                                formValues
                                && formValues.categories
                                && formValues.categories.includes(subcategory.id)
                              }
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
        <Typography variant="body1" color="primary">
          <Icon />
          Vos images
        </Typography>
        <br />
        {objectsList ? (
          <ImagesDisplay
            cards={objectsList}
            moveCard={moveObject}
            findCard={findObject}
            updateDeletedIndicator={updateDeletedIndicator}
            updateKeyIndicator={updateKeyIndicator}
          />
        ) : null}
        <ImagesDropZone onDropHandler={onDropHandler} text="Déposer ici les images ici au format jpg." />

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
    <div>
      <FormController render={Form} validationRules={validationRules} />
    </div>
  );
};

export default withDndProvider(withRouter(withApollo()(EditActorForm)));
