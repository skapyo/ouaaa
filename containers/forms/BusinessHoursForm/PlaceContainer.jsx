/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Place from './Place';
import PlaceForm from './PlaceForm';
const useStyles = makeStyles((theme) => ({
  places: {
    paddingTop: '5px',
    paddingBottom: '5px',
  },
}));

const PlaceContainer = (props) => {
  const classes = useStyles();
  const { updatePlace, showPlace, place } = props;

  const [currentPlace, setCurrentPlace] = useState(
    place !== null ? place : null,
  );

  const addPlace = (input) => {
    setCurrentPlace(input);
  };

  const removePlace = () => {
    setCurrentPlace(null);
  };

  useEffect(() => {
    updatePlace(currentPlace);
  }, [currentPlace]);

  return (
    <div>
      <div className={classes.places}>
        {showPlace && currentPlace !== null && (
          <Place place={currentPlace} removePlace={removePlace} />
        )}
        {showPlace && <PlaceForm addPlace={addPlace} />}
      </div>
    </div>
  );
};

export default PlaceContainer;
