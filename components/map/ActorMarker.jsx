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
 
  if (actor?.entries?.filter(e => e.color!==undefined && e.color!==null)?.length > 0) {
    icone = `/icons/icon.svg`;
    color = actor?.entries?.filter(e => e.color!==undefined && e.color!==null)[0].color;
  }else if (actor?.entries?.filter(e => e.collection?.code == "category_organization" || e.parentEntry?.collection?.code == "category_organization"  )?.length > 0) {
    icone = `/icons/icon.svg`;
    debugger;
    color = actor?.entries?.filter(e => e.collection?.code == "category_organization" || e.parentEntry?.collection?.code == "category_organization"  )[0].parentEntry.color;
  } else {
    icone = '/icons/icon.svg';

  }

  const markerHtmlStyles = `
    fill: ${color};
    width: 40px;
    height: 40px;
    `;

  const suitcasePoint = new L.divIcon({
    iconUrl: icone,
    color,
    fillColor: color,
    iconAnchor: [15, 32], // point of the icon which will correspond to marker's location
    iconSize: [20],
    className: styles.tooltip,
    popupAnchor: [18, -30],
    html: `<svg style="${markerHtmlStyles}
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:cc="http://creativecommons.org/ns#"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
    width="81.496834mm"
    height="123.74077mm"
    viewBox="0 0 81.496834 123.74077"
    version="1.1"
    id="svg8"
    inkscape:version="0.92.4 (5da689c313, 2019-01-14)"
    sodipodi:docname="icon.svg">
   <defs
      id="defs2" />
   <sodipodi:namedview
      id="base"
      pagecolor="#ffffff"
      bordercolor="#666666"
      borderopacity="1.0"
      inkscape:pageopacity="0.0"
      inkscape:pageshadow="2"
      inkscape:zoom="0.7"
      inkscape:cx="130.92147"
      inkscape:cy="18.253271"
      inkscape:document-units="mm"
      inkscape:current-layer="g4537"
      showgrid="false"
      inkscape:window-width="1920"
      inkscape:window-height="1009"
 
      inkscape:window-x="-8"
      inkscape:window-y="-8"
      inkscape:window-maximized="1" />
   <metadata
      id="metadata5">
     <rdf:RDF>
       <cc:Work
          rdf:about="">
         <dc:format>image/svg+xml</dc:format>
         <dc:type
            rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
         <dc:title></dc:title>
       </cc:Work>
     </rdf:RDF>
   </metadata>
   <g
      inkscape:label="Calque 1"
      inkscape:groupmode="layer"
      id="layer1"
      transform="translate(-1.2067914,-0.78437379)">
     <g
        id="g4537"
        transform="matrix(0.26458333,0,0,0.26458333,59.342263,47.254123)">
       <path
 
          d="m -64.286279,-174.20513 c -85.060001,0 -154.009771,68.95172 -154.009771,154.011721 0,106.06 154.009771,313.669919 154.009771,313.669919 0,0 154.00976,-207.609919 154.00976,-313.669919 0,-85.060001 -68.94976,-154.011721 -154.00976,-154.011721 z m -0.35743,93.126961 A 64.64286,61.071429 0 0 1 8.3154732e-4,-20.007859 64.64286,61.071429 0 0 1 -64.643709,41.064401 a 64.64286,61.071429 0 0 1 -64.642571,-61.07226 64.64286,61.071429 0 0 1 64.642571,-61.07031 z"
          id="path4520"
          inkscape:connector-curvature="0" />
     </g>
   </g>
  
 </svg>`,
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
