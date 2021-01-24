import React, {
  useState,
} from 'react';
import {
  Box, Container, RootRef,
} from '@material-ui/core';
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
      <RootRef>
        <Box>
          <Container />
        </Box>
      </RootRef>

    </AppLayout>
  );
};
export default withApollo(agenda);
