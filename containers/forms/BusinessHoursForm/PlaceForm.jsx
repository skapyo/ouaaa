import React, { useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

function PlaceForm({ addPlace }) {
  const [value, setValue] = React.useState('');

  //   const valueRef = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addPlace(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* <TextField
        id="filled-disabled"
        label="Emplacement"
        defaultValue={value}
        variant="outlined"
        // inputRef={valueRef}
        onChange={(e) => setValue(e.target.value)}
        helperText="Indiquez ici le lieu de rendez-vous"
      /> */}
    </form>
  );
}

export default PlaceForm;
