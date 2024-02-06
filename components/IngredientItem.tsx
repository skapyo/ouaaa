import React from 'react';
import { Grid, Divider, Autocomplete, TextField, MenuItem, Button } from '@mui/material';

const styles = {};

type Ingredient = {
    id?: number;
    name: string;
    unit: string;
    quantity: number;
    baseAlimIngredientId: number;
    description: string;
};

type Unit = {
    label: string;
    value: string;
};

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

interface IngredientItemProps {
    index: number;
    ingredient: Ingredient;
    handleChangeIngredient: (evt: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    dataIngredientBaseAlim: any; // replace with the actual type
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

export const IngredientItem: React.FC<IngredientItemProps> = ({
    index,
    ingredient,
    handleChangeIngredient,
    dataIngredientBaseAlim,
}) => {
   
    const [isButtonClicked, setIsButtonClicked] = React.useState(false);
    const [ingredientBaseAlimSelected, setIngredientBaseAlimSelected] = React.useState<any>(null);
    const [filteredUnits, setFilteredUnits] = React.useState<Unit[]>([]);

    React.useEffect(() => {
        const updatedFilteredUnits = availableUnits.filter((unit) => {
         
            if (unit.value === 'ml' || unit.value === 'cl' || unit.value === 'dl'  || unit.value === 'l') {
                if (ingredientBaseAlimSelected && ingredientBaseAlimSelected.densite !== null) {
                    return unit.value === 'ml' || unit.value === 'cl' || unit.value === 'dl';
                }
            } else if (unit.value === 'unity') {
                if (ingredientBaseAlimSelected && ingredientBaseAlimSelected.poidsParUnite !== null) {
                    return unit.value === 'unity';
                }
            }else if (unit.value === 'cac') {
                if (ingredientBaseAlimSelected && ingredientBaseAlimSelected.poidsParCuillereACafe !== null) {
                    return unit.value === 'cac';
                }
            }else if (unit.value === 'cas') {
                if (ingredientBaseAlimSelected && ingredientBaseAlimSelected.poidsParCuillereASoupe !== null) {
                    return unit.value === 'cas';
                }
            } else {
                return true;
            }
        });

        setFilteredUnits(updatedFilteredUnits);
    }, [ingredientBaseAlimSelected]);

    const handleButtonClick = () => {
        setIsButtonClicked(true);
    };

    const handleAutocompleteChange = (event: React.ChangeEvent<{}>, value: any) => {
        setIngredientBaseAlimSelected(value);
        event.target.name = `ingredients[${index}].baseAlimIngredientId`;
        event.target.value = value.id;
        handleChangeIngredient(event, index); // Call handleChangeIngredient with event and index
    };

    return (
        <Grid container key={index}>
            {index > 0 && (
                <Grid item xs={12} sx={{ marginBottom: 3 }}>
                    <Divider variant="middle" />
                </Grid>
            )}
           
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    {!isButtonClicked && (
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            name="ingredientBaseAlim"
                            getOptionLabel={(option) => `${option.produit}`}
                            options={dataIngredientBaseAlim.ingredientBaseAlim}
                            onChange={handleAutocompleteChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Choisir un ingrédient existant avec son impact carbone."
                                    variant="outlined"
                                    name={`ingredients[${index}].name`}
                                />
                            )}
                        />
                    )}
                    {!isButtonClicked && (
                        <Button onClick={handleButtonClick}> Ajouter un ingrédient non présent sans impact carbone</Button>
                    )}
                    {isButtonClicked && (
                        <FormItem
                            label="Nom de l'ingrédient non présent sans impact carbone"
                            inputName={`ingredients[${index}].name`}
                            formChangeHandler={(evt) => {
                                handleChangeIngredient(evt, index);
                            }}
                            value={ingredient.name}
                        />
                    )}
                </Grid>

                <Grid item xs={3}>
                    <FormItem
                        label="Quantité"
                        inputName={`ingredients[${index}].quantity`}
                        formChangeHandler={(evt) => handleChangeIngredient(evt, index)}
                        value={ingredient.quantity}
                        type="number"
                    />
                </Grid>

                <Grid item xs={3}>
                    <FormItem
                        label="Unité"
                        inputName={`ingredients[${index}].unit`}
                        formChangeHandler={(evt) => handleChangeIngredient(evt, index)}
                        value={ingredient.unit}
                        select
                    >
                        {filteredUnits.map((option: Unit) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </FormItem>
                </Grid>
            </Grid>
        </Grid>
    );
};