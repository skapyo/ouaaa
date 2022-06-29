import React, { useRef, useState } from 'react';
import L from 'leaflet';
import { Marker, Tooltip, Popup } from 'react-leaflet';
import { makeStyles } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useLeafletContext } from '@react-leaflet/core';
import {
  useTheme,
} from '@material-ui/core';
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
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
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
