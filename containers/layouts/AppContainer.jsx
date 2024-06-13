import { Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';




const AppContainer = ({ children, ...props }) => {

  return (
    <Container {...props}>
      {children}
    </Container>
  );
};

export default AppContainer;
