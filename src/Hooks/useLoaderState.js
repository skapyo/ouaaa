import {useState, useEffect, useCallback} from 'react';
import update from "immutability-helper";

// function to find the card in the state
const findListener = (list, key) => {
    const object = list.filter(c => c.key === key)[0];
    return {
        object,
        index: list.indexOf(object)
    };
};

const useLoaderState = (init = true) => {

    const [loading, setLoadingInd] = useState(init);
    const [listenersList, setListenersList] = useState([]);

    // function to add values in state
    // value = {key,value}
    const addListener = useCallback((listener) => {
        setListenersList((prevState, props) => {
            return update(prevState, {
                $push: [{ key: listener, value: true }]
            });
        });
    },[setListenersList]);

    const changeListenerValue = useCallback((key, value) => {
        setListenersList((prevState, props) => {
            const { index } = findListener(prevState, key);
            return update(prevState, {
                $splice: [[index, 1, { key: key, value: value }]]
            });
        });
    },[setListenersList]);

    const resetListenersList = useCallback(() => {
        setListenersList([]);
    },[setListenersList]);

    useEffect(() => {
        if (
            listenersList &&
            listenersList.filter(listener => listener.value === true).length > 0
        ) {
            setLoadingInd(true);
        } else if (listenersList && listenersList.length !== 0) {
            setLoadingInd(false);
        }
    }, [listenersList]);

    return [loading, {addListener, changeListenerValue,resetListenersList}];
};

export default useLoaderState;