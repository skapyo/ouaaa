import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';
import {withApollo} from 'hoc/withApollo';
import {Card, Container, Grid, makeStyles, TextField, Typography,} from '@material-ui/core';
import ClassicButton from 'components/buttons/ClassicButton';
import FormController, {
  RenderCallback,
  ValidationRules,
  ValidationRuleType,
} from 'components/controllers/FormController';
import useGraphQLErrorDisplay from 'hooks/useGraphQLErrorDisplay';
import Checkbox from '@material-ui/core/Checkbox';
import useCookieRedirection from 'hooks/useCookieRedirection';
import {useSnackbar} from 'notistack';
import GooglePlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import {useRouter, withRouter} from 'next/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse/Collapse';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FallbackPageNotFound from 'containers/fallbacks/FallbackPageNotFound';
import {useSessionState} from '../../context/session/session';
import Icon from "@material-ui/core/Icon";
import ImageCropper from 'components/ImageCropper/ImageCropper'
import useDnDStateManager from '../../hooks/useDnDStateManager';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import {getImageUrl} from 'utils/utils';
import useImageReader from '../../hooks/useImageReader';
import {useDrag, useDrop} from "react-dnd";
import HeightIcon from "@material-ui/core/SvgIcon/SvgIcon";
import DeleteIcon from '@material-ui/icons/Delete';
import {useDropArea} from "react-use";
import withDndProvider from "../../hoc/withDnDProvider";

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

  },dropZone:{
    padding : "1em",
    margin :"2em"
  },
  image:{
    width:'100%',
    height:'100%'
  },
  main :{
    textAlign:"center"
  },label: {
    fontWeight: 600,
  },
}));

const EDIT_EVENT = gql`
  mutation editEvent(
    $eventInfos: EventInfos, $eventId: Int!,$pictures:[InputPictureType],$description:String!
  ) {
    editEvent(
      eventInfos: $eventInfos, eventId: $eventId,,pictures: $pictures,description:$description
    ) {
      id
      label
      short_description
      facebookUrl
      description
      startedAt
      endedAt
      published
      lat
      lng
    }
  }
`;

const GET_CATEGORIES = gql`
  query categories {
    categories {
      id,
      label,
      activated
      subCategories {
        id
        label
        icon
      }
    }
  }
`;

const GET_EVENT = gql`
  query event($id: String!) {
    event(id: $id) {
      id
      label
      short_description
      facebookUrl
      description
      startedAt
      endedAt
      published
      categories {
        id
        label
      }
      lat
      lng
      address
      postCode
      city
      pictures{
        id,
        label,
        originalPicturePath,
        originalPictureFilename,
        croppedPicturePath,
        croppedPictureFilename,
        croppedX,
        croppedY,
        croppedZoom,
        croppedRotation,
        position
      },
      categories{
        id,
        label,
        parentCategory{
          label
        },
        subCategories{
          label
        }
      }
    }
  }
`;

const DELETE_EVENT = gql`
  mutation deleteEvent($eventId: Int!) {
    deleteEvent(
      eventId: $eventId
    )
  }
`;

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

const EditEventForm = (props) => {
  const validationRules: ValidationRules = {
    label: {
      rule: ValidationRuleType.required,
    },
    shortDescription: {
      rule: ValidationRuleType.required && ValidationRuleType.minLength,
      minLimit: 50,
    }
  };

  const { loading: eventLoading, error: eventError, data: eventData } = useQuery(GET_EVENT, {
    variables: { id: props.id.toString() },
  });

  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [deleteEvent, { data: deleteData, error: deleteError, loading: deleteLoading }] = useMutation(DELETE_EVENT);
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
      enqueueSnackbar('La suppression de l\'événement a échoué.', {
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
    const { data: categoryData, loading: categoryLoading, error: categoryError } = useQuery(
        GET_CATEGORIES,
    );
    useGraphQLErrorDisplay(error);
    const styles = useStyles();
    const redirect = useCookieRedirection();
    const user = useSessionState();
    const [state, setState] = React.useState({});
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [validated, setValidated] = useState(false);
    const [dateChange, setDateChange] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = React.useState<Date | null>(
        moment().add(1, 'hour').toDate(),
    );
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
      if ((selectedStartDate && selectedEndDate && (selectedStartDate >= selectedEndDate))
          || (selectedStartDate && moment(selectedStartDate) <= moment())
          || !formValues.shortDescription
          || !formValues.description
          // || !formValues.categories
          // || formValues.categories?.length === 0
          || (!address && !city)) setValidated(false);
      else setValidated(true);
    });

    const handleChange = (category: any, event: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [category.id.toString()]: event.target.checked });
    };
    const [checked, setChecked] = useState([0]);
    const [openCategory, setOpenCategory] = React.useState([false]);
    const handleToggle = (value: number, index: number) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked);
      openCategory[index] = !openCategory[index];
    };

    const editorRef = useRef()
    const [ editorLoaded, setEditorLoaded ] = useState( false )
    // @ts-ignore
    const { CKEditor, ClassicEditor } = editorRef.current || {}

    useEffect( () => {
      // @ts-ignore
      editorRef.current = {
        CKEditor: require( '@ckeditor/ckeditor5-react' ).CKEditor,
        ClassicEditor: require( '@ckeditor/ckeditor5-build-classic' )

      }
      setEditorLoaded( true )
    }, [] )

    const [descriptionEditor, setDescriptionEditor] = useState()

    const getObjectLongName = (results, name) => {
      if (!results || !results[0] || !results[0].address_components) { return (''); }
      const object = results[0].address_components.find((element) => element.types.find((type) => type == name) != undefined);
      if (object == undefined) { return (''); }
      return object.long_name;
    };

    const getAddressDetails = (results) => {
      setAddress((`${getObjectLongName(results, 'street_number')} ${getObjectLongName(results, 'route')}`).trim());
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
      formValues.shortDescription = eventData.event.short_description;
      formValues.description = eventData.event.description;
      formValues.address = eventData.event.address;
      formValues.postCode = eventData.event.postCode;
      formValues.city = eventData.event.city;
      formValues.lat = eventData.event.lat;
      formValues.lng = eventData.event.lng;
      setAddress(eventData.event.address);
      setCity(eventData.event.city);
      setSelectedStartDate(new Date(parseInt(eventData.event.startedAt)));
      setSelectedEndDate(new Date(parseInt(eventData.event.endedAt)));
      var categories = [];
      eventData.event.categories.forEach((actorcategory) => {
        // @ts-ignore
        categories.push(actorcategory.id)
      });

      // @ts-ignore
      formValues.categories =categories;
    };
    if (firstRender) {
      initFormValues();
    }
    if (firstRender && !eventLoading && !eventError) {
      updateFormValues();
      setFirstRender(false);
    }

    const [setImagesList, loading, result,imagesListState] = useImageReader();

    var imgInit = [];
    if(eventData && eventData.event.pictures && eventData.event.pictures.length > 0 ) {

      imgInit = eventData.event.pictures.sort((a, b) => a.position > b.position ? 1 : -1).map((picture, index) => {

        return {
          id: index,
          file: null,
          img: getImageUrl(picture.originalPicturePath),
          croppedImg: {
            crop: {
              x: picture.croppedX,
              y: picture.croppedY
            },
            rotation: picture.croppedRotation,
            zoom: picture.croppedZoom,
            file: null,
            img: getImageUrl(picture.croppedPicturePath),
            modified: false
          },
          activated: true,
          deleted: false,
          newpic: false,
          serverId: picture.id,
          position:picture.position,
        };
      });
    }
    const ImagesDropZone = ({onDropHandler}) => {

      const [bond, state] = useDropArea({
        onFiles: files => onDropHandler(files)
      });

      return (
          <Card className={styles.dropZone}>
            <Grid container alignItems="center">
              <Grid item xs={12} >
                <div {...bond}>
                  <div >
                    <InsertPhotoIcon />
                  </div>
                  <div >
                    Déposer les images ici au format jpg. La première image sera aussi l'image de couverture ...
                  </div>
                </div>
              </Grid>
            </Grid>
          </Card>
      );
    };

    const {
      objectsList,
      moveObject,
      findObject,
      updateActiveIndicator,
      updateDeletedIndicator,
      initState,
      addValues,
      updateKeyIndicator
    } = useDnDStateManager(imgInit);


    const submitHandler = () => {
      var files ;

      const checkboxes = Object.keys(state);
      let categoriesArray: number[];
      categoriesArray = [];
      checkboxes.forEach((key) => {
        if (state[key]) { categoriesArray.push(parseInt(key)); }
      });
      if(objectsList)
        files = objectsList.map((object) =>{
          // return object.file
          return {
            id : object.serverId,
            newpic : object.newpic,
            deleted : object.deleted,
            file : {
              originalPicture:object.file,
              croppedPicture:object.croppedImg.file,
              croppedPictureModified : object.croppedImg.modified,
              croppedX:object.croppedImg.crop.x,
              croppedY:object.croppedImg.crop.y,
              croppedZoom:object.croppedImg.zoom,
              croppedRotation:object.croppedImg.rotation
            }
          }
        });
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
            categories: formValues.categories,
            lat: parseFloat(formValues.lat),
            lng: parseFloat(formValues.lng),
            address,
            postCode: formValues.postCode,
            city,

          },
          eventId: parseInt(eventData.event.id),
          pictures:files,
          // @ts-ignore
          description:descriptionEditor.getData()
        },
      });
    };
    const ImagesDisplay = ({cards,moveCard,findCard,updateActiveIndicator,updateDeletedIndicator,updateKeyIndicator}) => {
      // console.log('cards');
      // console.log(cards);
      // console.log('--cards--');
      return (
          <Grid container alignItems="center"
              // justify='center'
                spacing={3}>
            {
              cards.map((file) => (
                  <ImagePrev
                      id={file.id}
                      key={`image${file.id}`}
                      originalImg = {file.img}
                      croppedImg = {file.croppedImg}
                      moveCard={moveCard}
                      findCard={findCard}
                      deletedIconClickHandler={updateDeletedIndicator}
                      updateKeyIndicator={updateKeyIndicator}
                      deleted = {file.deleted}
                      file={file}
                  />

              ))
            }
          </Grid>
      );

    };
    const ItemTypes = {
      PIC: "pic"
    };
    const ImagePrev = ({file,originalImg,croppedImg,moveCard,findCard,id,deletedIconClickHandler,deleted,updateKeyIndicator}) => {

      const originalIndex = findCard(id).index;

      const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.PIC, id, originalIndex },
        collect: monitor => ({
          isDragging: monitor.isDragging()
        })
      });

      {/* @ts-ignore */}
      const [, drop] = useDrop({
        accept: ItemTypes.PIC,
        canDrop: () => false,
        // @ts-ignore
        hover({ id: draggedId }) {
          if (draggedId !== id) {
            const { index: overIndex } = findCard(id);
            moveCard(draggedId, overIndex);
          }
        }
      });

      const opacity =  1 ;

      //gestion de la modal du cropper
      const [modalOpened, setOpenedInd] = useState(false);
      const openModal = () => {
        setOpenedInd(true);
      };


      return (
          <Grid item xs={3} >
            <div className='card'  ref={node => drag(drop(node))}  style={{ opacity}} >
              <Card>
                <img  src={croppedImg.img} className={styles.image} />
              </Card>
              <Card>
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <HeightIcon  onClick={() => openModal()}/>
                  </Grid>
                  <Grid item xs={3}>
                    <DeleteIcon color={deleted? 'primary' : 'action' } onClick={() => deletedIconClickHandler(id)}/>
                  </Grid>
                </Grid>
              </Card>
              <ImageCropper
                  updateKeyIndicator={updateKeyIndicator}
                  id={id}
                  croppedImg = {file.croppedImg}
                  src={originalImg}
                  open={modalOpened}
                  onClose={() => setOpenedInd(false) }
              />
            </div>
          </Grid>
      );

    };

      //gestion de la modal du cropper
      const [modalOpened, setOpenedInd] = useState(false);
      const openModal = () => {
        setOpenedInd(true);
      };



      useEffect(() => {
        if(result)
          addValues(result);
        // @ts-ignore
      },result)

      const onDropHandler = useCallback((files) => {
        // @ts-ignore
        setImagesList(files);
      },[setImagesList]);

    return (
        <Container component="main" maxWidth="sm"   className={styles.main}>
          <Typography
              className={styles.field}
              color="secondary"
              variant="h6"
          >
            Éditer un événement
          </Typography>
          <FormItem
              label="Nom de l'événement"
              inputName="label"
              formChangeHandler={formChangeHandler}
              value={formValues.label}
              required
              errorBool={!validationResult?.global && !!validationResult?.result.label}
              errorText="Nom de l'événement requis."
          />
          <FormItem
              label="Lien Facebook de l'événement"
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
              errorBool={!validationResult?.global && !!validationResult?.result.shortDescription}
              errorText={`Minimum 50 caractères. ${50 - formValues.shortDescription?.length} caractères restants minimum.`}
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
                    error={dateChange&& !!selectedStartDate && moment(selectedStartDate) <= moment(Date.now())}
                    helperText={(dateChange && selectedStartDate && moment(selectedStartDate) <= moment(Date.now())) ? 'La date de début ne peut être dans le passé.' : ''}
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
                    error={dateChange && !!selectedStartDate && (moment(selectedStartDate) <= moment())}
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
                    error={dateChange && !!selectedStartDate && !!selectedEndDate && (moment(selectedStartDate) >= moment(selectedEndDate))}
                    helperText={dateChange&& selectedStartDate && selectedEndDate && (selectedStartDate >= selectedEndDate) ? 'La date de fin doit être après la date de début.' : ''}
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
                    error={dateChange && !!selectedStartDate && !!selectedEndDate && (moment(selectedStartDate) >= moment(selectedEndDate))}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>
          <p/>
          <Grid>
            <Typography>Catégorie(s) de l'événement *</Typography>
            <List className={styles.field}>
              {typeof categoryData !== 'undefined' && categoryData.categories.map((category, index) => (
                  <div>
                    <ListItem key={category.id} role={undefined} dense button onClick={handleToggle(0, index)}>
                      <ListItemIcon />
                      <ListItemText primary={category.label} />
                      {openCategory[index] ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    {typeof category.subCategories !== 'undefined' && category.subCategories != null && category.subCategories.map((subcategory, subIndex) => (
                        <Collapse in={openCategory[index]} timeout="auto" unmountOnExit>

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
                                    checked={ formValues && formValues.categories && formValues.categories.includes(subcategory.id)}
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
          </Grid>
          <Grid className={styles.location}>
            <Typography>Lieu</Typography>
            <GooglePlacesAutocomplete
                placeholder="Taper et sélectionner l'adresse*"
                initialValue={formValues.address && formValues.address.concat(' ').concat(formValues.postCode).concat(' ').concat(formValues.city)}
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
            <Typography variant="body1" color="primary" >
                <Icon/>
                Images de l'événement
            </Typography>
            <br />
            { objectsList?
                < ImagesDisplay
                    cards = {objectsList}
                    moveCard = {moveObject}
                    findCard = {findObject}
                    updateActiveIndicator = {updateActiveIndicator}
                    updateDeletedIndicator = {updateDeletedIndicator}
                    updateKeyIndicator = {updateKeyIndicator}
                /> : null }
            < ImagesDropZone onDropHandler={onDropHandler} />

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
            <DialogTitle id="alert-dialog-title">Êtes-vous sûr(e) de vouloir supprimer cet événement ?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Une fois supprimé, cet événement sera définitivement supprimé.
                Il ne sera plus visible sur notre plateforme, ni pour vous, ni pour les visiteurs.
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
    return (null);
  }
  if (eventError) {
    return (<FallbackPageNotFound />);
  }
  return (
      <FormController
          render={Form}
          validationRules={validationRules}
      />
  );
};

export default withDndProvider(withRouter(withApollo()(EditEventForm)));
