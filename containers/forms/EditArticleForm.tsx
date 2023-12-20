import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'hoc/withApollo';
import { Container, Grid, TextField, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ClassicButton from 'components/buttons/ClassicButton';
import FormController, {
  RenderCallback,
  ValidationRules,
  ValidationRuleType,
} from 'components/controllers/FormController';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation, useQuery } from '@apollo/client';
import { getImageUrl } from 'utils/utils';
import useGraphQLErrorDisplay from 'hooks/useGraphQLErrorDisplay';
import useCookieRedirection from 'hooks/useCookieRedirection';
import { useSnackbar } from 'notistack';
import FallbackPageNotFound from 'containers/fallbacks/FallbackPageNotFound';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import DeleteIcon from '@mui/icons-material/Delete';
import ImagesDisplay from 'components/ImageCropper/ImagesDisplay';
import ImagesDropZone from 'components/ImageCropper/ImagesDropZone';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Autocomplete } from '@mui/material';
import useImageReader from '../../hooks/useImageReader';
import useDnDStateManager from '../../hooks/useDnDStateManager';
import { useSessionState } from '../../context/session/session';
import withDndProvider from '../../hoc/withDnDProvider';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

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
  delete: {
    background: 'none',
    color: theme.palette.warning.main,
    border: '1px solid',
    borderColor: theme.palette.warning.main,
    '&:hover': {
      background: 'none',
    },
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
  label: {
    fontWeight: 600,
  },
  collectionLabel: {
    textAlign: 'center',
    color: '#2C367E',
    fontWeight: 600,
  },
  justify: {
    textAlign: 'justify',
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
    width: '100%',
  },
  checkbox: {
    padding: '0px!important',
  },
  container: {
    textAlign: 'center',
  },
  tooltip: {
    marginLeft: '10px',
  },
}));

const EDITArticle = gql`
  mutation editArticle(
    $articleInfos: ArticleInfos
    $articleId: Int!
    $userId: Int!
    $content: String!
    $mainPictures: [InputPictureType]
    $pictures: [InputPictureType]
  ) {
    editArticle(
      articleInfos: $articleInfos
      articleId:$articleId
      userId: $userId
      content: $content
      mainPictures: $mainPictures
      pictures: $pictures
    ) {
      id
      label
      content
      pictures {
        id
        label
        originalPicturePath
        originalPictureFilename
        position
        logo
        main
      }
    }
  }
`;
const GET_ARTICLE = gql`
  query article(
    $id: String!
  ) {
    article(
      id: $id
    ) {
      id
      label
      content
      shortDescription
      bannerPrincipalPicture
      actors{
        id
        name
        referents{
          id
        }
      }
      pictures {
        id
        label
        originalPicturePath
        originalPictureFilename
        position
        logo
        main
      }
    }
  }
`;
const GET_ACTORS = gql`
query actors {
  actors {
    id
    name
    pictures {
      originalPicturePath
      logo
    }
  }
}
`;


const DELETE_ARTICLE = gql`
  mutation deleteArticle($articleId: Int!) {
    deleteArticle(articleId: $articleId)
  }
`;

type FormItemProps = {
  label: string;
  inputName: string;
  formChangeHandler: (Article: ChangeArticle) => void;
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


const TitleWithTooltip = (props: TitleWithTooltipProps) => {
  const { title, tooltipTitle, collection = false } = props;
  const styles = useStyles();

  return (
    <Grid container justifyContent="center" alignItems="center" className={styles.titleContainer}>
      <Typography color="primary" className={classnames(collection ? styles.collectionLabel : styles.label, styles.labelDefault)}>
        {title}
      </Typography>
      {
        !!tooltipTitle
        && (
        <Tooltip title={tooltipTitle} color="primary" className={styles.tooltip}>
          <InfoIcon />
        </Tooltip>
        )
      }
    </Grid>
  );
};

const EditArticleForm = (props) => {
  const validationRules: ValidationRules = {
    label: {
      rule: ValidationRuleType.required,
    },
    shortDescription: {
      rule: ValidationRuleType.required && ValidationRuleType.maxLength,
      maxLimit: 90,
    },
  };
  const user = useSessionState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  function containUserActorsReferent(actors) {
    let isContained = false;
    if (user !== null) {
      actors.forEach((actor) => {
        (actor.referents || []).forEach((element) => {
          if (element.id == user.id) {
            isContained = true;
          }
        });
      });
    }
    return isContained;
  }
  const {
    loading: articleLoading,
    error: articleError,
    data: articleData,
  } = useQuery(GET_ARTICLE, {
    variables: { id: props.id.toString() },
    fetchPolicy: 'no-cache',
    onCompleted: (dataArticle) => {
      if (user === undefined || user == null) {
        enqueueSnackbar(
          'Veuillez vous connecter pour effectuer des modifications.',
          {
            preventDuplicate: true,
          },
        );
        router.push('/');
      } else if (!(containUserActorsReferent(dataArticle.article.actors)  ||  user.role === 'admin')) {
        enqueueSnackbar(
          "Vous n'avez pas les droits d'éditer cet événenement",
          {
            preventDuplicate: true,
          },
        );
        router.push('/');
      }
    },
  });

  const imgInitMain = [];
  if (
    articleData
    && articleData.article.pictures
    && articleData.article.pictures.length > 0
  ) {
    articleData.article.pictures
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
  const imgInit = [];
  if (
    articleData
    && articleData.article.pictures
    && articleData.article.pictures.length > 0
  ) {
    articleData.article.pictures
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


  const [
    deleteArticle,
    { data: deleteData, error: deleteError, loading: deleteLoading },
  ] = useMutation(DELETE_ARTICLE);
  const [open, setOpen] = React.useState(false);

  const handleClickOpenDeleteDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitDeleteArticle = () => {
    deleteArticle({
      variables: {
        articleId: parseInt(props.id),
      },
    });
    setOpen(false);
  };

  useEffect(() => {
    if (!deleteLoading && deleteData?.deleteArticle) {
      enqueueSnackbar('Article supprimé.', {
        preventDuplicate: true,
      });
      router.push('/actorAdmin/article');
    } else if (deleteError) {
      enqueueSnackbar("La suppression de l'article a échoué.", {
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
    const [editArticle, { data, error }] = useMutation(EDITArticle);
   
    const router = useRouter();

    useGraphQLErrorDisplay(error);
    const styles = useStyles();
    const redirect = useCookieRedirection();
    const [state, setState] = React.useState({});
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [bannerPrincipalPicture, setBannerPrincipalPicture] = useState(true);

    
    const [validated, setValidated] = useState(false);
    const [showAddActor, setShowAddActor] = useState(false);
    const [actors] = useState([]);
    const [showOtherActors, setShowOtherActors] = useState(false);
    const [actorsId] = useState([]);

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
   
    const { data: dataActors } = useQuery(GET_ACTORS, {});
    
    
    const [firstRender, setFirstRender] = useState(true);
   const validateForm = () => {
      if (
        !formValues.shortDescription ||
        !formValues.label
        || !descriptionEditor?.getData()
      ) setValidated(false);
      else setValidated(true);
    };
    const initFormValues = () => {
      formValues.label = '';
      formValues.shortDescription = '';
      formValues.content = '';
      setBannerPrincipalPicture(false);
    };
    const updateFormValues = () => {
      formValues.label = articleData.article.label;
      formValues.content = articleData.article.content;
      formValues.shortDescription = articleData.article.shortDescription;
      formValues.actors = articleData.article.actors;
      setBannerPrincipalPicture(articleData.article.bannerPrincipalPicture);
      validateForm();
    };
    if (firstRender) {
      initFormValues();
    }
    if (firstRender && !articleLoading && !articleError) {
      updateFormValues();
      setFirstRender(false);
    }

    const handleClickAddActor = useCallback(() => {
      setShowAddActor(!showAddActor);
    }, [showAddActor]);

    const handleClickDeleteActor = useCallback((actor) => {
      // @ts-ignore
      let currentActors = [...formValues.actors];
      // @ts-ignore
      currentActors = currentActors.filter((item) => item.id !== actor.id);
      formChangeHandler({
        target: {
          // @ts-ignore
          value: currentActors,
          name: 'actors',
        },
      });
    }, [formValues]);


    if (user === undefined || user == null) {
      enqueueSnackbar(
        'Veuillez vous connecter pour éditer un article.',
        {
          preventDuplicate: true,
        },
      );
      router.push('/');
    }
    const inputChangeHandler = useCallback((Article) => {
      if (Article.target.value) {
        if (Article.target.value.length < 3) {
          if (Article.target.name === 'actors') {
            setOpenAddActorlist(false);
          } else {
            setShowOtherContactList(false);
          }
        } else if (Article.target.name === 'actors') {
          setOpenAddActorlist(true);
        } else {
          setShowOtherContactList(true);
        }
      }
    }, []);


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

    const [openAddActorlist, setOpenAddActorlist] = useState(false);

    useEffect(() => {
      if (data) {
        enqueueSnackbar('Article modifié avec succès.', {
          prArticleDuplicate: true,
        });
        router.push(`/article/${data.editArticle.id}`);
      }
    }, [data]);

    useEffect(() => {
      validateForm();
  
    });
  
    const [
      setImagesMainList,
      loadingMain,
      resultMain,
      imagesMainListState,
    ] = useImageReader();

    const onDropMainHandler = useCallback(
      (files) => {
        // @ts-ignore
        setImagesMainList(files);
      },
      [setImagesMainList],
    );
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

    useEffect(() => {
      if (result) addValues(result);
      // @ts-ignore
    }, result);

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

    const submitHandler = useCallback(async () => {
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
            },
          };
        });
      }
      
      for await (const element of mainPictures.concat(pictures)){
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


      editArticle({
        variables: {
          articleInfos: {
            label: formValues.label,
            shortDescription: formValues.shortDescription,
            bannerPrincipalPicture: bannerPrincipalPicture,
            content: formValues.content,
            published: true,
            // @ts-ignore
            actors: formValues.actors.map((item) => item.id),
          },
          articleId: parseInt(articleData.article.id),
          userId: parseInt(user.id),
          // @ts-ignore
          content: descriptionEditor.getData(),
          mainPictures,
          pictures,
        },
      });
    });



    const handleChangeActor = useCallback((Article, value) => {
      if (value) {
        // @ts-ignore
        const currentActors: string[] = formValues.actors || [];
        currentActors.push(value);
        // @ts-ignore
        formValues.actors = currentActors;
      }
      setShowAddActor(false);
      setOpenAddActorlist(false);
    }, [formValues]);
    function MyCustomUploadAdapterPlugin(editor) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
      };
    }

    class MyUploadAdapter {
      constructor(props) {
        // CKEditor 5's FileLoader instance.
        this.loader = props;
      }

      // Starts the upload process.
      upload() {
         return this.loader.file.then( file => new Promise( ( resolve, reject ) => {
          addPictureArticle({
            variables: {
              picture: {
                newpic: true,
                deleted: false,
                main: true,
                file: {
                  originalPicture: file,
                },
              },
            },
          });

          resolve( {
            default: `${process.env.NEXT_PUBLIC_URI}/static/images/article/${file.name}`
        } );
      }));
      }

      // Aborts the upload process.
      abort() {
      }
    }
    const customConfig = {
      extraPlugins: [MyCustomUploadAdapterPlugin],
      toolbar: {
        items: [
          'heading',
          '|',
          'alignment:left', 'alignment:right', 'alignment:center',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'blockQuote',
          'insertTable',
          '|',
          'undo',
          'redo',
        ],
      },
      //   plugins: [ Alignment],
      alignment: {
        options: ['left', 'right'],
      },
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
      },
    };

    return (
      <Container component="main" maxWidth="sm" className={styles.container}>
        <Typography className={styles.field} color="secondary" variant="h6">
          Edition d'article
        </Typography>
        <FormItem
          label="Nom de l'article"
          inputName="label"
          formChangeHandler={formChangeHandler}
          value={formValues.label}
          required
          errorBool={
            !validationResult?.global && !!validationResult?.result.label
          }
          errorText="Nom de l'article requis."
        />
        <FormItem
          label="Résumé"
          inputName="shortDescription"
          formChangeHandler={formChangeHandler}
          value={formValues.shortDescription}
          required
          errorBool={
            !validationResult?.global
            && !!validationResult?.result.shortDescription
          }
          errorText={`Maximum 90 caractères. ${formValues.shortDescription?.length - 90
          } caractères en trop.`}
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
          text="Déposez ici votre photo principale au format jpg et de poids inférieur à 4Mo"
        />
        <FormControlLabel control={<Switch checked={bannerPrincipalPicture}   name="bannerPrincipalPicture"  onChange={() => setBannerPrincipalPicture(!bannerPrincipalPicture)}  />} label="Image affichée en bandeau" />
        <br />
        <Typography variant="body1" color="primary" className={styles.label}>
          Contenu de l'article *
        </Typography>
        <p />
        {editorLoaded ? (
          <CKEditor
            config={customConfig}
            editor={ClassicEditor}
            data={formValues.content}
            onReady={(editor) => {
              setDescriptionEditor(editor);
            }}
            onChange={(event, editor) => {
              validateForm();
            }}
          />
        ) : (
          <div>Editor loading</div>
        )}
        <br />
        <br />
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
          text="Déposez ici votre autres photos au format jpg et de poids inférieur à 4Mo"
        />
        <br />
        <TitleWithTooltip
          title="Acteur(s) associé(s) à l'article "
          tooltipTitle="Permet d’ajouter d’autres acteurs pour que l'article puisse apparaitre sur leur page"
        />

        <Grid container>
          <List className={styles.actorList}>
            {
              // @ts-ignore
              (formValues?.actors || []).map((actor) => {
                return (
                  <ListItem key={actor.id}>
                    <ListItemIcon>
                      <Avatar>
                        {actor && actor.name.split(' ').length > 1 && (
                          <>
                            {actor.name.split(' ')[0][0]}
                            {actor.name.split(' ')[1][0]}
                          </>
                        )}
                        {actor && actor.name.split(' ').length <= 1 && (
                          <>{actor.name}</>
                        )}
                        {actor.name}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      id={`actor-list-${actor.id}`}
                      primary={`${actor.name}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => handleClickDeleteActor(actor)} size="large">
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
            onClick={handleClickAddActor}
            size="large">
            <AddCircleOutline />
          </IconButton>

          {showAddActor && (
            <Autocomplete
              id="combo-box-add-actor"
              options={dataActors.actors}
              // @ts-ignore
              getOptionLabel={(option) => `${option.name}`}
              onChange={handleChangeActor}
              open={openAddActorlist}
              style={{ width: 300 }}
              // @ts-ignore
              onInput={inputChangeHandler}
              // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Acteurs"
                  variant="outlined"
                  name="actors"
                />
              )}
            />
          )}
        </Grid>

        <ClassicButton
          fullWidth
          variant="contained"
          className={styles.submit}
          onClick={submitHandler}
          disabled={!validationResult?.global || !validated}
        >
          Mettre à jour l'article
        </ClassicButton>
        <ClassicButton
          fullWidth
          variant="contained"
          className={styles.delete}
          onClick={handleClickOpenDeleteDialog}
        >
          Supprimer cet article
        </ClassicButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Êtes-vous sûr(e) de vouloir supprimer cet article ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Une fois supprimé, cette article sera définitivement supprimé. Il
              ne sera plus visible sur notre plateforme, ni pour vous, ni pour
              les visiteurs.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={submitDeleteArticle} color="primary" autoFocus>
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  };
  
  if (articleLoading) {
    return null;
  }
  if (articleError) {
    return <FallbackPageNotFound />;
  }

  return <FormController render={Form} validationRules={validationRules} />;
};

export default withDndProvider(withApollo()(EditArticleForm));
function value(value: any) {
  throw new Error('Function not implemented.');
}
