import React, { useState, useContext, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

import ButtonDay from './ButtonDay';
import TimePicker from './TimePicker';
import PlaceContainer from './PlaceContainer';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  section: {
    color: 'white',
    padding: '0 0px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
    },
  },
  days: {
    color: 'white',
    padding: '0 0px',
    display: 'flex',
    justifyContent: 'center',
  },
  places: {
    display: 'flex',
    flexWrap: 'wrap',
    color: 'black',
  },
  daysplaces: {
    display: 'flex',
    flexDirection: 'column',
  },
  timerange: {
    color: 'white',
    padding: '0 0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  timepicker: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonAdd: {
    marginTop: 'auto',
    textTransform: 'none',
    color: '#3f51b5',
  },
  buttonDelete: {
    display: 'inline',
    width: '20%',
    marginTop: 'auto',
    maxWidth: '10px',
    marginLeft: '0',
    padding: '0 0',
  },
}));

// '2021-07-07T04:00:27.879Z',
// '2021-07-07T14:00:27.877Z',
export const defaultTimeRange = [
  moment().set('minute', 0).set('hour', 8).add(1, 'day').toDate(),
  moment().set('minute', 0).set('hour', 18).add(1, 'day').toDate(),
];

const TimeContainer = (props) => {
  const classes = useStyles();

  const {
    updateWeekDays,
    updateTimeFrames,
    availableDays,
    indexTimeContainer,
    deleteTimeContainer,
    updatePlaces,
    showPlace,
    initData,
    places,
  } = props;

  const [hours, setHours] = useState(initData !== undefined ? initData : []);
  const [weekdays, setWeekDays] = useState(availableDays);
  const [timeRangeList, setTimeRangeList] = useState(
    initData !== undefined ? initData : defaultTimeRange,
  );

  console.log('initData', initData);
  const [location, setLocation] = React.useState(
    places !== undefined ? places : '',
  );

  const addTimeRange = () => {
    setTimeRangeList([...timeRangeList, 1]);
  };

  const selectDays = (e) => {
    const dayId = e.currentTarget.dataset.id;
    const selectedDays = [...weekdays].map((day) =>
      day.id === dayId ? { ...day, selected: !day.selected } : day,
    );

    setWeekDays(selectedDays);
  };

  const selectHours = (startTime, endTime, indexTimer) => {
    const newHours = [startTime, endTime];

    // update this a new timerange
    if (indexTimer + 1 > hours.length) {
      setHours([...hours, newHours]);
    } else {
      // update existing timerange
      const selectedTimes = [...hours].map((timeRange, ind) => {
        return indexTimer === ind ? newHours : timeRange;
      });

      setHours(selectedTimes);
    }
  };

  const selectLocation = (location) => {
    setLocation(location);
  };

  useEffect(() => {
    const newTimeFrame = [weekdays, hours, location];
    if (hours.length > 0) {
      updateTimeFrames(newTimeFrame, indexTimeContainer);
    }
  }, [weekdays, hours, location]);

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        {weekdays && (
          <>
            <div className={classes.daysplaces}>
              <div className={classes.days}>
                {weekdays.map((day) => {
                  console.log('here');
                  // debugger;

                  return (
                    <div className="day">
                      <ButtonDay
                        dayId={day.id}
                        text={day.day}
                        selectDays={selectDays}
                        selected={day.selected}
                      />
                    </div>
                  );
                })}
              </div>
              <div className={classes.places}>
                <PlaceContainer
                  updatePlaces={updatePlaces}
                  showPlace={showPlace}
                  selectLocation={selectLocation}
                />
              </div>
            </div>
            <div className={classes.timepicker}>
              <div className={classes.timerange}>
                {timeRangeList.length > 0 &&
                  timeRangeList.map((timeRange, index) => {
                    return (
                      <TimePicker
                        selectHours={selectHours}
                        indexTimer={index}
                        timeRange={timeRange}
                      />
                    );
                  })}
              </div>
              <Button
                className={classes.buttonAdd}
                color="blue"
                onClick={addTimeRange}
              >
                Ajouter des horaires
              </Button>
            </div>
          </>
        )}
      </div>
      <Button
        aria-label="delete"
        className={classes.buttonDelete}
        onClick={(e) => deleteTimeContainer(e, indexTimeContainer)}
      >
        <DeleteIcon fontSize="small" />
      </Button>
    </div>
  );
};

export default TimeContainer;
