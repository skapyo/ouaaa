import L from 'leaflet';
import { useLeafletContext, createPathComponent } from '@react-leaflet/core';

const MarkerCluster = createPathComponent((props) => {
  const context = useLeafletContext();

  const options = {
    removeOutsideVisibleBounds: true,
  };
  const listeners = {};

  Object.entries(props).forEach(([propName, propValue]) => {
    !propName.startsWith('on')
      ? options[propName] = propValue
      : listeners[propName] = propValue;
  });

  const cluster = new L.markerClusterGroup(options);

  Object.entries(listeners).forEach(([eventAsProp, callback]) => {
    const event = `cluster${eventAsProp.substring(2).toLowerCase()}`;
    cluster.on(event, callback);
  });

  return {
    instance: cluster,
    context: {
      ...context,
      layerContainer: cluster
    }
  }
});

export default MarkerCluster;