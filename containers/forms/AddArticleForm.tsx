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
import { useMutation, useQuery } from '@apollo/client';
import useGraphQLErrorDisplay from 'hooks/useGraphQLErrorDisplay';
import useCookieRedirection from 'hooks/useCookieRedirection';
import { useSnackbar } from 'notistack';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import ImagesDropZone from 'components/ImageCropper/ImagesDropZone';
import ImagesDisplay from 'components/ImageCropper/ImagesDisplay';
import List from '@mui/material/List';
import DeleteIcon from '@mui/icons-material/Delete';
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
import { useSessionState } from '../../context/session/session';
import useImageReader from '../../hooks/useImageReader';
import useDnDStateManager from '../../hooks/useDnDStateManager';
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

const ADD_ARTICLE = gql`
  mutation createArticle(
    $articleInfos: ArticleInfos
    $actorId: Int!
    $userId: Int!
    $content: String!
    $mainPictures: [InputPictureType]
    $pictures: [InputPictureType]
  ) {
    createArticle(
      articleInfos: $articleInfos
      actorId: $actorId
      userId: $userId
      content: $content
      mainPictures: $mainPictures
      pictures: $pictures
    ) {
      id
      label
      content
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

const GET_ACTOR = gql`
  query actor($id: String!) {
    actor(id: $id) {
      id
      name
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
const AddPictureArticle = gql`
  mutation addPictureArticle($picture: InputPictureType) {
    addPictureArticle(picture: $picture) {
      id
    }
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

const AddArticleForm = ({ actorId }) => {
  const validationRules: ValidationRules = {
    label: {
      rule: ValidationRuleType.required,
    },
    shortDescription: {
      rule: ValidationRuleType.required && ValidationRuleType.maxLength,
      maxLimit: 90,
    },
  };
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
  const Form: RenderCallback = ({
    formChangeHandler,
    validationResult,
    formValues,
  }) => {
    // const { formChangeHandler, formValues, validationResult } = props;
    const [addArticle, { data, error }] = useMutation(ADD_ARTICLE);

    const [addPictureArticle, { data: dataPicture, error: errorPicture }] = useMutation(AddPictureArticle);

    const [showOtherArticleList, setShowOtherArticleList] = useState(false);

    const { data: dataActors } = useQuery(GET_ACTORS, {});

    useGraphQLErrorDisplay(error);
    const styles = useStyles();
    const redirect = useCookieRedirection();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const user = useSessionState();
    const router = useRouter();
    const [state, setState] = React.useState({});
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [validated, setValidated] = useState(false);
    const [showAddActor, setShowAddActor] = useState(false);
    const [actors] = useState([]);
    const [showOtherActors, setShowOtherActors] = useState(false);
    const [actorsId] = useState([]);
    const {
      loading: actorLoading,
      error: actorError,
      data: actorData,
    } = useQuery(GET_ACTOR, {
      variables: { id: actorId },
    });
    const [hasParentArticle, setHasParentArticle] = useState(false);
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
        'Veuillez vous connecter pour créer un article.',
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
    const handleChangeActor = useCallback((Article, value) => {
      if (value) {
        // @ts-ignore
        debugger;
        const currentActors: string[] = formValues.actors || [];
        currentActors.push(value);
        // @ts-ignore
        formValues.actors = currentActors;
      }
      setShowAddActor(false);
      setOpenAddActorlist(false);
    }, [formValues]);

    useEffect(() => {
      if (actorData && formValues) {
        formValues.actors = [];
        formValues.actors.push(actorData.actor);
      }
      // @ts-ignore
    }, [formValues, actorData]);

    const editorRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);
    // @ts-ignore
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    useEffect(() => {
      // @ts-ignore
      editorRef.current = {
        CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
        ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
        //       Alignment: require('@ckeditor/ckeditor5-alignment/src/alignment').Alignment,
      };
      setEditorLoaded(true);
    }, []);

    const [descriptionEditor, setDescriptionEditor] = useState();

    const [openAddActorlist, setOpenAddActorlist] = useState(false);

    useEffect(() => {
      if (data) {
        enqueueSnackbar('Article créé avec succès.', {
          prArticleDuplicate: true,
        });
        router.push(`/article/${data.createArticle.id}`);
      }
    }, [data]);

    useEffect(() => {
      validateForm();
    });
    const validateForm = () => {
      if (
        !formValues.shortDescription
        || !formValues.label
        || !descriptionEditor?.getData()
      ) setValidated(false);
      else setValidated(true);
    };

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
    } = useDnDStateManager([]);

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

      addArticle({
        variables: {
          articleInfos: {
            label: formValues.label,
            shortDescription: formValues.shortDescription,
            content: formValues.content,
            published: true,
            // @ts-ignore
            actors: formValues.actors.map((item) => item.id),
          },
          actorId: parseInt(actorId),
          userId: parseInt(user.id),
          // @ts-ignore
          content: descriptionEditor.getData(),
          mainPictures,
          pictures,
        },
      });
    });

    const autocompleteHandler = (Article, valueActor) => {
      const ArticleModified = Article;

      /* @ts-ignore */
      actors.push(valueActor);
      /* @ts-ignore */
      actorsId.push(valueActor.id);
      ArticleModified.target.name = 'actors';
      ArticleModified.target.value = actorsId;
      formChangeHandler(ArticleModified);
      setShowOtherActors(false);
    };
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
        return this.loader.file.then(file => new Promise((resolve, reject) => {
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

          resolve({
            default: `${process.env.NEXT_PUBLIC_URI}/static/images/article/${file.name}`
          });
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
          Ajouter un article
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
        <br />
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
          text="Déposez ici votre autres photos au format jpg"
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
          Créer l'article
        </ClassicButton>
      </Container>
    );
  };

  return <FormController render={Form} validationRules={validationRules} />;
};

export default withDndProvider(withApollo()(AddArticleForm));
