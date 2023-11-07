import { Container, Grid, IconButton, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter, withRouter } from 'next/router';
import { withApollo } from 'hoc/withApollo';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import withDndProvider from '../../hoc/withDnDProvider';

const useStyles = makeStyles((theme) => ({
  introduction: {
    textAlign: 'justify',
  },
}));
const CharterForm = (props) => {
  const {
    handleChangeCharter,
    ...other
  } = props;

  const styles = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <br />
      <Typography className={styles.introduction}>
        Félicitations, vous avez un compte
        {' '}
        <i>PAT-OUAAA!</i>
        {' '}
        personnel et vous vous apprêtez à créer une page Acteur.
        {' '}
        <br />
        .
      </Typography>
      <br />
      <br />
      <FormControlLabel
        control={(
          <Checkbox
            onChange={handleChangeCharter}
            name="checkedB"
            color="primary"
          />
          )}
        label="Je respecte et j'adhère à la charte pour poursuivre l'inscription"
      />
       <br />
      <br />
    </Container>
  );
};
export default withDndProvider(withRouter(withApollo()(CharterForm)));
