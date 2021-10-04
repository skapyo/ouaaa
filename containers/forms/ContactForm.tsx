import { useMutation } from "@apollo/client";
import { Container, TextField } from "@material-ui/core";
import ClassicButton from "components/buttons/ClassicButton";
import FormController, { RenderCallback, ValidationRules, ValidationRuleType } from "components/controllers/FormController";
import { ProvidedRequiredArgumentsRule } from "graphql";
import gql from "graphql-tag";
import { withApollo } from "hoc/withApollo";
import { useSnackbar } from "notistack";

const SEND_CONTACT_FORM_EMAIL = gql`
  mutation sendContactFormEmail($formValues: ContactFormInfos!) {
    sendContactFormEmail(contactForm: $formValues)
  }
`

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
  minRows?: number;
  maxRows?: number;
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
    helperText,
    multiline,
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
      fullWidth
      required={required}
      error={errorBool}
      helperText={errorBool ? errorText : helperText}
      multiline={multiline}
      minRows={minRows}
      maxRows={maxRows}
    />
  );
};

const ContactForm = () => {

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
        value: ''
      },
      {
        label: 'Nom',
        name: 'lastName',
        required: true,
        errorText: 'Nom requis.',
        value: ''
      },
      {
        label: 'Email',
        name: 'email',
        required: true,
        errorText: 'Email requis.',
        value: ''
      },
      {
        label: 'Objet',
        name: 'object',
        required: false,
        errorText: '',
        value: ''
      },
      {
        label: 'Message',
        name: 'message',
        required: true,
        errorText: '',
        value: '',
        multiline: true,
        minRows: 6,
        maxRows: 10
      }
    ];

    const inputError = (name: string) => {
      return false;
      return !validationResult?.global && !!validationResult?.result[name]
    }

    const submitContactForm = () => {
      sendContactForm({
        variables: {
          formValues: {
            ...formValues,
            object: formValues.object || 'Pas d\'objet spécifié',
          }
        },
        onCompleted: (data) => {
          if (data) {
            enqueueSnackbar(
              'Votre message a bien été envoyé.',
              {
                preventDuplicate: true,
              }
            );
          } else {
            enqueueSnackbar(
              'Une erreur s\'est produite, merci de bien vouloir réessayer.',
              {
                preventDuplicate: true,
              }
            );
          }
        }
      });
    }

    const getFormInputs = (() => {
      return inputs.map((input, i) => {
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
            minRows={input.minRows}
            maxRows={input.maxRows}
          ></FormItem>
        )
      });
    });

    return (
      <Container component="main" maxWidth="md">
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

  return <FormController render={Form} validationRules={validationRules} />;
};

export default withApollo()(ContactForm);