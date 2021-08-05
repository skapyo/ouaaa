/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import Place from './Place';
import PlaceForm from './PlaceForm';

const PlaceContainer = (props) => {
  const { updatePlaces, showPlace, place } = props;

  const [places, setPlaces] = useState(place !== undefined ? place : '');
  const [currentPlace, setCurrentPlace] = useState(null);

  const addPlace = (place) => {
    const newPlaces = [...places, { place }];
    setPlaces(newPlaces);
    setCurrentPlace(place);
  };

  const removePlace = (index) => {
    console.log('removed place', newPlaces);

    const newPlaces = [...places];
    newPlaces.splice(index, 1);

    console.log('removed place', newPlaces);

    setPlaces(newPlaces);
  };

  useEffect(() => {
    updatePlaces(places);
  }, [places]);

  return (
    <div>
      <div className="places">
        {currentPlace !== null && showPlace && (
          <Place place={currentPlace} removePlace={removePlace} />
        )}
      </div>
      {showPlace && currentPlace === null && <PlaceForm addPlace={addPlace} />}
    </div>
  );
};

export default PlaceContainer;
