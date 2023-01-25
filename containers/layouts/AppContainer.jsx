import { Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  withMaxWidth: {
    marginTop: theme.spacing(6),
    maxWidth: '1120px',
  },
  noMaxWidth: {
    marginTop: theme.spacing(6),
  },
}));

const AppContainer = ({ children, ...props }) => {
  const styles = useStyles();

  if (props?.maxWidth) {
    return (
      <Container className={styles.noMaxWidth} {...props}>
        {children}
      </Container>
    );
  }
  return (
    <Container className={styles.withMaxWidth} {...props}>
      {children}
    </Container>
  );
};

export default AppContainer;
