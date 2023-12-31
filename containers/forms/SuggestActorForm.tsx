import { useMutation } from '@apollo/client';
import {
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ClassicButton from 'components/buttons/ClassicButton';
import FormController, { RenderCallback, ValidationRules, ValidationRuleType } from 'components/controllers/FormController';
import ImagesDropZone from 'components/ImageCropper/ImagesDropZone';
import ImagesDisplay from 'components/ImageCropper/ImagesDisplay';
import Checkbox from '@mui/material/Checkbox';
import { useSessionState } from 'context/session/session';
import gql from 'graphql-tag';
import { withApollo } from 'hoc/withApollo';
import { useSnackbar } from 'notistack';
import {
  ChangeEvent, useCallback, useEffect, useState,
} from 'react';
import InfoIcon from '@mui/icons-material/Info';
import useDnDStateManager from 'hooks/useDnDStateManager';
import useImageReader from 'hooks/useImageReader';
import withDndProvider from 'hoc/withDnDProvider';
import { FormatStrikethroughTwoTone } from '@mui/icons-material';

const PROPOSE_ACTORFORM = gql`
  mutation inviteActor($formValues: ProposeActorInfos!) {
    inviteActor(inviteActorInfos: $formValues)
  }
`;

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  field: {
    marginBottom: theme.spacing(3),
  },
  radioGroup: {
    marginBottom: theme.spacing(3),
    justifyContent: 'center',
  },
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
    maxRows,
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

const SuggestActorForm = (props) => {
  const {
    noEmailInviteActor,
  } = props;

  const styles = useStyles();
  const user = useSessionState();
  const [messageSent, setMessageSent] = useState(false);
  const [lastActorNameSent, setLastActorNameSent] = useState('');
  const [category, setCategory] = useState('message');
  const [noEmailInvite, setNoEmailInvite] = useState(noEmailInviteActor === 'true');

  const initFormValues = {
    firstName: user?.surname,
    lastName: user?.lastname,
    email: user?.email,
    sendEmail: !noEmailInvite,
  };

  const Form: RenderCallback = (props) => {
    const { formChangeHandler, formValues, validationResult } = props;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleChangeInvite = () => {
      setNoEmailInvite(!noEmailInvite);
      formValues.sendEmail = noEmailInvite;
    };

    const [
      inviteActor,
      { data: inviteActorData, error: inviteActorError, loading: inviteActorLoading },
    ] = useMutation(PROPOSE_ACTORFORM);

    const inputs = [

    ];
    if (!user) {
      inputs.push({
        label: 'Votre nom à vous',
        name: 'requesterName',
        required: true,
        errorText: 'Nom requis.',
        fullWidth: true,
      });
    }
    inputs.push({
      label: 'Nom du contact (Facultatif)',
      name: 'contactName',
      required: false,
      fullWidth: true,
    });
    inputs.push({
      label: noEmailInvite ? "Nom de l'acteur contacté" : "Nom de l'acteur à inviter",
      name: 'actorName',
      required: true,
      errorText: 'Nom requis.',
      fullWidth: true,
    });

    inputs.push({
      label: noEmailInvite ? "Email de l'acteur contacté" : "Email de l'acteur à inviter ou du contact",
      name: 'actorEmail',
      required: true,
      errorText: 'Email requis.',
      fullWidth: true,
    });
    inputs.push({
      label: noEmailInvite ? "Code postal de l'acteur contacté (Facultatif)" : "Code postal de l'acteur à inviter (Facultatif)",
      name: 'postCode',
      required: false,
      fullWidth: true,
    });
    if (!noEmailInvite) {
      inputs.push({
        label: "Message optionnel pour l'acteur ou le contact",
        name: 'message',
        required: false,
        multiline: true,
        fullWidth: true,
      });
    }

    const inputError = (name: string) => {
      return !validationResult?.global && !!validationResult?.result[name] && formValues[name] !== undefined;
    };

    const submitContactForm = () => {
      inviteActor({
        variables: {
          formValues: {
            ...formValues,
          },
        },
      });
    };

    useEffect(() => {
      if (!inviteActorLoading && inviteActorData) {
        setMessageSent(true);
        inputs.map((input, i) => {
          if (input.name === 'actorName') {
            setLastActorNameSent(formValues[input.name]);
          }
          formValues[input.name] = '';
        });
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
              />
            );
          })}
          {noEmailInviteActor && (
            <FormControlLabel
              control={<Checkbox onChange={handleChangeInvite} />}
              label="Inviter un nouvel acteur avec un email automatique "
            />
          )}

        </div>
      );
    });

    return (
      <Container maxWidth="md" className={styles.formContainer}>
        { getFormInputs() }
        <ClassicButton
          fullWidth
          variant="contained"
          onClick={submitContactForm}
          disabled={!validationResult?.global}
        >
          { noEmailInvite ? "Ajouter l'acteur" : 'Inviter le nouvel acteur'}
        </ClassicButton>
      </Container>
    );
  };
  let validationRules: ValidationRules;
  if (!user) {
    validationRules = {
      actorName: {
        rule: ValidationRuleType.required,
      },
      requesterName: {
        rule: ValidationRuleType.required,
      },
      actorEmail: {
        rule: ValidationRuleType.required && ValidationRuleType.email,
      },
    };
  } else {
    validationRules = {
      actorName: {
        rule: ValidationRuleType.required,
      },
      actorEmail: {
        rule: ValidationRuleType.required && ValidationRuleType.email,
      },
    };
  }

  if (messageSent) {
    return (
      <div>
        <div className={styles.formContainer}>
          <p>
            Merci de nous aider à faire grandir la communauté de OUAAA. Votre invitation à l'acteur
            {' '}
            <b>{lastActorNameSent}</b>
            {' '}
            a bien été envoyé. Vous pouvez continuer à inviter d'autres acteurs.
          </p>
        </div>
        <FormController
          render={Form}
          validationRules={validationRules}
          initValues={initFormValues}
        />
        ;
      </div>
    );
  }
  return (
    <FormController
      render={Form}
      validationRules={validationRules}
      initValues={initFormValues}
    />
  );
};

export default withDndProvider(withApollo()(SuggestActorForm));
