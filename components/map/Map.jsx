import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';

L.Icon.Default.mergeOptions({
  iconUrl: null,
});

const position = [46.1085193, -0.9864794];

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    height: '100% !important',
    [theme.breakpoints.down('sm')]: {
      height: '80vh !important',
    },
  },
}));

const Map = (props) => {
  const mapRef = useRef();
  const styles = useStyles();
  const [map, setMap] = useState(null);
  const { children } = props;

  useEffect(() => {
    if (map) {
      setInterval(function () {
        map.invalidateSize();
      }, 100);
    }
  }, [map]);

  return (
    <MapContainer ref={mapRef} center={position} zoom={11} className={styles.mapContainer} whenCreated={setMap}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
      {children}
    </MapContainer>
  );
};

export default Map;