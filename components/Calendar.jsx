import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import classNames from 'clsx';
import { Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
// Add these lines before the import statement
import { RRuleSet, RRule } from 'rrule';
export { RRuleSet, RRule };
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  DayView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  ViewSwitcher,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';

const useStyles = makeStyles((theme) => ({
  layout: (props) => ({
    height: '100%',
    '& > *:only-child': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      '& > *:last-child': {
        flex: 1,
        '& table': {
          height: '100%',
        },
      },
    },
    backgroundColor: props.backgroundColor+'!important',
  }),
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  content: {
    opacity: 0.7,
  },
  container: {
    width: '100%',
    lineHeight: 1.2,
    height: '100%',
  },
  appointment: (props) => ({
    backgroundColor: props.backgroundColor+'!important',
  }),
  appointmentContent: {
    padding: '1px 2px',
    cursor: 'pointer',
  },
  actionButton: {
    display: 'flex',
    flex: '1 0 0',
    justifyContent: 'flex-end',
    [theme.breakpoints.up('md')]: {
      width: 'max-content',
    },
  }
}));

const MonthLayout = (props) => {
  const classes = useStyles();
  return <MonthView.Layout {...props} className={classes.layout} />;
};


const AppointmentContent = (props) => {
  const { data } = props;
  const classes = useStyles();
  //debugger;
  return (
    <Appointments.AppointmentContent
      className={classes.appointmentContent}
      {...props}
    >
      <div className={classes.container}>
        <div className={classes.text}>
          {data.title}
        </div>
        <div className={classNames(classes.text, classes.content)}>
          {`Lieu: ${data.location}`}
        </div>
      </div>
    </Appointments.AppointmentContent>
  );
};

const Appointment = (props) => {
  const { data } = props;
  const router = useRouter();
  const classes = useStyles({ backgroundColor: data.backgroundColor });

  const handleClick = useCallback(() => {
    router.push(`/event/${data.id}`);
  }, [router, data]);

  return (
    <Appointments.Appointment
      onClick={handleClick}
      className={classes.appointment}
      {...props}
    />
  );
};

const FlexibleEmptySpaceAddEvent = () => {
  const classes = useStyles();
  const router = useRouter();

  const handleClickAddEvent = useCallback(() => {
    const { id } = router.query;
    router.push(`/addevent/${id}`);
  }, [router]);

  return (
    <Toolbar.FlexibleSpace>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
        onClick={handleClickAddEvent}
        className={classes.actionButton}
      >
        Ajouter un évènement
      </Button>
    </Toolbar.FlexibleSpace>
  );
};

const Calendar = (props) => {
  const {
    events, withViewSwitcher, withAddEvent, className,
  } = props;

  const toolbarProps = withAddEvent && {
    flexibleSpaceComponent: FlexibleEmptySpaceAddEvent,
  };
  const defaultMessages = {
    allDay: 'Toute la journée',
  };


  const RootComponent = useCallback((rootComponentProps) => {
    return (
      <div {...rootComponentProps} className={className} />
    )
  }, [className]);

  return (
    <Scheduler
      firstDayOfWeek={1}
      locale="fr-FR"
      RootProps={{
        height: 'auto',
      }}
      data={events}
      rootComponent={RootComponent}
    >
      <ViewState
        defaultCurrentDate={new Date()}
      />

      <Toolbar
        {...toolbarProps}
      />

      <DateNavigator />
      <TodayButton messages={{ today: "Aujourd'hui" }} />

      <MonthView
        layoutComponent={MonthLayout}
        displayName="Mois"
      />
      <DayView
        displayName="3 jours"
        startDayHour={8}
        intervalCount={3}
      />
      <AllDayPanel
        messages={defaultMessages}
      />
      <Appointments
        appointmentComponent={Appointment}
        appointmentContentComponent={AppointmentContent}
      />
      {withViewSwitcher && <ViewSwitcher />}
    </Scheduler>
  );
};

Calendar.propTypes = {
  withViewSwitcher: PropTypes.bool,
  withAddEvent: PropTypes.bool,
  events: PropTypes.array,
};

Calendar.defaultProps = {
  events: [],
  withViewSwitcher: true,
  withAddEvent: false,
};

export default Calendar;
