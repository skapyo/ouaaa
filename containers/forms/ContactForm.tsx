import { useMutation } from "@apollo/client";
import { Container, FormControlLabel, makeStyles, Radio, RadioGroup, TextField } from "@material-ui/core";
import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
import ClassicButton from "components/buttons/ClassicButton";
import FormController, { RenderCallback, ValidationRules, ValidationRuleType } from "components/controllers/FormController";
import { useSessionState } from "context/session/session";
import gql from "graphql-tag";
import { withApollo } from "hoc/withApollo";
import { useSnackbar } from "notistack";
import { ChangeEvent, useEffect, useState } from "react";

const SEND_CONTACT_FORM_EMAIL = gql`
  mutation sendContactFormEmail($formValues: ContactFormInfos!) {
    sendContactFormEmail(contactForm: $formValues)
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

const ContactForm = () => {

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
      sendContactForm,
      { data: sendContactData, error: sendContactError, loading: sendContactLoading },
    ] = useMutation(SEND_CONTACT_FORM_EMAIL);

    const inputs = [
      {
        label: 'Prénom',
        name: 'firstName',
        required: true,
        errorText: 'Prénom requis.',
        fullWidth: true
      },
      {
        label: 'Nom',
        name: 'lastName',
        required: true,
        errorText: 'Nom requis.',
        fullWidth: true
      },
      {
        label: 'Email',
        name: 'email',
        required: true,
        errorText: 'Email requis.',
        fullWidth: true
      },
      {
        label: 'Objet',
        name: 'object',
        required: false,
        errorText: '',
        fullWidth: true
      },
      {
        label: 'Message',
        name: 'message',
        required: true,
        errorText: 'Message requis.',
        multiline: true,
        minRows: 6,
        maxRows: 10,
        fullWidth: true
      }
    ];

    const radioChangeHandler = (event) => {
      setCategory(event.target.value);
    }

    const inputError = (name: string) => {
      return !validationResult?.global && !!validationResult?.result[name] && formValues[name] !== undefined
    }

    const submitContactForm = () => {
      sendContactForm({
        variables: {
          formValues: {
            ...formValues,
            object: formValues.object || 'Pas d\'objet spécifié',
            category
          }
        }
      });
    };

    useEffect(() => {
      if (!sendContactLoading && sendContactData) {
        setMessageSent(true);
      } else if (sendContactError) {
        enqueueSnackbar('Une erreur s\'est produite, merci de bien vouloir réessayer.', {
          preventDuplicate: true,
        });
      }
    }, [sendContactData, sendContactError, sendContactLoading]);

    const getFormInputs = (() => {
      return (
        <div>
          <RadioGroup row aria-label="gender" name="row-radio-buttons-group"
            className={styles.radioGroup}
            value={category}
            onChange={radioChangeHandler}
          >
            <FormControlLabel value="message" control={<Radio />} label="Message" />
            <FormControlLabel value="bug" control={<Radio />} label="Bug" />
            <FormControlLabel value="improvement" control={<Radio />} label="Amélioration" />
          </RadioGroup>
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
          Envoyer
        </ClassicButton>
      </Container>
    )
  }

  const validationRules: ValidationRules = {
    firstName: {
      rule: ValidationRuleType.required
    },
    lastName: {
      rule: ValidationRuleType.required
    },
    email: {
      rule: ValidationRuleType.required && ValidationRuleType.email
    },
    message: {
      rule: ValidationRuleType.required
    },
  };

  if (messageSent) {
    return (
      <div className={styles.formContainer}>
        <p>Votre message a bien été envoyé. Merci.</p>
      </div>
    )
  }
  return <FormController 
            render={Form} 
            validationRules={validationRules}
            initValues={initFormValues} 
          />;
};

export default withApollo()(ContactForm);