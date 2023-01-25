import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

function PlaceForm({ addPlace }) {
  const [value, setValue] = React.useState('');

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
        width="80%"
        style={{ width: '80%' }}
        value={value}
        placeHolder="entrez une adresse"
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleSubmit}
      />
    </form>
  );
}

export default PlaceForm;
