import React, { useState } from 'react';
import { Box, Container,  } from '@mui/material';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { withApollo } from '../../hoc/withApollo';
import AppLayout from '../../containers/layouts/AppLayout';

const agenda = () => {
  const [stylesProps, setStylesProps] = useState({
    topImageSize: '250px',
    headerDisplay: 'static',
  });

  return (
    <AppLayout>
      <>
        <Box>
          <Container />
        </Box>
      </>
    </AppLayout>
  );
};
export default withApollo(agenda);
