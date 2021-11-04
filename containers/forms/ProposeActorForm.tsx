import { useMutation } from "@apollo/client";
import { Container, FormControlLabel, makeStyles, Radio, RadioGroup, TextField, Tooltip, Typography } from "@material-ui/core";
import ClassicButton from "components/buttons/ClassicButton";
import FormController, { RenderCallback, ValidationRules, ValidationRuleType } from "components/controllers/FormController";
import ImagesDropZone from "components/ImageCropper/ImagesDropZone";
import ImagesDisplay from 'components/ImageCropper/ImagesDisplay';
import { useSessionState } from "context/session/session";
import gql from "graphql-tag";
import { withApollo } from "hoc/withApollo";
import { useSnackbar } from "notistack";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import InfoIcon from '@material-ui/icons/Info';
import useDnDStateManager from "hooks/useDnDStateManager";
import useImageReader from "hooks/useImageReader";
import withDndProvider from "hoc/withDnDProvider";

const PROPOSE_ACTORFORM = gql`
  mutation inviteActor($formValues: ProposeActorInfos!) {
    inviteActor(inviteActorInfos: $formValues)
  }
`

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8)
  },
  field: {
    marginBottom: theme.spacing(3)
  },
  radioGroup: {
    marginBottom: theme.spacing(3),
    justifyContent: 'center'
  }
}));

type FormItemProps = {
  label: string;
  inputName: string;
  formChangeHandler: (event: ChangeEvent) => void;
  value: string;
  required: boolean;
  errorBool: boolean;
  errorText: string;
  helperText?: string;
  multiline?: boolean;
  fullWidth?: boolean;
  minRows?: number;
  maxRows?: number;
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
    helperText,
    multiline,
    fullWidth,
    minRows,
    maxRows
  } = props;
  return (
    <TextField
      variant="outlined"
      value={value}
      label={label}
      name={inputName}
      onChange={formChangeHandler}
      fullWidth={fullWidth}
      required={required}
      error={errorBool}
      helperText={errorBool ? errorText : helperText}
      multiline={multiline}
      minRows={minRows}
      maxRows={maxRows}
      className={styles.field}
    />
  );
};

const ProposeActorForm = () => {

  const styles = useStyles();
  const user = useSessionState();
  const [messageSent, setMessageSent] = useState(false);
  const [category, setCategory] = useState('message');

  const initFormValues = {
    firstName: user?.surname,
    lastName: user?.lastname,
    email: user?.email
  };

  const Form: RenderCallback = (props) => {
    const { formChangeHandler, formValues, validationResult } = props;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    
    const [
      inviteActor,
      { data: inviteActorData, error: inviteActorError, loading: inviteActorLoading },
    ] = useMutation(PROPOSE_ACTORFORM);

    const inputs = [
      {
        label: 'Votre nom à vous (Facultatf)',
        name: 'requesterName',
        required: false,
        fullWidth: true
      },
      {
        label: "Nom de l'acteur à inviter",
        name: 'name',
        required: true,
        errorText: 'Nom requis.',
        fullWidth: true
      },
      {
        label: "Email de l'acteur à inviter",
        name: 'email',
        required: true,
        errorText: 'Email requis.',
        fullWidth: true
      },
      {
        label: "Code postal de l'acteur à inviter (Facultatf)",
        name: 'postCode',
        required: false,
        fullWidth: true
      },
      {
        label: "Message optionnel pour l'acteur",
        name: 'message',
        required: false,
        multiline: true,
        fullWidth: true
        
      }
    ];

   



    const inputError = (name: string) => {
      return !validationResult?.global && !!validationResult?.result[name] && formValues[name] !== undefined
    }

    const submitContactForm = () => {
      inviteActor({
        variables: {
          formValues: {
            ...formValues
          }
        }
      });
    };

    useEffect(() => {
      if (!inviteActorLoading && inviteActorData) {
        setMessageSent(true);
      } else if (inviteActorError) {
        enqueueSnackbar('Une erreur s\'est produite, merci de bien vouloir réessayer.', {
          preventDuplicate: true,
        });
      }
    }, [inviteActorData, inviteActorError, inviteActorLoading]);

    const getFormInputs = (() => {
      return (
        <div>
          { inputs && inputs.map((input, i) => {
            return (
              <FormItem
                key={i}
                label={input.label}
                inputName={input.name}
                formChangeHandler={formChangeHandler}
                value={formValues[input.name]}
                required={input.required}
                errorBool={inputError(input.name)}
                errorText={input.errorText}
                multiline={input.multiline}
                fullWidth={input.fullWidth}
                minRows={input.minRows}
                maxRows={input.maxRows}
              ></FormItem>
            );
          })}

        </div>
      );
    });

    return (
      <Container component="main" maxWidth="md" className={styles.formContainer}>
        { getFormInputs() }
        <ClassicButton
          fullWidth
          variant="contained"
          onClick={submitContactForm}
          disabled={!validationResult?.global}
        >
          Inviter le nouvel acteur
        </ClassicButton>
      </Container>
    )
  }

  const validationRules: ValidationRules = {
    name: {
      rule: ValidationRuleType.required
    },
    email: {
      rule: ValidationRuleType.required && ValidationRuleType.email
    }
  };

  if (messageSent) {
    return (
      <div className={styles.formContainer}>
        <p>Merci de votre aide. N'hésitez pas à inviter d'autres acteurs.</p>
      </div>
    )
  }
  return <FormController 
            render={Form} 
            validationRules={validationRules}
            initValues={initFormValues} 
          />;
};

export default withDndProvider(withApollo()(ProposeActorForm));