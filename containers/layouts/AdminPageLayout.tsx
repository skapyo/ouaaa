import React, { useEffect, useState } from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import { Grid, Typography, Fab, Hidden, SwipeableDrawer, Container, Box } from '@mui/material';
import AdminLeftMenu from 'containers/menus/AdminLeftMenu';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useSessionState } from 'context/session/session';
import { useRouter } from 'next/router';
import { Menu } from '@mui/icons-material';

const FixedFab = styled(Fab)(() => ({
  position: 'fixed',
  bottom: '40px',
  right: '40px',
  zIndex: '1400',
}));

type Props = {
  authorizedRoles: ('user' | 'admin')[];
};

const AdminPageLayout: React.FC<Props> = ({ children, authorizedRoles }) => {
  const user = useSessionState();
  const router = useRouter();

  const authorized = user?.role !== undefined && (!authorizedRoles || authorizedRoles.includes(user?.role));

  useEffect(() => {
    if (!authorized) {
      router.push('/');
    }
  }, [user]);

  const [openDrawer, setOpenDrawer] = useState(false);

  if (!authorized) return null;

  return (
    <AppLayout>
      <Container maxWidth={false} sx={{ marginTop: { xs: 3, md: 6 }, marginBottom: 6 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sx={{ marginBottom: { xs: 0, md: 3 } }}>
            <Typography variant="h1" color="primary" sx={{ textAlign: 'center', fontSize: '2em', my: 2 }}>
              Espace administration
            </Typography>
          </Grid>
          <Grid item md={2} sx={{ display: { xs: 'none', md: 'block' } }}>
            <AdminLeftMenu />
          </Grid>
          <Grid item xs={12} md={10}>
            {children}
          </Grid>
        </Grid>
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <FixedFab size="large" onClick={() => setOpenDrawer((o) => !o)}>
            {openDrawer ? <CloseIcon /> : <Menu />}
          </FixedFab>
          <SwipeableDrawer
            open={openDrawer}
            anchor="bottom"
            onClose={() => setOpenDrawer(false)}
            onOpen={() => setOpenDrawer(true)}
          >
            <AdminLeftMenu />
          </SwipeableDrawer>
        </Box>
      </Container>
    </AppLayout>
  );
};

export default AdminPageLayout;
