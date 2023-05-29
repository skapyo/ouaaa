import React, { useCallback, useEffect, useState, useRef, ChangeEvent, useMemo } from 'react';
import { Container, Button, Typography, TextField, Grid, Divider, MenuItem } from '@mui/material';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { set } from 'lodash';

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
    width: '75%',
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

type Unit = {
  label: string;
  value: string;
}

const availableUnits: Unit[] = [
  {
    label: 'Kg',
    value: 'kg',
  },
  {
    label: 'g',
    value: 'g',
  },
  {
    label: 'mg',
    value: 'mg',
  },
  {
    label: 'L',
    value: 'l',
  },
  {
    label: 'mL',
    value: 'ml',
  },
  {
    label: 'cL',
    value: 'cl',
  },
  {
    label: 'dL',
    value: 'dl',
  },
  {
    label: 'Unité',
    value: 'unity',
  },
  {
    label: 'CàC',
    value: 'cac',
  },
  {
    label: 'CàS',
    value: 'cas',
  },
];

type Ingredient = {
  id?: number,
  name: string,
  unit: string,
  quantity: number,
  impact: number,
  description: string,
}

type FormItemProps = {
  label: string;
  inputName: string;
  formChangeHandler: (Article: ChangeArticle) => void;
  type?: React.InputHTMLAttributes<unknown>['type'];
  value: any;
  required?: boolean;
  errorBool?: boolean;
  errorText?: string;
  select?: boolean;
  children?: any;
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
    type,
    select,
    children,
  } = props;
  return (
    <TextField
      sx={styles.field}
      variant="outlined"
      value={value}
      label={label}
      name={inputName}
      onChange={(evt) => {
        formChangeHandler(evt);
      }}
      defaultValue=""
      fullWidth
      required={required}
      error={errorBool}
      helperText={errorBool ? errorText : ''}
      type={type}
      select={select}
      children={children}
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

    const ingredients: Ingredient[] = useMemo(() => {
      return formValues.ingredients ? JSON.parse(formValues.ingredients) : [];
    }, [formValues]);

    const handleChangeIngredient = useCallback((event: ChangeEvent, index: number) => {
      const values = {
        ingredients: [...ingredients],
      };

      set(values, event.target.name, event.target.value);

      formChangeHandler({ target: { name: 'ingredients', value: JSON.stringify(values.ingredients) } });
    }, [formValues, ingredients]);

    // @ts-ignore
    const { CKEditor, ClassicEditor } = editorRef.current || {};

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
          Ingrédients
        </Typography>

        <div>
          {
            ingredients.map((ingredient: Ingredient, index: number) => {
              return (
                <Grid container key={index}>
                  {ingredients.length > 1 && (
                    <Grid item xs={12} sx={{ marginBottom: 3 }}>
                      <Divider variant="middle" />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <FormItem
                      label="Nom de l'ingrédient"
                      inputName={`ingredients[${index}].name`}
                      formChangeHandler={(evt) => {
                        handleChangeIngredient(evt, index)
                      }}
                      value={ingredient.name}
                    />
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <FormItem
                        label="Quantité"
                        inputName={`ingredients[${index}].quantity`}
                        formChangeHandler={(evt) => handleChangeIngredient(evt, index)}
                        value={ingredient.quantity}
                        type="number"
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <FormItem
                        label="Impact"
                        inputName={`ingredients[${index}].impact`}
                        formChangeHandler={(evt) => handleChangeIngredient(evt, index)}
                        value={ingredient.impact}
                        type="number"
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <FormItem
                        label="Unité"
                        inputName={`ingredients[${index}].unit`}
                        formChangeHandler={(evt) => handleChangeIngredient(evt, index)}
                        value={ingredient.unit}
                        select
                      >
                        {availableUnits.map((option: Unit) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </FormItem>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <FormItem
                      label="Description de l'ingrédient"
                      inputName={`ingredients[${index}].description`}
                      formChangeHandler={(evt) => {
                        handleChangeIngredient(evt, index)
                      }}
                      value={ingredient.description}
                    />
                  </Grid>
                </Grid>
              )
            })
          }
          <Button onClick={() => {
            const values: Ingredient[] = formValues.ingredients ? JSON.parse(formValues.ingredients) as Ingredient[] : [];

            values.push({ id: undefined, unit: '', quantity: 0, name: '', impact: 0, description: '' });

            const target = {
              name: 'ingredients',
              value: JSON.stringify(values)
            };

            const event = {
              target,
            }

            formChangeHandler(event);
          }}>
            <AddCircleOutlineIcon sx={{ marginRight: '5px' }} />
            Ajouter un ingrédient
          </Button>
        </div>

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