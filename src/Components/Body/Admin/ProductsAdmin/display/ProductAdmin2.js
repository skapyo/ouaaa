import React,{useState,useEffect} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {useParams,Link} from "react-router-dom";
import { Card,Header, Icon, Label } from "semantic-ui-react";
import {GET_PRODUCTS_BY_CATEGORY} from '../../../../../Queries/contentQueries';
import {getImageUrl} from '../../../../../Utils/utils';
import useLoaderState from '../../../../../Hooks/useLoaderState';
import useWindowSize from '../../../../../Hooks/useWindowSize';
import Loader from '../../../../Loader/Loader';
import ShopCard from './Card';
import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";


const headerStyle = {
    "font-family": "Ubuntu', sans-serif",
    "font-size": "30px",
    // 'font-style': 'normal',
    "font-weight": "lighter",
    color: "#009C95"
  };


const ItemTypes = {
  CARD: "card"
};

const ProductAdmin2 = ({initData}) => {

    const {categoryId} = useParams();

    const {data, loading, error} = useQuery(GET_PRODUCTS_BY_CATEGORY,{variables:{id:categoryId}});

    const [dataWithoutTypename, setDataWithoutTypename] =useState(null);

    useEffect(() => {
      if(data) {
        const omitTypename = (key, value) => (key === '__typename' ? undefined : value)
        // dataWithoutTypename = JSON.parse(JSON.stringify(data.page.products), omitTypename)
        setDataWithoutTypename(JSON.parse(JSON.stringify(data.page.products), omitTypename));
      }

    },[data]);

    // Init cards content
    const [cards, setCards] = useState(dataWithoutTypename);

    useEffect(() => {
      setCards(dataWithoutTypename);
    }, [dataWithoutTypename])

    console.log("--cards");
    console.log(data);
    console.log(dataWithoutTypename);
    console.log(cards);
    console.log("--cards >");

    const {height} = useWindowSize();
    const midHeight = (height - 230 - 230 - 10) / 2;
    const midHeightString = `${midHeight}px 0 0 0`;

  
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

  // function to find the card in the state
  const findCard = id => {
    const card = cards.filter(c => `${c.id}` === id)[0];
    return {
      card,
      index: cards.indexOf(card)
    };
  };

  const [, drop] = useDrop({ accept: ItemTypes.CARD });

  // console.log(findCard);
      
  if (loading || !cards)
    return <Loader midHeightString={midHeightString} />;

  if (error) 
    return 'error';

  return (
      <>
        {/* <Header as='h1' style={headerStyle}>{data.page.label}</Header> */}
        <br />
        <br />
        <Card.Group ref={drop} itemsPerRow={3}>
          {cards.map((product) => (
            <ShopCard 
              product = {product}
              moveCard={moveCard}
              findCard={findCard}
              key={product.id}
              id={`${product.id}`}
            />
          ))}
        </Card.Group>
      </>
    );

}

const withDndProvider = Component => () => {
 
  return (
    <DndProvider backend={Backend}>
      <Component />
    </DndProvider>
  );
};

export default withDndProvider(ProductAdmin2);
