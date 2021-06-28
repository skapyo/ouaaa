import ClassicButton from 'components/buttons/ClassicButton';
import { RenderCallback } from 'components/controllers/FormController';
import { TextField, CircularProgress, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
// import { SetEmailContext } from "containers/forms/ResetPassword/ResetPasswordForm"

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ResetPasswordEmailForm: RenderCallback = (props) => {
  const {
    formChangeHandler,
    formValues,
    validationResult,
    submitHandler,
    loading,
  } = props;

  // const [loadingInd, setLoadingInd] = useState<boolean>(false)

  const styles = useStyles();

  return (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Email Address"
        name="email"
        autoComplete="current-email"
        autoFocus
        value={formValues?.email || ''}
        onChange={formChangeHandler}
      />
      <Box style={{ position: 'relative' }}>
        <ClassicButton
          fullWidth
          variant="contained"
          className={styles.submit}
          onClick={submitHandler}
          disabled={!validationResult?.global || loading}
        >
          M'envoyer un email de récupération
        </ClassicButton>

        {loading && (
          <CircularProgress
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-16px',
              color: '#D96552',
            }}
            size={30}
          />
        )}
      </Box>
    </>
  );
};

export default ResetPasswordEmailForm;
