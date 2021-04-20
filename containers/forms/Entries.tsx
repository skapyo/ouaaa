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

  console.log(checkedCheckboxes);

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
      throw new Error(
        'The element is absent from the list of checked items, though is should not. Here is the list :' +
          checkedCheckboxes.toString(),
      );
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
