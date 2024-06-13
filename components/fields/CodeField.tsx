import { Stack, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

type NumberFieldProps = {
  selected: boolean;
  onChange: (value: string) => void;
};

const NumberField = ({ selected, onChange }: NumberFieldProps) => {
  const [val, setVal] = useState('');
  const inputRef = useRef<HTMLInputElement>();

  const handleChange = (e) => {
    if (/\d/.test(e.target.value)) {
      setVal(e.target.value);
      onChange(e.target.value);
    }
  };

  useEffect(() => {
    if (selected && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selected]);

  return (
    <TextField
      disabled={!selected}
      variant="outlined"
      required
      autoFocus
      value={val}
      inputRef={inputRef}
      onChange={handleChange}
      inputProps={{
        sx: { textAlign: 'center', fontSize: '2em' },
      }}
    />
  );
};

type Props = {
  length?: number;
  onSubmit: (value: number) => void;
};

const CodeField = ({ length = 4, onSubmit }: Props) => {
  const [val, setVal] = useState('');
  const [focus, setFocus] = useState(0);

  const onChange = (n: string) => {
    setVal((v) => `${v}${n}`);
    setFocus((f) => f + 1);
  };

  useEffect(() => {
    if (val.length === length) {
      onSubmit(parseInt(val, 10));
    }
  }, [val]);

  return (
    <Stack direction="row" spacing={2}>
      {Array(length)
        .fill(null)
        .map((_, index) => (
          <NumberField key={index} selected={focus === index} onChange={onChange} />
        ))}
    </Stack>
  );
};

export default CodeField;
