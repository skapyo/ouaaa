import AccountPageLayout from 'containers/layouts/accountPage/AccountPageLayout';
import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import UpdatePasswordForm from 'containers/forms/UpdatePasswordForm';

const useStyles = makeStyles((theme) => ({
  userInfosTitle: {
    marginBottom: theme.spacing(5),
  },
}));

const SecurityPage = () => {
  const styles = useStyles();

  return (
    <AccountPageLayout>
      <Typography
        color="secondary"
        variant="h6"
        className={styles.userInfosTitle}
      >
        Modifier mon mot de passe
      </Typography>
      <UpdatePasswordForm />
    </AccountPageLayout>
  );
};

export default SecurityPage;
