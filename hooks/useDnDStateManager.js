import { useCallback, useMemo, useState } from 'react';
import update from 'immutability-helper';

// initialState is a list of object. Every object should have an id field
const useDnDStateManager = (initialState = []) => {
  const [objectsList, setObjectsList] = useState(initialState);
  const [objectsListSaved, setobjectsListSaved] = useState(initialState);
  // function to init state
  const initState = useCallback((state) => {
    setObjectsList(state);
    setobjectsListSaved(state);
  }, [setObjectsList, setobjectsListSaved]);

  // function to add values in state
  const addValues = (values) => {
    const newArrayTemp = update(objectsList, {
      $push: values,
    });
    setObjectsList(
      newArrayTemp.map((value, index) => {
        return { ...value, id: index };
      }),
    );
  };


  // function to find the card in the state
  const findObject = useCallback((id) => {
    const object = objectsList.filter((c) => c.id == id)[0];
    return {
      object,
      index: objectsList.indexOf(object),
    };
  }, [objectsList]);

  // function to activate / desactivate a card in the state
  // depreciated : use updateKeyIndicator
  const updateActiveIndicator = (id) => {
    const { object, index } = findObject(id);
    setObjectsList(
      update(objectsList, {
        $splice: [[index, 1, { ...object, activated: !object.activated }]],
      }),
    );
  };
  // move an object in the list from an index to another
  const moveObject = useCallback((id, atIndex) => {
    // console.log(`move card from ${id} to ${atIndex}`)
    // eslint-disable-next-line no-use-before-define
    const { object, index } = findObject(id);
    setObjectsList(
      update(objectsList, {
        $splice: [[index, 1], [atIndex, 0, object]],
      }),
    );
  }, [setObjectsList, objectsList, findObject]);

  // function to activate / desactivate the deleted indicator
  // depreciated : use updateKeyIndicator
  const updateDeletedIndicator = (id) => {
    const { object, index } = findObject(id);
    setObjectsList(
      update(objectsList, {
        $splice: [[index, 1, { ...object, deleted: !object.deleted }]],
      }),
    );
  };

  // update costum id value
  const updateKeyIndicator = useCallback((id, key, value) => {
    const { object, index } = findObject(id);
    setObjectsList(
      update(objectsList, {
        $splice: [[index, 1, { ...object, [key]: value }]],
      }),
    );
  }, [findObject, setObjectsList, objectsList]);

  const isModified = useMemo(() => {
    if (!objectsList || !objectsListSaved) return true;

    // Check if the arrays are the same length
    if (objectsList.length !== objectsListSaved.length) return true;

    // Check if all items exist and are in the same order
    for (let i = 0; i < objectsList.length; i++) {
      if (JSON.stringify(objectsList[i]) != JSON.stringify(objectsListSaved[i])) return true;
    }

    // Otherwise, return true
    return false;
  }, [objectsList, objectsListSaved]);

  const idExists = useCallback((id, value) => {
    const result = objectsList.find((o) => o[id]);
    if (result) return true;
    return false;
  }, [objectsList]);

  return {
    objectsList,
    moveObject,
    findObject,
    updateActiveIndicator,
    updateDeletedIndicator,
    initState,
    addValues,
    updateKeyIndicator,
    isModified,
    idExists,
  };
};

export default useDnDStateManager;
