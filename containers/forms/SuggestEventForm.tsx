import { useMutation,useQuery } from '@apollo/client';
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
import { Autocomplete } from '@mui/material';
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
import Link from '../../components/Link';
const SUGGEST_ACTORFORM = gql`
  mutation suggestEvent($formValues: SuggestEventInfos!) {
    suggestEvent(suggestEventInfos: $formValues)
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

const SuggestEventForm = (props) => {
  const {
    noEmailsuggestEvent,
  } = props;

  const styles = useStyles();
  const user = useSessionState();
  const [messageSent, setMessageSent] = useState(false);
  const [lastActorNameSent, setLastActorNameSent] = useState('');
  const [category, setCategory] = useState('message');
  const [noEmailInvite, setNoEmailInvite] = useState(noEmailsuggestEvent === 'true');
 
  const initFormValues = {
    firstName: user?.surname,
    lastName: user?.lastname,
    email: user?.email,
    sendEmail: !noEmailInvite,
  };

  const Form: RenderCallback = (props) => {
    const { formChangeHandler, formValues, validationResult } = props;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [showAddActor, setShowAddActor] = useState(false);
    const [openAddActorlist, setOpenAddActorlist] = useState(false);
    const { data: dataActors } = useQuery(GET_ACTORS, {});
 
    const handleChangeInvite = () => {
      setNoEmailInvite(!noEmailInvite);
    };

    const [
      suggestEvent,
      { data: suggestEventData, error: suggestEventError, loading: suggestEventLoading },
    ] = useMutation(SUGGEST_ACTORFORM);

    const inputs = [

    ];
    if (!user) {
      inputs.push({
        label: 'Votre nom',
        name: 'requesterName',
        required: true,
        errorText: 'Nom requis.',
        fullWidth: true,
      });
    }
    if (!noEmailInvite) {
      inputs.push({
        label: "Nom et date de l'événement manquant",
        name: 'eventName',
        required: true,
        fullWidth: true,
      });
      inputs.push({
        label: "Message optionnel pour l'acteur",
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
      suggestEvent({
        variables: {
          formValues: {
            ...formValues,
          },
        },
      });
    };

    useEffect(() => {
      if (!suggestEventLoading && suggestEventData) {
        setMessageSent(true);
        inputs.map((input, i) => {
          if (input.name === 'actorName') {
            setLastActorNameSent(formValues[input.name]);
          }
          formValues[input.name] = '';
        });
      } else if (suggestEventError) {
        enqueueSnackbar('Une erreur s\'est produite, merci de bien vouloir réessayer.', {
          preventDuplicate: true,
        });
      }
    }, [suggestEventData, suggestEventError, suggestEventLoading]);


    const handleChangeActor = useCallback((event, value) => {
      if (value) {
        formValues.actorId = parseInt(value.id);
      }
      setShowAddActor(false);
      setOpenAddActorlist(false);
    }, [formValues]);

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
          {noEmailsuggestEvent && (
            <FormControlLabel
              control={<Checkbox onChange={handleChangeInvite} />}
              label="Propose à l'acteur d'ajouter son événément sur OUAAA!"
            />
          )}

        </div>
      );
    });
    const inputChangeHandler = useCallback((event) => {
      if (event.target.value) {
        if (event.target.value.length < 3) {
            setOpenAddActorlist(false);
        } else {
          setOpenAddActorlist(true);
        } 
      }
    }, []);

    return (
      <Container maxWidth="md" className={styles.formContainer}>


{dataActors! && (
            <Autocomplete
              id="combo-box-add-actor"
              options={dataActors.actors}
              // @ts-ignore
              getOptionLabel={(option) => `${option.name}`}
              onChange={handleChangeActor}
              open={openAddActorlist}
   
              // @ts-ignore
              onInput={inputChangeHandler}
              // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Acteur (Tapez les 3 premières lettres)"
                  variant="outlined"
                  name="actors"
                />
              )}
            />
)}
<div>Si l'acteur n'est pas présent, invitez le à rejoindre OUAAA! en cliquant  <Link href={`/map?suggestEvent=true`}> ici</Link></div>
<br/>
        { getFormInputs() }
        <ClassicButton
          fullWidth
          variant="contained"
          onClick={submitContactForm}
          disabled={!validationResult?.global}
        >
          { noEmailInvite ? "Ajouter l'acteur" : "Proposer à l'acteur d'ajouter son événément sur OUAAA!"}
        </ClassicButton>
      </Container>
    );
  };
  let validationRules: ValidationRules;
  if (!user) {
    validationRules = {
      eventName: {
        rule: ValidationRuleType.required,
      },
      requesterName: {
        rule: ValidationRuleType.required,
      },
      actorId: {
        rule: ValidationRuleType.required,
      }
    };
  } else {
    validationRules = {
      eventName: {
        rule: ValidationRuleType.required,
      }
      , actorId: {
        rule: ValidationRuleType.required,
      }
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

export default withDndProvider(withApollo()(SuggestEventForm));
