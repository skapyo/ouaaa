/* eslint-disable jsx-a11y/anchor-has-content */
import { Card, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { useDropArea } from 'react-use';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '100%',
    height: '100%',
  },
  dropZone: {
    padding: '1em',
    margin: '2em',
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
        <Grid item xs={12}>
          <div {...bond}>
            <div>
              <InsertPhotoIcon />
            </div>
            <div>{text}</div>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ImagesDropZone;
