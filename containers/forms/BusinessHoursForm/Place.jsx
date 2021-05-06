import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 80,
  },
}));

function Place({ place, index, removePlace }) {
  const classes = useStyles();

  return (
    <Chip
      size="small"
      icon={<LocationOnIcon />}
      label={place.text}
      onClick={() => console.log('here')}
      onDelete={() => removePlace(index)}
    />
  );
}

export default Place;
