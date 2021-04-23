import * as React from 'react';


export interface RadioGroupProps {
  children: JSX.Element,
  initValue : string;
}
export const RadioGroupContext = React.createContext({});

const RadioGroupForContext: React.FunctionComponent<RadioGroupProps> = ({ children, initValue }) => {
  const [currentValue, setCurrentValue]: [
    string,
    Function,
  ] = React.useState(initValue !== undefined ? initValue : '');
 

  const getCurrentValue: Function = () => {
    return currentValue;
  };

  return (
    <RadioGroupContext.Provider
      value={{
        setCurrentValue,
        getCurrentValue,
      }}
    >
      {children}
    </RadioGroupContext.Provider>
  );
};

export default RadioGroupForContext;
