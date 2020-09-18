import React, { useCallback, useState } from "react"
import gql from "graphql-tag"
import { withApollo } from "hoc/withApollo"
import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Grid,
} from "@material-ui/core"
import ClassicButton from "components/buttons/ClassicButton"
import FormController from "components/controllers/FormController"
import {
  RenderCallback,
} from "components/controllers/FormController"
import { useMutation, useQuery } from "@apollo/react-hooks"
import useGraphQLErrorDisplay from "hooks/useGraphQLErrorDisplay"
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useCookieRedirection from "hooks/useCookieRedirection"
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  field: {
    marginBottom: theme.spacing(3),
  },
  datetime: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  categories: {
    '& span': {
      fontWeight: "100",
    },
  },
}))

const ADDEVENT = gql`
  mutation createEvent(
    $eventInfos: EventInfos
  ) {
    createEvent(
      eventInfos:$eventInfos
    ) {
      label
      shortDescription
      facebookUrl
      description
      startedAt
      endedAt
      published
    }
  }
`;

const GET_CATEGORIES = gql`
query categories {
  categories {
    id,
    label,
    activated
  }
}
`;

const AddEventForm = () => {
  const Form: RenderCallback = (props) => {

    const { formChangeHandler, formValues, validationResult } = props
    const [addEvent, {data, error}] = useMutation(ADDEVENT)
    const {data: categoryData, loading: categoryLoading, error: categoryError} = useQuery(
      GET_CATEGORIES
    )
    useGraphQLErrorDisplay(error)
    const styles = useStyles()
    const redirect = useCookieRedirection()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const validateFields = useCallback(() => {
      if (formValues.shortDescription && formValues.shortDescription.length > 240)
        return false
      // detail error cases
      return true
    }, [formValues])

    const [state, setState] = React.useState({})

    const handleChange = (category: any, event: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [category.id.toString()]: event.target.checked });
    }

    const submitHandler = () => {
      const checkboxes = Object.keys(state)
      let categoriesArray: number[]
      categoriesArray = []
      checkboxes.forEach( key => {
        if (state[key])
          categoriesArray.push(parseInt(key))
      })

      addEvent({
        variables: {
          eventInfos: {
            label: formValues.label,
            shortDescription: formValues.shortDescription,
            facebookUrl: formValues.facebookUrl,
            description: formValues.description,
            startedAt: formValues.startDate,
            endedAt: formValues.endDate,
            published: false,
            categories: categoriesArray,
          },
        },
      })

      // alert
      if (!error) {
        enqueueSnackbar("Événement créé avec succès.", { 
          preventDuplicate: true,
        })
        redirect()
      }
    }

    return (
      <Container component="main" maxWidth="sm">
        <Typography 
          className={styles.field}
          color='secondary' 
          variant='h6'
        >
          Ajouter un événement
        </Typography>
        <TextField
          className={styles.field}
          variant="outlined"
          value={formValues.label}
          label="Nom de l'événement"
          name="label"
          onChange={formChangeHandler}
          defaultValue=""
          fullWidth
          required
        />
        <TextField
          className={styles.field}
          variant="outlined"
          value={formValues.facebookUrl}
          label="Lien Facebook de l'événement"
          name="facebookUrl"
          onChange={formChangeHandler}
          defaultValue=""
          fullWidth
        />
        <TextField
          className={styles.field}
          variant="outlined"
          value={formValues.shortDescription}
          label="Description courte"
          name="shortDescription"
          onChange={formChangeHandler}
          defaultValue=""
          fullWidth
          multiline
          rows={3}
        />
        <TextField
          className={styles.field}
          variant="outlined"
          value={formValues.description}
          label="Description détaillée"
          placeholder="Parlez-nous de l'événement, les thèmes abordés, le format, les intervenants..."
          name="description"
          onChange={formChangeHandler}
          defaultValue=""
          fullWidth
          multiline
          rows={6}
        />
        <Grid className={styles.datetime}>
          <TextField
            className={styles.field}
            variant="outlined"
            id="datetime-local"
            label="Date de début"
            type="datetime-local"
            name="startDate"
            value={formValues.startDate}
            onChange={formChangeHandler}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className={styles.field}
            variant="outlined"
            id="datetime-local"
            label="Date de fin"
            type="datetime-local"
            name="endDate"
            value={formValues.endDate}
            onChange={formChangeHandler}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Grid>
            <Typography>Catégorie(s) de l'événement</Typography>
            <FormControl component="fieldset">
              <FormGroup>
                {
                  categoryData && categoryData.categories.map((category: any) =>
                    <FormControlLabel
                      control={<Checkbox checked={state[category.id.toString()]} onChange={(e) => handleChange(category, e)} name={category.label} />}
                      label={category.label}
                      className={styles.categories}
                    />
                  )
                }
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
        <ClassicButton
          fullWidth
          variant="contained"
          className={styles.submit}
          onClick={submitHandler}
          disabled={!validateFields()}
        >
          Créer cet événement
        </ClassicButton>
      </Container>
    )
  }
  

  return (
    <FormController 
      render={Form} 
      // validationRules={validationRules} 
    />
  )
}

export default withApollo()(AddEventForm)
