import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'hoc/withApollo';
import {
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import ClassicButton from 'components/buttons/ClassicButton';
import FormController, {
  RenderCallback,
  ValidationRules,
  ValidationRuleType,
} from 'components/controllers/FormController';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useMutation, useQuery } from '@apollo/client';
import { getImageUrl } from 'utils/utils';
import useGraphQLErrorDisplay from 'hooks/useGraphQLErrorDisplay';
import useCookieRedirection from 'hooks/useCookieRedirection';
import { useSnackbar } from 'notistack';
import FallbackPageNotFound from 'containers/fallbacks/FallbackPageNotFound';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import List from '@material-ui/core/List';
import DeleteIcon from '@material-ui/icons/Delete';
import ImagesDisplay from 'components/ImageCropper/ImagesDisplay';
import ImagesDropZone from 'components/ImageCropper/ImagesDropZone';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Autocomplete } from '@material-ui/lab';
import useImageReader from '../../hooks/useImageReader';
import useDnDStateManager from '../../hooks/useDnDStateManager';
import { useSessionState } from '../../context/session/session';
import withDndProvider from '../../hoc/withDnDProvider';
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
  ) {
    editArticle(
      articleInfos: $articleInfos
      articleId:$articleId
      userId: $userId
      content: $content
      mainPictures: $mainPictures
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
    };
    const updateFormValues = () => {
      formValues.label = articleData.article.label;
      formValues.content = articleData.article.content;
      formValues.shortDescription = articleData.article.shortDescription;
      formValues.actors = articleData.article.actors;
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

    const submitHandler = () => {
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
      editArticle({
        variables: {
          articleInfos: {
            label: formValues.label,
            shortDescription: formValues.shortDescription,
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
        },
      });
    };



    const handleChangeActor = useCallback((Article, value) => {
      if (value) {
        // @ts-ignore
        const currentActors: string[] = formValues.actors || [];
        currentActors.push(value);
        // @ts-ignore
        formValues.actors = currentActors;
        debugger;
      }
      setShowAddActor(false);
      setOpenAddActorlist(false);
    }, [formValues]);

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
        <br />
        <Typography variant="body1" color="primary" className={styles.label}>
          Contenu de l'article *
        </Typography>
        <p />
        {editorLoaded ? (
          <CKEditor
            config={{
              toolbar: ['bold', 'italic', 'link'],
            }}
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
                      <IconButton onClick={() => handleClickDeleteActor(actor)}>
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
          <IconButton key="close" aria-label="Close" color="inherit" onClick={handleClickAddActor}>
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
