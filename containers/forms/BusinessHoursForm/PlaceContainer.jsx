/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import Place from './Place';
import PlaceForm from './PlaceForm';

const PlaceContainer = (props) => {
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
      <div className="places">
        {showPlace && currentPlace !== null && (
          <Place place={currentPlace} removePlace={removePlace} />
        )}
        {showPlace && <PlaceForm addPlace={addPlace} />}
      </div>
    </div>
  );
};

export default PlaceContainer;
