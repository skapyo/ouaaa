import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '2em'
  },
  partners: {
    padding: '2em 0',
    textAlign: 'center',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      padding: '1em 0',
    },
    width:"100%",
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
          <img height="50px" src="https://static.ouaaa-transition.fr/static/images/actor/32/32-AU0wmu0S9A-original.jpeg?w=1920&q=75" alt="Aunis en transition" />
        </Grid>
        <Grid item  spacing={4}>
          <img height="50px" src="https://www.larochelle-zerocarbone.fr/lr-zerocarbone-theme/images/logo-zerocarbone-fill.svg" alt="La Rochelle Territoire Zéro Carbone" />
        </Grid>
        <Grid item spacing={4} >
          <img height="50px" src="https://www.insightnest.fr/wp-content/uploads/2021/07/logo_full_dark_439.png" alt="Insighnest" />
        </Grid>
        <Grid item spacing={4} >
          <img height="50px" src="https://www.onepercentfortheplanet.fr/wp-content/uploads/2020/06/Primary_Full_Color_Horizontal-1-scaled.png" alt="onpercentfortheplanet" />
        </Grid>
        <Grid item spacing={4}>
          <img height="50px" src="https://www.leanature.com/wp-content/uploads/2020/11/logo-lea-nature.svg" alt="leanature" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Partner;
