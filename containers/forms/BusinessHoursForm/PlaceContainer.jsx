import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Place from './Place';
import PlaceForm from './PlaceForm';

function PlaceContainer(props) {
  const { updatePlaces } = props;

  const [places, setPlaces] = useState([]);

  const addPlace = (text) => {
    const newPlaces = [...places, { text }];
    setPlaces(newPlaces);
    console.log('new places', places);
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
      <p>Veuillez entrer les differents emplacements</p>
      <div className="places">
        {places.map((place, index) => (
          <Place
            key={index}
            index={index}
            place={place}
            removePlace={removePlace}
          />
        ))}
      </div>
      <div className="create-todo">
        <PlaceForm addPlace={addPlace} />
      </div>
    </div>
  );
}

export default PlaceContainer;
