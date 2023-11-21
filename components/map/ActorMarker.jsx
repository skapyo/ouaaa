import React, { useRef, useState } from 'react';
import L from 'leaflet';
import { Marker, Tooltip, Popup } from 'react-leaflet';
import { makeStyles } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLeafletContext } from '@react-leaflet/core';
import {
  useTheme,
} from '@mui/material';
import ActorPopup from '../popup/ActorPopup';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    width: '320px',
  },
}));

const ActorMarker = (props) => {
  const { actor } = props;
  const { map } = useLeafletContext();
  const popupRef = useRef();
  const tooltipRef = useRef();

  const [clicked, setClicked] = useState(false);
  const theme = useTheme();
  const styles = useStyles();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  let icone;
  let color;
debugger;

  if (actor?.entries?.filter(e => e.category?.code == "category_organization")?.length > 0) {
    icone = `/icons/icon.svg`;
    color = actor?.entries?.filter(e => e.category.code == "category_organization")[0].color;
  } else {
    icone = '/icons/icon.svg';
  
  }
  color = '#CD5C5C';
  const myCustomColour = '#CD5C5C'

  const markerHtmlStyles = `
    background-color: ${myCustomColour};
    width: 3rem;
    height: 3rem;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`;
  const suitcasePoint = new L.Icon({
    iconUrl: icone,
    color,
    fillColor: color,
    iconAnchor: [15, 32], // point of the icon which will correspond to marker's location
    iconSize: [20],
    popupAnchor: [18, -30],
    html: `<span style="${markerHtmlStyles}" />`,
  });

  return (
    <Marker
      key={`marker-${actor.id}`}
      position={[actor.lat, actor.lng]}
      icon={suitcasePoint}
      eventHandlers={{
        click: () => {
          if (tooltipRef.current) {
            tooltipRef.current.remove();
          }
        },
      }}
    >
      {!matches && (
        <Tooltip ref={tooltipRef} offset={[-2, -12]} direction="left">
          <ActorPopup
            actor={actor}
            onMouseOut={() => {
              if (!clicked) {
                tooltipRef.current.remove();
              }
            }}
            tooltip
          />
        </Tooltip>
      )}
      <Popup
        ref={popupRef}
        eventHandlers={{
          mousedown: () => {
            if (!clicked && !matches) {
              popupRef.current.removeOn(map);
            }
          },
        }}
        closeButton={false}
        minWidth={300}
      >
        <ActorPopup
          actor={actor}
          onMouseOut={() => {
            if (!clicked && !matches) {
              popupRef.current.remove();
            }
          }}
        />
      </Popup>
    </Marker>
  );
};

export default ActorMarker;
