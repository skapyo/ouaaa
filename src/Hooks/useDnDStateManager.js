import {useState} from 'react';
import update from "immutability-helper";

// initialState is a list of object. Every object should have an id field
const useDnDStateManager = (initialState=[]) => {

    const [objectsList, setObjectsList] = useState(initialState);

    // function to init state
    const initState = (state) => {
        setObjectsList(state);
    };

    // function to add values in state
    const addValues = (values) => {
        let newArrayTemp = update(objectsList,{
            $push:values
        });
        setObjectsList(
            newArrayTemp.map((value,index) => {
                return {...value, id:index};
            })
        );
    };

    // move an object in the list from an index to another
    const moveObject = (id, atIndex) => {

        console.log(`move card from ${id} to ${atIndex}`)
    
        const { object, index } = findObject(id);
        setObjectsList(
          update(objectsList, {
            $splice: [[index, 1], [atIndex, 0, object]]
          })
        );
    };

    // function to find the card in the state
    const findObject = id => {
        const object = objectsList.filter(c => c.id === id)[0];
        return {
            object,
            index: objectsList.indexOf(object)
        };
    };

    // function to activate / desactivate a card in the state
    const updateActiveIndicator = (id) => {
        const { object, index } = findObject(id);
        setObjectsList(
        update(objectsList,{
            $splice:[[index,1,{...object, activated:!object.activated}]]
        })
        );
    };
        
    // function to activate / desactivate the deleted indicator
    const updateDeletedIndicator = (id) => {
        const { object, index } = findObject(id);
        setObjectsList(
        update(objectsList,{
            $splice:[[index,1,{...object, deleted:!object.deleted}]]
        })
        );
    };

    return {
        objectsList,
        moveObject,
        findObject,
        updateActiveIndicator,
        updateDeletedIndicator,
        initState,
        addValues
    };

}

export default useDnDStateManager;