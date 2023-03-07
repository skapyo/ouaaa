import React from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import { Box, Container, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
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
