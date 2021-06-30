/* eslint-disable jsx-a11y/anchor-has-content */
import { Card, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { useDropArea } from 'react-use';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
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
    <Card className={styles.dropZone}>
      <Grid container alignItems="center">
        <Hidden mdDown>
          <Grid item xs={8}>
            <div {...bond}>
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
              <Button variant="contained" color="primary" component="span">
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
              <Button variant="contained" color="primary" component="span">
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
