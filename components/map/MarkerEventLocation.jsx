import React, { useRef, useState } from 'react';
import L from 'leaflet';
import { Marker, Tooltip, Popup } from 'react-leaflet';
import { makeStyles } from '@material-ui/styles';
import { useLeafletContext } from '@react-leaflet/core';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    width: '320px',
  },
}));

const MarkerEventLocation = (props) => {
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
      icon={
        new L.Icon({
          iconUrl: '/icons/location.svg',
          iconAnchor: [13, 34], // point of the icon which will correspond to marker's location
          iconSize: [25],
          popupAnchor: [1, -25],
          html: `<span style="background-color: red" />`,
        })
      }
    >
      <Popup>
        {event.name}
        {' '}
        -
        {' '}
        { !event.address && event.city && (
          <span>
            
            {event.city}
          </span>
        )}
        {event.address && event.city && (
          <span>
            
            {`${event.address} ${event.city
            }`}
          </span>
        )}
      </Popup>
</Marker>
  );
};

export default MarkerEventLocation;
