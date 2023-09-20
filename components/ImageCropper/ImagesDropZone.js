/* eslint-disable jsx-a11y/anchor-has-content */
import { Card, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { useDropArea } from 'react-use';
import Button from '@mui/material/Button';
import Hidden from '@mui/material/Hidden';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '100%',
    height: '100%',
  },
  dropZone: {
    padding: '1em',
    margin: '2em',
  },
  input: {
    display: 'none',
  },
  buttonInverse: {
    color: '#2C367E',
    'background-color': 'white',
    width: '90%',
    '&:hover': {
      cursor: 'pointer',
      color: 'white',
      'background-color': '#2C367E',
    },
  },
}));

const ImagesDropZone = ({ onDropHandler, text }) => {
  const styles = useStyles();
  const scnackbar = useSnackbar();
  const [bond, state] = useDropArea({
    onFiles: (files) => {
      if (files[0].type === 'image/jpeg' || files[0].type === 'image/jpg') {
        if (files[0].size > 4e6) {
          scnackbar.enqueueSnackbar("L'image ne doit pas excéder 4Mo");
        } else {
          {
            onDropHandler(files);
          }
        }
      } else {
        scnackbar.enqueueSnackbar("Seules les images au format jpeg sont autorisées");
      }
    },
  });

  const fileUpload = (files) => {
    if (files[0].type === 'image/jpeg' || files[0].type === 'image/jpg') {
      if (files[0].size > 4e6) {
        scnackbar.enqueueSnackbar("L'image ne doit pas excéder 4Mo");
      } else {
        {
          onDropHandler(files);
        }
      }
    } else {
      scnackbar.enqueueSnackbar("Seules les images au format jpeg sont autorisées");
    }
  };
  const idInput = `contained-button-file${Math.random()}`;
  return (
    <Card className={styles.dropZone} {...bond}>
      <Grid container alignItems="center">
        <Hidden lgDown>
          <Grid item xs={8}>
            <div>
              <div>
                <InsertPhotoIcon />
              </div>
              <div>{text}</div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <input
              accept="image/jpeg"
              className={styles.input}
              id={idInput}
              multiple
              onChange={(e) => { fileUpload(Array.from(e.target.files)); }}
              type="file"
            />
            <label htmlFor={idInput}>
              <Button variant="contained" color="primary" className={styles.buttonInverse} component="span">
                Ajouter une image
              </Button>
            </label>
          </Grid>
        </Hidden>
        <Hidden lgUp>
          <Grid item xs={12}>
            <input
              accept="image/jpeg"
              className={styles.input}
              id={idInput}
              multiple
              onChange={(e) => { fileUpload(Array.from(e.target.files)); }}
              type="file"
            />
            <label htmlFor={idInput}>
              <Button variant="contained" color="primary"  className={styles.buttonInverse} component="span">
                Ajouter une image
              </Button>
            </label>
          </Grid>
        </Hidden>
      </Grid>
    </Card>
  );
};

export default ImagesDropZone;
