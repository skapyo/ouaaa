/* eslint-disable jsx-a11y/anchor-has-content */
import { Card, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { useDropArea } from 'react-use';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
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

  const [bond, state] = useDropArea({
    onFiles: (files) => onDropHandler(files),
  });

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
            id="contained-button-file"
            multiple
            onChange={(e) => {onDropHandler(Array.from(e.target.files))}}
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
            Téléverser
            </Button>
          </label>
        </Grid>
        </Hidden>
        <Hidden lgUp>
          <Grid item xs={12}>
          <input
            accept="image/jpeg"
            className={styles.input}
            id="contained-button-file"
            multiple
            onChange={(e) => {onDropHandler(Array.from(e.target.files))}}
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Téléverser
            </Button>
          </label>
        </Grid>
        </Hidden>
      </Grid>
    </Card>
  );
};

export default ImagesDropZone;
