import React, { useRef, useState } from 'react';
import L from 'leaflet';
import { Marker, Tooltip, Popup } from 'react-leaflet';
import { makeStyles } from '@material-ui/styles';
import { useLeafletContext } from '@react-leaflet/core';
import EventPopup from '../popup/EventPopup';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    width: '320px',
  },
}));

const EventMarker = (props) => {
  const { event } = props;
  const { map } = useLeafletContext();
  const popupRef = useRef();
  const tooltipRef = useRef();
  const [clicked, setClicked] = useState(false);
  const styles = useStyles();
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
          tooltipRef.current.remove();
        },
      }}
    >
      <Tooltip ref={tooltipRef}>
        <EventPopup
          event={event}
          onMouseOut={() => {
            if (!clicked) {
              popupRef.current.remove();
            }
          }}
        />
      </Tooltip>
      <Popup
        ref={popupRef}
        autoClose
        closeOnClick={false}
        position={[event.lat, event.lng]}
        eventHandlers={{
          mousedown: () => {
            if (!clicked) {
              popupRef.current.removeOn(map);
            }
          },
        }}
      >
        <EventPopup
          event={event}
          onMouseOut={() => {
            if (!clicked) {
              popupRef.current.remove();
            }
          }}
        />
      </Popup>
    </Marker>
  );
};

export default EventMarker;
