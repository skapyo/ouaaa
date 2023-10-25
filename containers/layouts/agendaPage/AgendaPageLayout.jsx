import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
import {
  Grid, Typography, Button, Container,  useTheme,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { withApollo } from 'hoc/withApollo';
import Events from 'containers/layouts/agendaPage/Events';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Moment from 'react-moment';
import moment from 'moment';
import FavoriteIcon from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material';
import Drawer from '@mui/material/Drawer';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import useMediaQuery from '@mui/material/useMediaQuery';
import { RRule } from 'rrule';
import dynamic from 'next/dynamic';
import ButtonGroupSelected from '../../../components/buttons/ButtonGroupSelected';
import Calendar from '../../../components/Calendar';
import Link from '../../../components/Link';
import Filters from '../../../components/filters';
import { getImageUrl, rruleToText } from '../../../utils/utils';

const MapWithNoSSR = dynamic(() => import('../../../components/map/Map'), {
  ssr: false,
});

const MarkerWithNoSSR = dynamic(() => import('../../../components/map/EventMarker'), {
  ssr: false,
});

const MarkerClusterWithNoSSR = dynamic(() => import('../../../components/map/MarkerCluster'), {
  ssr: false,
});

let matchesWindow = false;
if (typeof window !== 'undefined') {
  matchesWindow = window.matchMedia('(max-width: 600px)').matches;
}

const currentDate = new Date();

currentDate.setMonth(9);

const drawerWidth = 310;

const GET_EVENTS = gql`
  query events($startingDate: String, $search: String, $entries: [[String]], $favoritesForUser: String) {
    events(startingDate: $startingDate, search: $search, entries: $entries, favoritesForUser: $favoritesForUser) {
      id
      label
      startedAt
      endedAt
      dateRule
      published
      lat
      lng
      address
      city
      shortDescription
      favorites{
        id
      }
      entries {
        label
        icon
        collection {
          code
          label
        }
        parentEntry {
          code
          label
          color
          collection {
            code
            label
          }
        }
      }
      actors {
        id
        name
      }
      pictures {
        id
        label
        originalPicturePath
        originalPictureFilename
        position
        logo
        main
      }
      parentEvent {
        id
        label
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  '@media print': {
    drawer: {
      display: 'none !important',
    },
    filterButton: {
      display: 'none',
    },
    layout: {
      backgroundColor: 'white !important',
      display: 'block !important',
    },
  },
  main: {
    padding: '0',
    margin: '0',
  },
  layout: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.grey,
    padding: '0',
    margin: '0',
    width: '100%',
    maxWidth: 'none',
    position: 'relative',
    overflow: 'hidden',
    height: 'calc(100vh - 100px)',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      height: 'auto',
    },
  },
  drawer: ({ isMenuOpen, isMapMode }) => ({
    width: isMenuOpen ? (isMapMode ? 0 : drawerWidth) : 0,
    flexShrink: 0,
    transition: isMapMode ? null : theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
  drawerPaper: {
    position: 'absolute',
    width: drawerWidth,
  },
  filterButton: ({ isMenuOpen }) => ({
    position: 'absolute',
    left: isMenuOpen ? drawerWidth : 20,
    bottom: 20,
    zIndex: 1000,
    borderTopLeftRadius: isMenuOpen ? 0 : 4,
    borderBottomLeftRadius: isMenuOpen ? 0 : 4,
    transition: theme.transitions.create(['left'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      bottom: 10,
      left: 10,
    },
  }),
  filterButtonIcon: ({ isMenuOpen }) => ({
    transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  }),
  listButtonIcon: {
    marginRight: 10,
  },
  image: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    textAlign: 'inherit',
    height: '10em',
  },
  categorie: {
    backgroundColor: 'white',
    borderRadius: '0.3em',
    color: '#f0a300',
    width: 'max-content',
    padding: '0 5px 0 5px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  title: {
    textAlign: 'left',
    color: '#2C367E',
    width: '100%',
  },
  buttonGrid: {
    margin: '2.5em 0 2.5em 0 ',
    color: 'white',
    'background-color': '#2C367E',
    border: 'none',
    borderRadius: '1.5em',
    padding: '0 3em 0 3em',
    height: '2.5em',
    '&:hover': {
      cursor: 'pointer',
      color: '#2C367E',
      'background-color': 'white',
      border: '2px solid #2C367E',
      backgroundImage: "url('./arrow-hover.svg')",
    },
    backgroundImage: "url('./arrow.svg')",
    backgroundRepeat: 'no-repeat',
    'background-position-x': '5px',
    'background-position-y': '1px',
    'background-size': '14%',
  },
  favorite: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  favoriteIcon: {
    color: '#AD2740',
  },
  mapContainer: {
    height: '100% !important',
    [theme.breakpoints.down('sm')]: {
      height: '80vh !important',
    },
  },
}));

const VIEW_STATE = {
  LIST: 'LIST',
  MAP: 'MAP',
  CALENDAR: 'CALENDAR',
};



const AgendaPageLayout = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const mapRef = useRef();
  const [viewMode, setViewMode] = useState(VIEW_STATE.LIST);
  const [favorite, setFavorite] = useState(false);
  const [filters, setFilters] = useState(null);
  const [recuringEvent, setRecuringEvent] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(!matchesWindow);

  const isListMode = useMemo(() => viewMode === VIEW_STATE.LIST, [viewMode, VIEW_STATE]);
  const isMapMode = useMemo(() => viewMode === VIEW_STATE.MAP, [viewMode, VIEW_STATE]);
  const isCalendarMode = useMemo(() => viewMode === VIEW_STATE.CALENDAR, [viewMode, VIEW_STATE]);

  const classes = useStyles({ isMenuOpen, isMapMode });

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);
  
  const date = new Date();

  date.setHours(0, 0, 0, 0);

  const { data: eventData, loading: loadingEvents, refetch } = useQuery(GET_EVENTS, {
    variables: {
      startingDate: date.toISOString(),
    },
  });
  const [searchDate, setSearchDate] = useState(new Date());
  const handleFiltersChange = useCallback((newFilters) => {
    ///debugger;
    if(newFilters.startingDate!== undefined){
     setSearchDate(newFilters.startingDate.$d); 
    }
    setFilters(newFilters);
    setRecuringEvent(newFilters!=undefined && newFilters!=null && newFilters['periodicEvent']!=undefined && newFilters['periodicEvent']==true? true:false)
    refetch({ ...newFilters });
  }, [refetch]);

  const getAllEventsFromRecurringEvent = (event) => {
    let startEventDate = moment(parseInt(event.startedAt));
    const { dateRule } = event;
    const rrule = RRule.fromString(`DTSTART:${startEventDate.format('YYYYMMDD[T]hhmmss[Z]')}\nRRULE:${dateRule}`);

    return rrule.between(searchDate, moment().add(6, 'month').toDate()).map((date) => {
      return {
        ...event,
        startedAt: moment(date).valueOf().toString(),
        duration: rruleToText(rrule),
      };
    });
  };

  const fabActions = useMemo(() => {
    return [
      { name: 'list', label: 'Liste', onClick: () => setViewMode(VIEW_STATE.LIST) },
      { name: 'map', label: 'Carte', onClick: () => setViewMode(VIEW_STATE.MAP) },
      { name: 'calendar', label: 'Calendrier', onClick: () => setViewMode(VIEW_STATE.CALENDAR) },
    ];
  }, []);

  const events = useMemo(() => {
    debugger;
    const initialEvents = (eventData?.events || []);
    const recurringEvents = initialEvents.filter((event) => event.dateRule);
  
    const allRecurringEvents = (!recuringEvent? []  :  recurringEvents.map((evt) => getAllEventsFromRecurringEvent(evt)));
    const allEvents = initialEvents.filter((event) => !event.dateRule).concat(allRecurringEvents.reduce((acc, items) => acc.concat(items), [])).filter((event) => { return moment(parseInt(event.startedAt)) > moment().startOf('day'); });
    return allEvents;
  }, [eventData,recuringEvent,refetch]);

  const calendarEvents = useMemo(() => {
    const initialEvents = (eventData?.events || []);

    return initialEvents.map((evt) => {
      let dateRule = {};
      if (evt.dateRule) {
        dateRule = {
          rRule: evt.dateRule,
        };
      }

      return {
        startDate: new Date(parseInt(evt.startedAt)),
        endDate: new Date(parseInt(evt.endedAt)),
        title: evt.label,
        id: evt.id,
        location: evt.city ? [evt.address, evt.city].join(', ') : '',
        backgroundColor: evt?.entries?.[0]?.parentEntry?.color || 'blue',
        ...dateRule,
      };
    });
  }, [eventData]);

  return (
    <Container className={classes.main}>
      <Container className={classes.layout}>
        <ButtonGroupSelected buttons={fabActions} />

        <Drawer
          anchor="left"
          variant={matches ? 'temporary' : 'persistent'}
          open={isMenuOpen}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={toggleMenu}
          ModalProps={{
            keepMounted: true,
          }}
        >
         <Filters
            isEventList
            onFiltersChange={handleFiltersChange}
            isCalendarMode={isCalendarMode}
            closeHandler={toggleMenu}
          /> 
        </Drawer>

        {
          (!matches || !isMenuOpen) && (
            <Button
              variant="contained"
              className={classes.filterButton}
              onClick={toggleMenu}
              startIcon={<DoubleArrowIcon className={classes.filterButtonIcon} />}
              color="primary"
            >
              Filtres
            </Button>
          )
        }

        {isListMode && (
          <Events events={events} loading={loadingEvents} />
        )}

        {isCalendarMode && (
          <Calendar events={calendarEvents} />
        )}

        {isMapMode && (
          <Grid style={{ width: '100%' }}>
            <MapWithNoSSR scrollWheelZoom={true} classMap={classes.mapContainer}>
              <MarkerClusterWithNoSSR>
                {typeof eventData !== 'undefined'
                  && eventData.events.map((event, index) => {
                    if (event.lat != null && event.lng != null) {
                      return (
                        <MarkerWithNoSSR event={event} />
                      );
                    }
                  })}
              </MarkerClusterWithNoSSR>
            </MapWithNoSSR>
          </Grid>
        )}
      </Container>
    </Container>
  );
};

export default withApollo()(AgendaPageLayout);
