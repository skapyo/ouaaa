import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Container, Button, Typography, TextField } from '@mui/material';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { withApollo } from 'hoc/withApollo';
import FormController, {
  RenderCallback,
  ValidationRules,
  ValidationRuleType,
} from 'components/controllers/FormController';
import useImageReader from '../../hooks/useImageReader';
import useDnDStateManager from '../../hooks/useDnDStateManager';
import ImagesDropZone from 'components/ImageCropper/ImagesDropZone';
import ImagesDisplay from 'components/ImageCropper/ImagesDisplay';
import ClassicButton from 'components/buttons/ClassicButton';

const CREATE_RECIPE = gql`
  mutation createRecipe(
    $recipe: RecipeInput
    $actorId: ID!
  ) {
    createRecipe(
      recipe: $recipe
      actorId: $actorId
    ) {
      id
      label
      content
      ingredients {
        id
        name
        unit
        quantity
      }
    }
  }
`;

const ADD_PICTURE_RECIPE = gql`
  mutation addPictureRecipe($picture: InputPictureType) {
    addPictureRecipe(picture: $picture) {
      id
    }
  }
`;

const editorConfig = {
  extraPlugins: [(editor: any) => { }],
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
  alignment: {
    options: ['left', 'right'],
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
};

const styles = {
  container: {
    textAlign: 'center',
  },
  field: {
    marginBottom: (theme) => theme.spacing(3),
  },
  label: {
    fontWeight: 600,
  },
  submit: {
    margin: (theme) => theme.spacing(3, 0, 2),
  },
}

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
      sx={styles.field}
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

const validationRules: ValidationRules = {
  label: {
    rule: ValidationRuleType.required,
  },
  shortDescription: {
    rule: ValidationRuleType.required && ValidationRuleType.maxLength,
    maxLimit: 90,
  },
};

type AddRecipeFormProps = {

}

const AddRecipeForm = (props: AddRecipeFormProps) => {
  const { } = props;

  const [createRecipe, { data, error }] = useMutation(CREATE_RECIPE);
  const { query: { actor: actorId } } = useRouter();

  console.log(actorId);

  const Form: RenderCallback = ({
    formChangeHandler,
    validationResult,
    formValues,
  }) => {
    const [descriptionEditor, setDescriptionEditor] = useState();
    const [validated, setValidated] = useState(false);
    const [editorLoaded, setEditorLoaded] = useState(false);

    const [addPictureRecipe, { data: dataPicture, error: errorPicture }] = useMutation(ADD_PICTURE_RECIPE);

    const editorRef = useRef();

    // @ts-ignore
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    console.log(formValues)

    const handleClickCreate = useCallback(() => {
      createRecipe({
        variables: {
          recipe: {
            ...formValues,
            content: descriptionEditor?.getData(),
          },
          actorId,
        }
      });
    }, [createRecipe, formValues]);


    class MyUploadAdapter {
      constructor(props) {
        // CKEditor 5's FileLoader instance.
        this.loader = props;
      }

      // Starts the upload process.
      upload() {
        return this.loader.file.then(file => new Promise((resolve, reject) => {
          addPictureRecipe({
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
            default: `${process.env.NEXT_PUBLIC_URI}/static/images/recipe/${file.name}`
          });
        }));
      }

      // Aborts the upload process.
      abort() {
      }
    }

    const MyCustomUploadAdapterPlugin = (editor) => {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
      };
    };

    editorConfig.extraPlugins = [MyCustomUploadAdapterPlugin];

    useEffect(() => {
      // @ts-ignore
      editorRef.current = {
        CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
        ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
      };
      setEditorLoaded(true);
    }, []);

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

    const onDropMainHandler = useCallback((files) => {
      // @ts-ignore
      setImagesMainList(files);
    }, [setImagesMainList]);

    return (
      <Container component="main" sx={styles.container}>
        <Typography sx={styles.field} color="secondary" variant="h6">
          Ajouter une recette
        </Typography>

        <FormItem
          label="Nom de la recette"
          inputName="label"
          formChangeHandler={formChangeHandler}
          value={formValues.label}
          required
          errorBool={
            !validationResult?.global && !!validationResult?.result.label
          }
          errorText="Nom de la recette requis."
        />

        <FormItem
          label="Description de la recette"
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

        <Typography variant="body1" color="primary" sx={styles.label}>
          Photo principale
        </Typography>
        {
          objectsListMain && (
            <ImagesDisplay
              cards={objectsListMain}
              moveCard={moveObjectMain}
              findCard={findObjectMain}
              updateDeletedIndicator={updateDeletedIndicatorMain}
              updateKeyIndicator={updateKeyIndicatorMain}
            />
          )
        }
        <ImagesDropZone
          onDropHandler={onDropMainHandler}
          text="Déposez ici votre photo principale au format jpg et de poids inférieur à 4Mo"
        />

        <br />

        <Typography variant="body1" color="primary" sx={styles.label}>
          Etapes de la recette *
        </Typography>
        <p />
        {
          editorLoaded ? (
            <CKEditor
              config={editorConfig}
              editor={ClassicEditor}
              data={formValues.content}
              onReady={(editor: any) => {
                setDescriptionEditor(editor);
              }}
              onChange={(event, editor) => {
                validateForm();
              }}
            />
          ) : (
            <div>Chargement de l'éditeur</div>
          )
        }

        <ClassicButton
          fullWidth
          variant="contained"
          sx={styles.submit}
          onClick={handleClickCreate}
          disabled={!validationResult?.global || !validated}
        >
          Créer la recette
        </ClassicButton>
      </Container>
    )
  }

  return (
    <FormController render={Form} validationRules={validationRules} />
  )
};

export default withApollo()(AddRecipeForm);