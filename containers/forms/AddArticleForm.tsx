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
import { useMutation, useQuery } from '@apollo/client';
import useGraphQLErrorDisplay from 'hooks/useGraphQLErrorDisplay';
import useCookieRedirection from 'hooks/useCookieRedirection';
import { useSnackbar } from 'notistack';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import List from '@material-ui/core/List';
import DeleteIcon from '@material-ui/icons/Delete';
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

const ADDArticle = gql`
  mutation createArticle(
    $articleInfos: ArticleInfos
    $actorId: Int!
    $userId: Int!
    $content: String!
  ) {
    createArticle(
      articleInfos: $articleInfos
      actorId: $actorId
      userId: $userId
      content: $content
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
const GET_ArticleS = gql`
query Articles ($notFinished: Boolean ) {
  Articles (notFinished: $notFinished){
    id
    label
    startedAt
    endedAt
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
      Article
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
    const [addArticle, { data, error }] = useMutation(ADDArticle);

    const [showOtherArticleList, setShowOtherArticleList] = useState(false);

    const { data: dataActors } = useQuery(GET_ACTORS, {});
    const { data: dataArticles } = useQuery(GET_ArticleS, {
      variables: {
        notFinished: true,
      },
    });

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
        router.push(`/Article/${data.createArticle.id}`);
      }
    }, [data]);

    useEffect(() => {
      validateForm();
  
    });
    const validateForm = () => {
      if (
        !formValues.shortDescription ||
        !formValues.label
        || !descriptionEditor?.getData()
      ) setValidated(false);
      else setValidated(true);
    };

    const submitHandler = () => {
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
        },
      });
    };

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
          Créer l'article
        </ClassicButton>
      </Container>
    );
  };

  return <FormController render={Form} validationRules={validationRules} />;
};

export default withDndProvider(withApollo()(AddArticleForm));
function value(value: any) {
  throw new Error('Function not implemented.');
}
