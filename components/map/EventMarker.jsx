import React, { useRef, useState } from 'react';
import L from 'leaflet';
import { Marker, Tooltip, Popup } from 'react-leaflet';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/styles';
import { useLeafletContext } from '@react-leaflet/core';
import {
  useTheme,
} from '@material-ui/core';
import EventPopup from '../popup/EventPopup';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    [theme.breakpoints.down('sm')]: {
      width: '250px',
    },

  },
}));

const EventMarker = (props) => {
  const { event } = props;
  const { map } = useLeafletContext();
  const popupRef = useRef();
  const tooltipRef = useRef();
  const [clicked, setClicked] = useState(false);
  const theme = useTheme();
  const styles = useStyles();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  let icone;
  let color;

  if (event?.entries?.[0]?.icon) {
    icone = `/icons/marker/marker_${event.entries[0].icon}.svg`;
    color = event.entries[0].color;
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
      key={`marker-${event.id}`}
      position={[event.lat, event.lng]}
      icon={suitcasePoint}
      eventHandlers={{
        click: () => {
          if (tooltipRef.current) {
            tooltipRef.current.remove();
          }
        },
      }}
    >
      { !matches && (
      <Tooltip ref={tooltipRef}>
        <EventPopup
          event={event}
          className={styles.tooltip}
          onMouseOut={() => {
            if (!clicked) {
              tooltipRef.current.remove();
            }
          }}
        />
      </Tooltip>
      )}
      <Popup
        ref={popupRef}
        position={[event.lat, event.lng]}
        className={styles.tooltip}
        eventHandlers={{
          mousedown: () => {
            if (!clicked && !matches) {
              popupRef.current.removeOn(map);
            }
          },
        }}
      >
        <EventPopup
          event={event}

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

export default EventMarker;
