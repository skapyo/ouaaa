import React from 'react';
import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";


const DragdropContainer = ({initData,children}) => {

    // function to find the card in the state
    const findCard = id => {
        const card = cards.filter(c => `${c.id}` === id)[0];
        return {
        card,
        index: cards.indexOf(card)
        };
    };

    // function to move a card to another position in the state
    const moveCard = (id, atIndex) => {
        console.log(`move card from ${id} to ${atIndex}`)

        const { card, index } = findCard(id);
        setCards(
        update(cards, {
            $splice: [[index, 1], [atIndex, 0, card]]
        })
        );
    };


    const [, drop] = useDrop({ accept: ItemTypes.CARD });


    return (
        <>
            

        </>
    );


}

export default DragdropContainer;