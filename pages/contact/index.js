import React from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import {
  Box, Container, makeStyles, RootRef, Typography,
} from '@material-ui/core';
import Newsletter from '../../containers/layouts/Newsletter';

const useStyles = makeStyles((theme) => ({

  align: {
    'text-align': 'center',
  },

}));
const Contact = () => {
  const styles = useStyles();
  return (
    <AppLayout>
      <RootRef>
        <Box>
          <Container className={styles.align}>
            <Typography variant="h1">Contact</Typography>
            <Typography variant="h4">En cours de construction</Typography>
          </Container>
          <Newsletter />
        </Box>
      </RootRef>
    </AppLayout>
  );
};

export default Contact;
