import React, { useMemo, useCallback,useState } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  IconButton, Tooltip, useMediaQuery, useTheme,  FormControlLabel,Radio,
} from '@mui/material';
import Moment from 'react-moment';
import moment from 'moment';
import Link from '../../../components/Link';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EventCard from 'components/cards/EventCard';
import useExcelExport from '../../../hooks/useExcelExport.ts';
import { useSessionState } from '../../../context/session/session';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import SuggestEventForm from 'containers/forms/SuggestEventForm';
import RadioGroup from '@mui/material/RadioGroup';
import Fab from '@mui/material/Fab';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

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
    fontSize: '2.1em',
    display: 'flex',
    flex: 1,
  },
  date: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#AEAEAE',
    fontSize: '0.9em'
  },
  actionButton: {
    justifyContent: 'flex-end',
    [theme.breakpoints.up('md')]: {
      width: 'max-content',
    },
  },

  paper: {
    position: 'absolute',
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
    width: '60%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  indication: {
    fontSize:"0.9em"
  },
  addIcon: {
    width: '15px',
    height: '15px',
  },
  fab: {
    backgroundColor: '#2C367E',
    color: 'white',
    '&:hover': {
      backgroundColor: '#2C367E',
      color: 'white',
      cursor: 'default',
    },
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
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    height: '90%',
    overflow: 'auto',
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const Events = (props) => {
  const classes = useStyles();
  const { events = [], loading } = props;
  const theme = useTheme();
  const exportData = useExcelExport();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [showSuggest, setShowSuggest] = React.useState(true);
  const [modalStyle] = React.useState(getModalStyle);
  const [openModalAddEvent, setOpenModalAddEvent] = useState(false);
  const [dataActorReferent, setDataActorReferent] = useState(null);

  const handleOpenModalAddEvent = () => {
    setOpenModalAddEvent(true);
  };

  const handleCloseModalAddEvent = () => {
    setOpenModalAddEvent(false);
  };
  const handleChangeAddEvent = (action) => {
    radioGroupContect.setCurrentValue(action.target.value);
  };
  const user = useSessionState();

  
  const GET_ACTORS = gql`
query actorsAdmin($userId: String!) {
  actorsAdmin(userId: $userId) {
    id
    name
    address
    shortDescription
    createdAt
    updatedAt
    city
    lat
    lng
    referents {
      surname
      lastname
      email
      phone
    }
    isValidated
    dateValidation
    userValidated {
      surname
      lastname
      email
      phone
    }
    nbVolunteers
  }
}
`;
  const {
    loading: loadingDataActorReferent, error: errorDataActorReferent
  } = useQuery(GET_ACTORS, {
    fetchPolicy: 'network-only',
    variables: {
      userId: user && `${user.id}`,
    },
    onCompleted: (data) => {
      setDataActorReferent(data);
    },
  });

  const referentInfo = useMemo(() => {
    if(user && dataActorReferent && dataActorReferent.length!=0 && dataActorReferent.actorsAdmin!=0){
      let links = dataActorReferent.actorsAdmin.map((actor) => {
        return (<Link href={`/addevent/${actor.id}`}><MenuItem>{actor.name}</MenuItem></Link>)
      });

    return (
      <div>
             <div>Séléctionner votre page acteur  ci dessous pour ajouter un événement sur l'agenda</div>
            <FormControl variant="standard" sx={{  minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Page acteur</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              label="Page"
            
            >
            {links}
            
            </Select>
          </FormControl>
      </div>
    );
    }else{
      return (
        <div>
        </div>
      );
    }

  }, [dataActorReferent]);


  const bodyModalAddEvent = (
    <div style={modalStyle} className={classes.paper}>
      <IconButton
        aria-label="Close"
        className={classes.closeButton}
        onClick={() => setOpenModalAddEvent(false)}
        size="large">
        <CloseIcon />
      </IconButton>

      {referentInfo}
      {showSuggest && (
        <div>
          <h2 id="simple-modal-title">{(user && dataActorReferent && dataActorReferent.length!=0 && dataActorReferent.actorsAdmin!=0 && "Ou")}  Soumettre un nouvel événément</h2>
          <p className={classes.indication}>Le site vous propose d’envoyer un mail à un acteur pour lui sousmettre d'ajouter un événement qu'il organise dans l'agenda de OUAAA!. Votre mail et votre nom ne sont conservés que le temps d’envoyer le mail. Toutes les traces sont ensuite supprimées. L'acteur reçoit un mail d’invitation lui expliquant également que ses traces (nom/adresse/mail) ne sont pas conservés et l’invitant à ajouter son action. Vous pouvez contacter le Délégué de la Protection des données dpd@ouaaa-transition.fr. Pour toute question, vous pouvez nous contacter <Link href={`/contact`} target="_blank"> en cliquant ici</Link></p>
          <SuggestEventForm />
      </div> 
            )
      }
      
    </div>
  );
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
          !matches && (
        <Fab size="small" className={classes.fab} aria-label="edit"  onClick={handleOpenModalAddEvent}>
        <AddIcon className={classes.addIcon} />
          </Fab>
       )
      }
      <Modal
        open={openModalAddEvent}
        onClose={handleCloseModalAddEvent}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        {bodyModalAddEvent}
      </Modal>
      
        {
          matches && (
            <div>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.actionButton}
                  onClick={handleOpenModalAddEvent}
                >
                  Un évènement non présent ?
                </Button>
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
       {
          !matches && (
            <div>
            <Button
                        variant="contained"
                        color="secondary"
                        className={classes.actionButton}
                        onClick={handleOpenModalAddEvent}
                      >
                        Un évènement non présent ?
                      </Button>
                      </div>
          )}
    </Grid>
  );
};

export default Events;
