/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import Place from './Place';
import PlaceForm from './PlaceForm';

const PlaceContainer = (props) => {
  const { updatePlaces, showPlace, selectLocation } = props;

  const [places, setPlaces] = useState([]);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [getLocation, setGetLocation] = useState(true);

  const addPlace = (place) => {
    const newPlaces = [...places, { place }];
    setPlaces(newPlaces);
    selectLocation(place);
    setCurrentPlace(place);
  };

  const removePlace = (index) => {
    const newPlaces = [...places];
    newPlaces.splice(index, 1);
    setPlaces(newPlaces);
  };

  useEffect(() => {
    updatePlaces(places);
  }, [places]);

  return (
    <div>
      {showPlace && !getLocation && (
        <Button onClick={() => setGetLocation(!getLocation)}>
          Ajouter un lieu
        </Button>
      )}
      <div className="places">
        {currentPlace !== null && showPlace && (
          <Place place={currentPlace} removePlace={removePlace} />
        )}
      </div>
      {showPlace && getLocation && currentPlace === null && (
        <PlaceForm addPlace={addPlace} />
      )}
    </div>
  );
};

export default PlaceContainer;
