import React, { useCallback } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '2em',
  },
  partners: {
    padding: '2em 0',
    textAlign: 'center',
    cursor: 'pointer',
    [theme.breakpoints.down('lg')]: {
      padding: '1em 0',
    },
    width: '100%',
  },
  title: {
    textAlign: 'center',
    fontSize: '32px',
  },
}));

const Partner = () => {
  const styles = useStyles();
  const router = useRouter();

  const handleClickAbout = useCallback(() => {
    router.push('/about');
  }, [router]);

  return (
    <Grid container className={styles.container} justifyContent="center">
      <Grid item container justifyContent="center" className={styles.title}>
        Ils s'engagent avec nous
      </Grid>
      <Grid item container direction="row" justifyContent="space-around" className={styles.partners} xs={10} sm={6} onClick={handleClickAbout}>
        <Grid item>
          <Image width="50" height="50" src="https://static.ouaaa-transition.fr/static/images/actor/32/32-AU0wmu0S9A-original.jpeg?w=1920&q=75" alt="Aunis en transition" />
        </Grid>
        <Grid item spacing={4}>
          <Image width="50" height="50" src="/image/logo-LRTZC.jpg" alt="La Rochelle Territoire Zéro Carbone" />
        </Grid>
        <Grid item spacing={4}>
          <Image width="140" height="50" src="/logo_insightnest.png" alt="Insighnest" />
        </Grid>
        <Grid item spacing={4}>
          <Image width="100" height="50" src="/logo_one_per_cent_planet.png" alt="onpercentfortheplanet" />
        </Grid>
        <Grid item spacing={4}>
          <Image width="100" height="50" src="/logo-lea-nature.svg" alt="leanature" />
        </Grid>
        <Grid item spacing={4}>
          <Image width="200" height="50" src="/image/logo-CDA.jpg" alt="Communauté d'Agglomération de la rochelle" />
        </Grid>
        <Grid item spacing={4}>
          <Image width="100" height="50" src="/image/logo-na.jpg" alt="Région nouvelle aquitaine" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Partner;
