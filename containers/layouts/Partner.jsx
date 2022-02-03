import { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Link ,TextField, Typography, Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  newsletter: {
    padding: '2em 0',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '1em 0',
    },
  },
  align: {
    'text-align': 'center',
  },
}));

const Partner = () => {
  const styles = useStyles();

  return (
    <Link href={`/about`} color="inherit" underline="none" >
      <Grid container justifyContent="center" spacing={4} className={styles.newsletter}>
        <Grid item>
          <img height="50px" src="https://static.ouaaa-transition.fr/static/images/actor/32/32-AU0wmu0S9A-original.jpeg?w=1920&q=75" alt="Aunis en transition" />
        </Grid>
        <Grid item>
          <img height="50px" src="https://www.larochelle-zerocarbone.fr/lr-zerocarbone-theme/images/logo-zerocarbone-fill.svg" alt="La Rochelle Territoire Zéro Carbone" />
        </Grid>
        <Grid item>
          <img height="50px" src="https://www.insightnest.fr/wp-content/uploads/2021/07/logo_full_dark_439.png" alt="Insighnest" />
        </Grid>
        <Grid item>
          <img height="50px" src="https://www.onepercentfortheplanet.fr/wp-content/uploads/2020/06/Primary_Full_Color_Horizontal-1-scaled.png" alt="onpercentfortheplanet" />
        </Grid>
      </Grid>
    </Link>
  );
};

export default Partner;
