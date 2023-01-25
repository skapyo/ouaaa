import React, { useMemo, useCallback } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  IconButton, Tooltip, useMediaQuery, useTheme,
} from '@mui/material';
import Moment from 'react-moment';
import moment from 'moment';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import EventCard from 'components/cards/EventCard';
import useExcelExport from '../../../hooks/useExcelExport.ts';

const useStyles = makeStyles(theme => ({
  '@media print': {
    header: {
      display: 'none !important',
    },
    cardContainer: {
      breakInside: 'avoid',
    },
    events: {
      display: 'block !important',
      marginTop: 10,
    },
    tooltipPopper: {
      display: 'none !important',
    }
  },
  events: {
    flex: 1,
    padding: '0 5em',
    paddingBottom: 66,
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      padding: '0 1em',
    },
  },
  header: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: '#2C367E',
    fontSize: '2.3em',
    display: 'flex',
    flex: 1,
  },
  date: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#AEAEAE',
  },
}));

const compare = (a, b) => {
  let comparison = 0;
  if (a.startedAt > b.startedAt) {
    comparison = 1;
  } else if (a.startedAt < b.startedAt) {
    comparison = -1;
  }
  return comparison;
};

const sameDay = (date1, date2) => {
  const d1 = new Date(parseInt(date1));
  const d2 = new Date(parseInt(date2));
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const Events = (props) => {
  const classes = useStyles();
  const { events = [], loading } = props;
  const theme = useTheme();
  const exportData = useExcelExport();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const sortedEvents = useMemo(() => {
    let localEvents = ([]).slice();
    events.forEach((event) => {
      if (!sameDay(event.startedAt, event.endedAt)) {
        const nbDayEvent = moment(new Date(parseInt(event.endedAt))).diff(
          moment(new Date(parseInt(event.startedAt))),
          'days',
        );
        if (nbDayEvent >= 1) {
          const newEventForOtherDay = { ...event };
          moment.locale('fr')
          event = Object.assign({ duration: `Du ` + moment(new Date(parseInt(event.startedAt))).format('DD MMMM YYYY') + ` au ` + moment(new Date(parseInt(event.endedAt))).format('DD MMMM YYYY') }, event);

          newEventForOtherDay.duration = `Du ` + moment(new Date(parseInt(event.startedAt))).format('DD MMMM YYYY') + ` au ` + moment(new Date(parseInt(event.endedAt))).format('DD MMMM YYYY')
          newEventForOtherDay.startedAt = moment(
            new Date(parseInt(event.startedAt)),
          )
            .add(nbDayEvent, 'days')
            .toDate();
          localEvents.push(newEventForOtherDay);
        }


      }
      localEvents.push(event);
    });
    return localEvents.sort(compare);
  }, [events]);

  const handleClickPrint = useCallback(() => {
    window.print();
  }, []);

  const handleClickExport = useCallback(() => {
    const eventsToExport = events
      .map(event => ({
        ...event,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/event/${event.id}`,
        startedAt: new Date(parseInt(event.startedAt, 10)),
        endedAt: new Date(parseInt(event.endedAt, 10)),
      }));

    exportData({
      data: eventsToExport,
      columns: ['id', 'label', 'address', 'city', 'shortDescription', 'startedAt', 'endedAt', 'url'],
      columnLabels: ['ID', 'Nom', 'Adresse', 'Ville', 'Description', 'Date début', 'Date fin', 'URL'],
      columnOptions: [{ wch: 4 }, { wch: 35 }, { wch: 30 }, { wch: 20 }, { wch: 60 }, { wch: 15 }, { wch: 15 }, { wch: 40 }],
      sheetName: 'actions',
      fileName: 'actions',
    });
  }, [events]);

  return (
    <Grid className={classes.events} container direction="column" wrap="nowrap">
      <div className={classes.header}>
        <h1 className={classes.title}>
          ÉVÉNEMENTS À VENIR
        </h1>
        {
          matches && (
            <div>
              <Tooltip title="Imprimer" classes={{ popper: classes.tooltipPopper }}>
                <IconButton onClick={handleClickPrint} size="large">
                  <PrintIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Exporter" classes={{ popper: classes.tooltipPopper }}>
                <IconButton onClick={handleClickExport} size="large">
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
            </div>
          )
        }
      </div>

      {
        loading && (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        )
      }
      {
        (sortedEvents.length === 0 && !loading) && (
          <h2>Aucun évènement</h2>
        )
      }
      {
        sortedEvents.length > 0 && sortedEvents.map((event, index) => {

          const lastEvent = index > 0 && sortedEvents[index - 1];
          return (
            <div key={event.id + index} className={classes.cardContainer}>
              {(!lastEvent || !sameDay(lastEvent.startedAt, event.startedAt)) && (
                <Moment
                  locale="fr"
                  format="DD MMMM YYYY"
                  className={classes.date}
                  unix
                >
                  {event.startedAt / 1000}
                </Moment>
              )}
              <EventCard key={event.id} event={event} />
            </div>
          )
        })
      }
    </Grid>
  );
};

export default Events;
