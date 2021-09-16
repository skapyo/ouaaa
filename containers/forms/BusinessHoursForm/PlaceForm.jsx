import React, { useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

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
        value={value}
        placeHolder="entrez une adresse"
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleSubmit}
      />
    </form>
  );
}

export default PlaceForm;
