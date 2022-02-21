import React, { useRef } from 'react';
import L from 'leaflet';
import { Marker, Tooltip, Popup } from 'react-leaflet';
import { makeStyles } from '@material-ui/styles';
import ActorPopup from '../popup/ActorPopup';
import { useLeafletContext } from '@react-leaflet/core';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    width: '320px',
  },
}));

const ActorMarker = (props) => {
  const { actor } = props;
  const { map } = useLeafletContext();
  const popupRef = useRef();
  const styles = useStyles();
  let icone;
  let color;

  if (actor?.entries?.[0]?.icon) {
    icone = `/icons/marker/marker_${actor.entries[0].icon}.svg`;
    color = actor.entries[0].color;
  } else {
    icone = '/icons/place.svg';
    color = 'ref';
  }

  const markerHtmlStyles = 'background-color: red';
  const suitcasePoint = new L.Icon({
    iconUrl: icone,
    color,
    fillColor: color,
    iconAnchor: [13, 34], // point of the icon which will correspond to marker's location
    iconSize: [60],
    popupAnchor: [1, -25],
    html: `<span style="${markerHtmlStyles}" />`,
  });

  return (
    <Marker
      key={`marker-${actor.id}`}
      position={[actor.lat, actor.lng]}
      icon={suitcasePoint}
      eventHandlers={{
        mouseover: () => {
          popupRef.current.openOn(map);
        }
      }}
    >
      <Popup ref={popupRef} autoClose={true} closeOnClick={false} position={[actor.lat, actor.lng]} eventHandlers={{
        mousedown: () => {
          console.log('mouseout')
          popupRef.current.removeOn(map)
        }
      }}>
        <ActorPopup actor={actor} onMouseOut={() => {
          console.log('mouseout', popupRef)
          popupRef.current.remove()
        }} />
      </Popup>
    </Marker>
  );
};

export default ActorMarker;