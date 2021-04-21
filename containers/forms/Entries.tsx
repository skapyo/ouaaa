import * as React from 'react';

export interface EntriesProps {
  children: JSX.Element;
}
export const EntriesContext = React.createContext({});

const Entries: React.FunctionComponent<EntriesProps> = ({ children }) => {
  let [checkedCheckboxes, setCheckedCheckboxes]: [
    Array<number>,
    Function,
  ] = React.useState([]);

  const addCheckedCheckbox: Function = (item: number) => {
    setCheckedCheckboxes([...checkedCheckboxes, item]);
    if (checkedCheckboxes.length >= 3) return true;
    return false;
  };

  const removeCheckedCheckbox: Function = (item: number) => {
    const indexOfItemToRemove: number = checkedCheckboxes.indexOf(item);
    if (indexOfItemToRemove !== -1) {
      checkedCheckboxes.splice(indexOfItemToRemove, 1);
      setCheckedCheckboxes([...checkedCheckboxes]);
    } else {

    }
  };

  const getList: Function = () => {
    return checkedCheckboxes;
  };

  return (
    <EntriesContext.Provider
      value={{
        addCheckedCheckbox,
        removeCheckedCheckbox,
        getList,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};

export default Entries;
