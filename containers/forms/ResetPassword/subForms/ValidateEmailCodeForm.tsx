import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { RenderCallback } from 'components/controllers/FormController';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import TextField from 'components/TextField';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { EmailContext } from 'containers/forms/ResetPassword/ResetPasswordForm';
import { useRouter } from 'next/router';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import omitTypename from '../../../../utils/omitTypename';
import { useSessionDispatch } from 'context/session/session';

const VALIDATE_RESET_PASSWORD_CODE = gql`
  mutation validateActionCode(
    $validateActionCodeInfos: ValidateActionCodeInfos
  ) {
    validateActionCode(validateActionCodeInfos: $validateActionCodeInfos) {
      id
      surname
      lastname
      email
      role
      phone
      address
      postCode
      city
      isEmailValidated
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  subTitle: {
    marginBottom: theme.spacing(3),
  },
  main: {
    paddingBottom: theme.spacing(5),
  },
}));

type FormItemProps = {
  label: string;
  inputName: string;
  formChangeHandler: (event: ChangeEvent) => void;
  value: string;
  autoComplete?: string;
};
const FormItem = (props: FormItemProps) => {
  const { label, inputName, formChangeHandler, value, autoComplete } = props;
  const styles = useStyles();

  return (
    <>
      <Grid item sm={3} xs={12}>
        <Typography variant="body1" color="primary">
          {label} :
        </Typography>
      </Grid>
      <Grid item sm={9} xs={12}>
        <TextField
          variant="outlined"
          type="password"
          defaultValue=""
          value={value}
          label={label}
          name={inputName}
          onChange={formChangeHandler}
          autoComplete={autoComplete}
        />
      </Grid>
    </>
  );
};
FormItem.propTypes = {
  formChangeHandler: PropTypes.func.isRequired,
  inputName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  autoComplete: PropTypes.string,
};

// @ts-ignore
const ValidateEmailCodeForm: RenderCallback = (props) => {
  const { formChangeHandler, formValues, clearFormvalues } = props;
  const router = useRouter();
  const context = useContext(EmailContext);
  const sessionDispatch = useSessionDispatch();
  const [validateCode, { data, loading, error }] = useMutation(
    VALIDATE_RESET_PASSWORD_CODE,
  );
  const styles = useStyles();
  const [focusState, setFocusState] = useState<string>('input1');

  const input1Ref = React.createRef();
  const input2Ref = React.createRef();
  const input3Ref = React.createRef();
  const input4Ref = React.createRef();

  /* */
  useEffect(() => {
    // if formvalues is not empty
    if (Object.keys(formValues).length !== 0) {
      if (formValues.input1) setFocusState('input2');
      if (formValues.input2) setFocusState('input3');
      if (formValues.input3) setFocusState('input4');
      if (formValues.input4) setFocusState('');
    }
  }, [formValues]);

  useEffect(() => {
    // @ts-ignore
    if (focusState === 'input1') input1Ref.current.focus();
    // @ts-ignore
    if (focusState === 'input2') input2Ref.current.focus();
    // @ts-ignore
    if (focusState === 'input3') input3Ref.current.focus();
    // @ts-ignore
    if (focusState === 'input4') input4Ref.current.focus();
  }, [focusState]);

  useEffect(() => {
    if (focusState === '') {
      const code = ''.concat(
        formValues.input1,
        formValues.input2,
        formValues.input3,
        formValues.input4,
      );
      const intCode = parseInt(code, 10);

      validateCode({
        variables: {
          validateActionCodeInfos: {
            codeId: context.codeId,
            code: intCode,
          },
        },
      });
    }
  }, [focusState]);

  useEffect(() => {
    if (data && data.validateActionCode && data.validateActionCode.id) {
      sessionDispatch({
        type: 'login',
        payload: omitTypename(data.validateActionCode),
      });
      <Redirect to="/account/security" />;
      router.push(`/account/security`);
    } else if (data) {
      clearFormvalues();
      setFocusState('input1');
    }
  }, [data]);
  return (
    <div className={styles.main}>
      <Typography variant="h6" className={styles.subTitle}>
        Entrez le code présent dans l'email:
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={3}>
          <TextField
            name="input1"
            inputProps={{ style: { textAlign: 'center' } }}
            variant="outlined"
            InputLabelProps={{ shrink: false }}
            inputRef={input1Ref}
            value={formValues.input1 || ''}
            onChange={formChangeHandler}
            disabled={focusState === 'input1' ? false : true}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="input2"
            inputProps={{ style: { textAlign: 'center' } }}
            variant="outlined"
            InputLabelProps={{ shrink: false }}
            inputRef={input2Ref}
            value={formValues.input2 || ''}
            onChange={formChangeHandler}
            disabled={focusState === 'input2' ? false : true}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="input3"
            inputProps={{ style: { textAlign: 'center' } }}
            variant="outlined"
            InputLabelProps={{ shrink: false }}
            inputRef={input3Ref}
            value={formValues.input3 || ''}
            onChange={formChangeHandler}
            disabled={focusState === 'input3' ? false : true}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="input4"
            inputProps={{ style: { textAlign: 'center' } }}
            variant="outlined"
            InputLabelProps={{ shrink: false }}
            inputRef={input4Ref}
            value={formValues.input4 || ''}
            onChange={formChangeHandler}
            disabled={focusState === 'input4' ? false : true}
          />
        </Grid>
      </Grid>
      {loading && (
        <Box mt={3}>
          <CircularProgress />
        </Box>
      )}
      {data && !data.login && (
        <Box mt={3}>
          Le code renseigné n'est pas correct, veuillez réessayer.
        </Box>
      )}
    </div>
  );
};

export default ValidateEmailCodeForm;
