/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { makeStyles } from '@mui/styles';
import Chip from '@mui/material/Chip';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
