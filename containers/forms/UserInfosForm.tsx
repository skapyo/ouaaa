/* eslint react/prop-types: 0 */
import React, {
  ChangeEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import TextField from 'components/form/TextField';
import ClassicButton from 'components/buttons/ClassicButton';
import Button from '@mui/material/Button';
import { withApollo } from 'hoc/withApollo';
import { useSessionDispatch, useSessionState } from 'context/session/session';
import { useSnackbar } from 'notistack';
import FormController, {
  RenderCallback,
} from 'components/controllers/FormController';
import { gql, useMutation, useQuery } from '@apollo/client';
const UPDATE_USER_INFOS = gql`
  mutation updateUserInfos($formValues: UserInfos, $userId: Int!) {
    updateUserInfos(userInfos: $formValues, userId: $userId) {
      id
      surname
      lastname
      email
      role
      phone
      address
      postCode
      city
    }
  }
`;

const resultLabel = 'updateUserInfos';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: theme.spacing(5),
  },
  label: {
    fontWeight: 600,
  },
  delete: {
    background: 'none',
    color: theme.palette.warning.main,
    border: '1px solid',
    borderColor: theme.palette.warning.main,
    '&:hover': {
      background: 'none',
    },
  },
}));

type FormItemProps = {
  label: string;
  inputName: string;
  formChangeHandler: (event: ChangeEvent) => void;
  value: string;
};

const FormItem = (props: FormItemProps) => {
  
  const styles = useStyles();
  const { label, inputName, formChangeHandler, value } = props;
  return (
    <>
      <Grid item sm={3} xs={12}>
        <Typography variant="body1" color="primary" className={styles.label}>
          {label}
          {/* @ts-ignore */}:
        </Typography>
      </Grid>
      <Grid item sm={9} xs={12}>
        <TextField
          variant="outlined"
          value={value}
          label={label}
          name={inputName}
          onChange={formChangeHandler}
          defaultValue=""
        />
      </Grid>
    </>
  );
};
const DELETE_USER = gql`
  mutation deleteUser($userId: Int!) {
    deleteUser(userId: $userId)
  }
`;
const UserInfosForm = () => {
  const user = useSessionState();
  const sessionDispatch = useSessionDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const styles = useStyles();
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const [
    deleteUser,
    { data: deleteData, error: deleteError, loading: deleteLoading },
  ] = useMutation(DELETE_USER);
  const submitDeleteUser = () => {
    deleteUser({
      variables: {
        userId: parseInt(user.id),
      },
    });
    setOpenDeleteDialog(false);
  };

  const Form: RenderCallback = ({
    formChangeHandler,
    submitHandler,
    isModified,
    formValues,
  }) => (
    <Grid
      container
      alignItems="center"
      spacing={3}
      className={styles.gridContainer}
    >
      <FormItem
        label="Prénom"
        inputName="surname"
        formChangeHandler={formChangeHandler}
        value={formValues.surname}
      />
      <FormItem
        label="Nom"
        inputName="lastname"
        formChangeHandler={formChangeHandler}
        value={formValues.lastname}
      />
      <FormItem
        label="Email"
        inputName="email"
        formChangeHandler={formChangeHandler}
        value={formValues.email}
      />
      <FormItem
        label="Téléphone"
        inputName="phone"
        formChangeHandler={formChangeHandler}
        value={formValues.phone}
      />
      <FormItem
        label="Adresse"
        inputName="address"
        formChangeHandler={formChangeHandler}
        value={formValues.address}
      />
      <FormItem
        label="Code postal"
        inputName="postCode"
        formChangeHandler={formChangeHandler}
        value={formValues.postCode}
      />
      <FormItem
        label="Ville"
        inputName="city"
        formChangeHandler={formChangeHandler}
        value={formValues.city}
      />

      <Grid item xs={12}>
        <ClassicButton onClick={submitHandler} disabled={!isModified}>
          Sauvegarder les modifications
        </ClassicButton>
        <br/>
        <ClassicButton
          variant="contained"
          className={styles.delete}
          onClick={handleClickOpenDeleteDialog}
        >
          Supprimer votre compte
        </ClassicButton>
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Êtes-vous sûr(e) de vouloir supprimer votre compte ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Une fois supprimé, votre compte sera définitivement supprimé. Il
              ne sera plus visible sur notre plateforme, ni pour vous, ni pour
              les visiteurs. Assurez vous de supprimer les événements ou page acteurs avant de supprimer votre compte.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Annuler
            </Button>
            <Button onClick={submitDeleteUser} color="primary" autoFocus>
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
    // )
  );

  const afterUpdate = useCallback(
    (data, error) => {
      sessionDispatch({
        type: 'login',
        payload: data,
      });
      enqueueSnackbar('Modifications effectuées.', {
        preventDuplicate: true,
      });
    },
    [sessionDispatch],
  );

  const queryOptions = useMemo(() => {
    return {
      query: UPDATE_USER_INFOS,
      resultLabel,
      mutationResultControl: 'builtin',
      afterResultControlCallback: afterUpdate,
    };
  }, [afterUpdate]);

  return (
    <FormController
      render={Form}
      initValues={user}
      withQuery
      queryOptions={queryOptions}
    />
  );
};

export default withApollo()(UserInfosForm);
