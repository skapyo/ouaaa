import React from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import {
  Box,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import ContactForm from '../../containers/forms/ContactForm';

const useStyles = makeStyles((theme) => ({
  align: {
    'text-align': 'center',
  },
}));
const Contact = () => {
  const styles = useStyles();
  return (
    <AppLayout>
      <Box>
        <Container className={styles.align}>
          <Typography variant="h1">Contact</Typography>
          <ContactForm />
        </Container>
      </Box>
    </AppLayout>
  );
};

export default Contact;
