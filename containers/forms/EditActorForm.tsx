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
import { useDropArea } from 'react-use';
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
import DeleteIcon from '@material-ui/icons/Delete';
import HeightIcon from '@material-ui/icons/Height';

import ImageCropper from 'components/ImageCropper/ImageCropper';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { getImageUrl } from 'utils/utils';
import { useDrag, useDrop } from 'react-dnd';
import useImageReader from '../../hooks/useImageReader';
import useDnDStateManager from '../../hooks/useDnDStateManager';
import useCookieRedirection from '../../hooks/useCookieRedirection';
import {
  ValidationRules,
  ValidationRuleType,
} from '../../components/controllers/FormController';
import withDndProvider from '../../hoc/withDnDProvider';

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

  const ImagesDropZone = ({ onDropHandler }) => {
    const [bond, state] = useDropArea({
      onFiles: (files) => onDropHandler(files),
    });

    const uploadInputRef = useRef(null);

    // @ts-ignore

    return (
      <Card className={styles.dropZone}>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <div {...bond}>
              <div>
                <InsertPhotoIcon />
              </div>
              <div>Déposer les images ici au format jpg.</div>
            </div>
            <p />
            <input
              ref={uploadInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              // @ts-ignore
              onChange={(e) => onDropHandler([e.target.files[0]])}
            />
            <p />
            <Button
              // @ts-ignore
              onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
              variant="contained"
            >
              <p />
              Ou cliquer ici pour téléverser une image
            </Button>
            <p />
            <div>La première image sera aussi l'image de couverture .</div>
          </Grid>
        </Grid>
      </Card>
    );
  };
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
  const ItemTypes = {
    PIC: 'pic',
  };

  const ImagesDisplay = ({
    cards,
    moveCard,
    findCard,
    updateDeletedIndicator,
    updateKeyIndicator,
  }) => {
    return (
      <Grid
        container
        alignItems="center"
        // justify='center'
        spacing={3}
      >
        {cards.map((file) => (
          <ImagePrev
            id={file.id}
            key={`image${file.id}`}
            originalImg={file.img}
            croppedImg={file.croppedImg}
            moveCard={moveCard}
            findCard={findCard}
            deletedIconClickHandler={updateDeletedIndicator}
            updateKeyIndicator={updateKeyIndicator}
            deleted={file.deleted}
            file={file}
          />
        ))}
      </Grid>
    );
  };

  const ImagePrev = ({
    file,
    originalImg,
    croppedImg,
    moveCard,
    findCard,
    id,
    deletedIconClickHandler,
    deleted,
    updateKeyIndicator,
  }) => {
    const originalIndex = findCard(id).index;

    const [, drag] = useDrag({
      item: { type: ItemTypes.PIC, id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    {
      /* @ts-ignore */
    }
    const [, drop] = useDrop({
      accept: ItemTypes.PIC,
      canDrop: () => false,
      // @ts-ignore
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    });

    const opacity = 1;

    // gestion de la modal du cropper
    const [modalOpened, setOpenedInd] = useState(false);
    const openModal = () => {
      setOpenedInd(true);
    };

    return (
      <Grid item xs={3}>
        <div
          className="card"
          ref={(node) => drag(drop(node))}
          style={{ opacity }}
        >
          <Card>
            <img src={croppedImg.img} className={styles.image} />
          </Card>
          <Card>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <HeightIcon onClick={() => openModal()} />
              </Grid>
              <Grid item xs={3}>
                <DeleteIcon
                  color={deleted ? 'primary' : 'action'}
                  onClick={() => deletedIconClickHandler(id)}
                />
              </Grid>
            </Grid>
          </Card>
          <ImageCropper
            updateKeyIndicator={updateKeyIndicator}
            id={id}
            croppedImg={file.croppedImg}
            src={originalImg}
            open={modalOpened}
            onClose={() => setOpenedInd(false)}
          />
        </div>
      </Grid>
    );
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
        <ImagesDropZone onDropHandler={onDropHandler} />

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
