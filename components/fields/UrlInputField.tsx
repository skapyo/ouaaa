import React from 'react';
import TextInputField, { Props as TextInputFieldProps } from './TextInputField';

type Props = Omit<TextInputFieldProps, 'type'>;

const UrlInputField = ({ name, label, rules, placeholder, helperText, ...rest }: Props) => {
  return (
    <TextInputField
      name={name}
      label={label}
      type="url"
      placeholder={placeholder || 'https://monsite.fr'}
      helperText={helperText || 'Veuillez saisir une url commençant par https:// ou http://'}
      rules={rules}
      {...rest}
    />
  );
};

export default UrlInputField;
