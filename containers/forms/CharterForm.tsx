import {
  Container,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useRouter, withRouter } from 'next/router';
import { withApollo } from 'hoc/withApollo';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
        <i>OUAAA!</i>
        {' '}
        personnel et vous vous apprêtez à créer une page Acteur.
        {' '}
        <br />

        Nous vous invitons à lire notre
        {' '}
        <a href="/charter" target="blank">charte</a>
        {' '}
        afin de savoir si vous
        adhérez aux valeurs de
        {' '}
        <i>OUAAA!</i>
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
