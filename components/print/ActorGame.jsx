/* eslint-disable react/prop-types, import/no-unresolved, @typescript-eslint/explicit-module-boundary-types */
import React, {
  useMemo,
} from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Typography,
  RootRef,
  Box,
} from '@material-ui/core';
import Parser from 'html-react-parser';
import moment from 'moment';
import QRCode from "react-qr-code";

import AppLayout from 'containers/layouts/AppLayout';
import {
  entriesHasElementWithCode,
  urlRectification,
  urlWithHttpsdefault,
} from '../../utils/utils';

const useStyles = makeStyles((theme) => ({
  instruction: {
    color: '#68b5a9',
    fontWeight: 'bold',
    fontSize: '23px',
  },
  granddefi: {
    textAlign: 'center',
    width: '30%',
  },
  logo: {
    width: '50%',
  },
  align: {
    textAlign: 'center',
  },
  cardInfo: {
    backgroundColor: 'white',
    justify: 'center',
    marginTop: 20,
    textAlign: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 16,
    },
  },
  infoPratiqueGrid: {
    textAlign: 'center',
    backgroundColor: '#ededf5',
    borderRadius: 5,
    '& > *:first-child': {
      border: 'none',
    },
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '2em',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: 10,
    },
  },
  cardTitle: {
    color: theme.typography.h5.color,
    fontFamily: theme.typography.h5.fontFamily,
    textTransform: 'uppercase',
    fontWeight: '400',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem !important',
    },
    fontSize: '8em',
  },
  h1: {
    fontSize: '3rem',
  },
  cardTitleCategories: {
    color: theme.typography.h5.color,
  },
  infoValue: {
    color: theme.typography.h5.color,
    fontWeight: 700,
    whiteSpace: 'break-spaces',
    overflowWrap: 'break-word',
  },
  infoLabel: {
    color: theme.typography.h5.color,
  },

  iconEntry: {
    height: '20px',
    marginRight: '0.5em',
    marginLeft: '0.5em',
  },

  descriptionInfoLabel: {
    display: 'inline-block',
    fontWeight: 700,
    margin: '0.5em',
  },
  descriptionInfoValue: {
    display: 'inline-block',
  },
  descriptionInfoDiv: {
    display: 'inline-block',
    margin: '0em 1em 0em 1em',
  },
  image: {
    height: '200px',
    width: '200px',
    margin: '10px auto',
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
    },
  },
  infoPratiqueTitle: {
    fontWeight: '900',
    color: '#2C367E',
    width: '100%',
    padding: '1em',
  },
  infoPratiqueItem: {},
  alignLeft: {
    textAlign: 'left',
    padding: '1em',
  },
  alignRight: {
    textAlign: 'right',
    padding: '1em',
  },
  infoDiv: {
    width: '100%',
  },
  icon: {
    color: '#bd0b3d',
    width: '20px',
  },
}));

const ActorName = (props) => {
  const { name } = props;
  const classes = useStyles(props);

  if (!name) return null;

  return (
    <div>
      <Typography variant="h1" className={classes.cardTitle}>
        {name}
      </Typography>
    </div>
  );
};


const Actor = React.forwardRef((props, ref) => {
  const { actor } = props;
  const classes = useStyles();

  const actorPictures = actor?.pictures || [];

  const logo = useMemo(() => {
    const logoPictures = actorPictures.filter((picture) => picture.logo);
    return logoPictures.length > 0 ? logoPictures[0] : null;
  }, [actorPictures]);

  return (
    <Container className={classes.cardInfo} ref={ref}>
      <RootRef>
        <Box>
          <Container className={classes.align}>
            <img src="/image/GrandDefi-LOGO.png" alt="Grand défi" width="50%" />
            <br />
            <br />
            <br />
            <ActorName name={actor?.name} />
            <br />
            <br />
            <br />
            <div className={classes.instruction}> Scannez ce QR code pour valider votre passage</div>
            <br />
            <br />
            <br />
            <QRCode value={`${process.env.NEXT_PUBLIC_URI}/validateGameActor/${actor.id}`} />
            <br />
            <br />
            <br />
            <img className={classes.logo} src="/logo.png" alt="OUAAA! : Agir pour la Transition Ecologique &amp; Sociale en Aunis | La Rochelle" />
          </Container>
        </Box>
      </RootRef>
    </Container>

  );
});

export default Actor;
