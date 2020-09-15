import { useCallback } from "react"
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
import { useMutation } from "@apollo/react-hooks"
import useGraphQLErrorDisplay from "hooks/useGraphQLErrorDisplay"

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

const AddEventForm = () => {
  const Form: RenderCallback = (props) => {

    const { formChangeHandler, formValues, validationResult } = props
    const [addEvent, {data, error}] = useMutation(ADDEVENT)
    useGraphQLErrorDisplay(error)
    const styles = useStyles()

    const validateFields = useCallback(() => {
      if (formValues.shortDescription && formValues.shortDescription.length > 240)
        return false
      // detail error cases
      return true
    }, [formValues])

    const submitHandler = useCallback(() => {
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
          },
        },
      })
    }, [formValues, addEvent])

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
