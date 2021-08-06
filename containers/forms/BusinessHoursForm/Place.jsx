/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const Place = ({ place, removePlace }) => {
  return (
    place && (
      <Chip
        size="small"
        icon={<LocationOnIcon />}
        label={place}
        onDelete={() => removePlace()}
      />
    )
  );
};

export default Place;
