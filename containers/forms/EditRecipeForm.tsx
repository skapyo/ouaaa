import React, { useCallback, useEffect, useState, useRef, ChangeEvent, useMemo } from 'react';
import { Container, Button, Typography, TextField, Grid, Divider, MenuItem, Autocomplete } from '@mui/material';
import { default as gql, default as graphqlTag } from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { set } from 'lodash';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
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
import { getImageUrl } from 'utils/utils';
import { useSnackbar } from 'notistack';
import { useSessionState } from '../../context/session/session';
import { IngredientItem } from 'components/IngredientItem';
import withDndProvider from '../../hoc/withDnDProvider';

const EDIT_RECIPE = gql`
  mutation editRecipe(
    $recipe: RecipeInput
    $recipeId: Int!
    $mainPictures: [InputPictureType]
  ) {
    editRecipe(
      recipe: $recipe
      recipeId: $recipeId
      mainPictures: $mainPictures
    ) {
      id
      label
      content
      ingredients {
        id
        name
        unit
        quantity
        baseAlimIngredientId
      }
    }
  }
`;
const GET_RECIPE = gql`
  query getRecipe($recipeId: String!) {
    recipe(id: $recipeId) {
      id
      label
      content
      shortDescription
      ingredients {
        id
        name
        quantity
        unit
        description
        IngredientBaseAlim {
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

const GET_INGREDIENTBASEALIM = graphqlTag`
query ingredientBaseAlim {
  ingredientBaseAlim {
    id
    produit
    poids
    energie
    proteines
    lipides
    glucides
    empreinteCarbone
    agriculture
    transformation
    emballage
    transport
    distribution
    consommation
    poidsParUnite
    densite
    poidsParCuillereASoupe
    poidsParCuillereACafe
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



type Ingredient = {
  id?: number,
  name: string,
  unit: string,
  quantity: number,
  baseAlimIngredientId: number,
  description: string,
}

type FormItemProps = {
  label: string;
  inputName: string;
  placeholder?: string;
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
    placeholder,
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
      placeholder={placeholder}
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

type EditRecipeFormProps = {

}

const EditRecipeForm = (props: EditRecipeFormProps) => {
  const { } = props;
 
  const [editRecipe, { data, error }] = useMutation(EDIT_RECIPE);
  const { query: { actor: actorId } } = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { data: dataIngredientBaseAlim } = useQuery(GET_INGREDIENTBASEALIM, {});
  const Form: RenderCallback = ({
    formChangeHandler,
    validationResult,
    formValues,
  }) => {
   

    const [descriptionEditor, setDescriptionEditor] = useState();
    const [validated, setValidated] = useState(false);
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [addPictureRecipe, { data: dataPicture, error: errorPicture }] = useMutation(ADD_PICTURE_RECIPE);
    const router = useRouter();
    const editorRef = useRef();
    const user = useSessionState();
    const [firstRender, setFirstRender] = useState(true);
    if (user == null) {
      enqueueSnackbar('Veuillez vous connecter pour ajouter une recette ');
    }
    const ingredients: Ingredient[] = useMemo(() => {
      return formValues.ingredients ? JSON.parse(formValues.ingredients) : [];
    }, [formValues]);

    const handleChangeIngredient = useCallback((event: ChangeEvent, index: number) => {
      const values = {
        ingredients: [...ingredients],
      };
      console.log('values', values);
      set(values, event.target.name, event.target.value);

      formChangeHandler({ target: { name: 'ingredients', value: JSON.stringify(values.ingredients) } });
    }, [formValues, ingredients]);


   
    const initFormValues = () => {
      formValues.label = '';
      formValues.shortDescription = '';
      formValues.content = '';
      //setBannerPrincipalPicture(false);
    };
   
    const {
      loading: recipeLoading,
      error: recipeError,
      data: recipeData,
    } = useQuery(GET_RECIPE, {
      variables: { recipeId: props.id.toString() },
      fetchPolicy: 'no-cache',
      onCompleted: (dataRecipe) => {
        if (user === undefined || user == null) {
          enqueueSnackbar(
            'Veuillez vous connecter pour effectuer des modifications.',
            {
              preventDuplicate: true,
            },
          );
          router.push('/');
        } else if (!(dataRecipe.recipe.user.id  === user.id   ||  user.role === 'admin')) {
          enqueueSnackbar(
            "Vous n'avez pas les droits d'éditer cette recette",
            {
              preventDuplicate: true,
            },
          );
          router.push('/');
        }
      },
    });

    // @ts-ignore
    const { CKEditor, ClassicEditor } = editorRef.current || {};
    const imgInitMain = [];
    if (
      recipeData
      && recipeData.recipe.pictures
      && recipeData.recipe.pictures.length > 0
    ) {
      recipeData.recipe.pictures
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

 

    const handleClickUpdate = useCallback(async () => {
      let mainPictures;
      debugger;
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

        for await (const element of mainPictures){
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
  
      }
      const userId =  parseInt(user.id);
      editRecipe({
        variables: {
          recipe: {
            ...formValues,
            ingredients: JSON.parse(formValues.ingredients).map((ingredient) => {
              const { IngredientBaseAlim,__typename, ...rest } = ingredient; // Extracting "IngredientBaseAlim" and the rest of the attributes
              return {
                  ...rest, // Spread the remaining attributes
                  quantity: parseInt(rest.quantity),
                  baseAlimIngredientId: parseInt(rest.baseAlimIngredientId),
              };
            }),
            content: descriptionEditor?.getData(), 
           
          },
          recipeId: parseInt(recipeData.recipe.id),   
          mainPictures, 
        }
      });
    }, [editRecipe, formValues,objectsListMain]);

    
    useEffect(() => {
      if (data) {
        enqueueSnackbar('Recette modifié avec succès.', {
          preventDuplicate: true,
        });
        router.push(`/recette/${data.editRecipe.id}`);
      }
    }, [data]);


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
  
  

    const validateForm = () => {
      if (
        !formValues.shortDescription
        || !formValues.label
        || !descriptionEditor?.getData()
      ) setValidated(false);
      else setValidated(true);
    };
    const updateFormValues = () => {
      formValues.label = recipeData.recipe.label;
      formValues.content = recipeData.recipe.content;
      formValues.shortDescription = recipeData.recipe.shortDescription;
      formValues.ingredients =  JSON.stringify(recipeData.recipe.ingredients.map((ingredient) => ({ ...ingredient, baseAlimIngredientId: ingredient.IngredientBaseAlim.id })));
    //  setBannerPrincipalPicture(recipeData.recipe.bannerPrincipalPicture);
      formChangeHandler({ target: { name: 'label', value: recipeData.recipe.label } } as React.ChangeEvent<HTMLInputElement>);
      validateForm();
    };
    
    if (firstRender) {
      initFormValues();
    }
    if (firstRender && !recipeLoading && !recipeError && dataIngredientBaseAlim!== undefined) {
      updateFormValues();
      setFirstRender(false);
    }

    

    const [
      setImagesMainList,
      loadingMain,
      resultMain,
      imagesMainListState,
    ] = useImageReader();

    useEffect(() => {
      if (resultMain) addValuesMain(resultMain);
      // @ts-ignore
    }, resultMain);

 const [showIngredientForm, setShowIngredientForm] = useState(false);

    const onDropMainHandler = useCallback((files) => {
      // @ts-ignore
      setImagesMainList(files);
    }, [setImagesMainList]);

    return (
      <Container component="main" sx={styles.container}>
        <Typography sx={styles.field} color="secondary" variant="h6">
          Editer une recette
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
        <br/>
        <div>
          {
            ingredients.map((ingredient: Ingredient, index: number) => {
             
             return ( <IngredientItem
              key={index}
              ingredient={ingredient}
              index={index}
              dataIngredientBaseAlim = {dataIngredientBaseAlim}
              handleChangeIngredient={handleChangeIngredient}
            />
            
              )
            })
          }
          <Button onClick={() => {
            const values: Ingredient[] = formValues.ingredients ? JSON.parse(formValues.ingredients) as Ingredient[] : [];

            values.push({ id: undefined, unit: '', quantity: 0, name: '', baseAlimIngredientId: 0, description: '' });

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
          onClick={handleClickUpdate}
          disabled={!validationResult?.global || !validated}
        >
           Mettre à jour la recette
        </ClassicButton>
      </Container>
    )
  }

  return (
    <FormController render={Form} validationRules={validationRules} />
  )
};

export default withDndProvider(withApollo()(EditRecipeForm));