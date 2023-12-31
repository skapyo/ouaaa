import React, { useState, useContext, useEffect, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

import ButtonDay from './ButtonDay';
import TimePickerContainer from './TimePickerContainer';
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
  TimePickerContainer: {
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
    showPlace,
    initData,
    inputPlace,
  } = props;

  const [hours, setHours] = useState(initData !== undefined ? initData : []);
  const [weekdays, setWeekDays] = useState(availableDays);

  const [place, setPlace] = React.useState(
    inputPlace !== undefined ? inputPlace : '',
  );
  const renderCount = useRef(0);

  const addTimeRange = () => {
    setHours([...hours, [null, null]]);
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

  const updatePlace = (place) => {
    setPlace(place);
  };

  const deleteTimePickerContainer = (e, index) => {
    const tempHours = [...hours];

    deleteTimeContainer(e, index);
    tempHours.pop();
    setHours(tempHours);

    // if no more hours inside the timeContainer, delete timeContainer
    if (tempHours.length === 0) {
      deleteTimeContainer(e, index);
    }
  };

  useEffect(() => {
    // TODO: workaround to execute the further code , needs to find a solution to limit rendering count
    if (renderCount.current < 2) {
      renderCount.current++;
      return;
    }

    // remove unexpected unfill hours timeRanges
    const cleanedHours = [...hours].filter(
      (timeRange) => !timeRange.includes(null),
    );

    const newTimeFrame = [weekdays, cleanedHours, place, indexTimeContainer];

    // update or add timeFrame only if filled
    if (
      hours.length > 0 &&
      [].concat(...weekdays).filter((day) => day.selected).length
    ) {
      updateTimeFrames(newTimeFrame, indexTimeContainer);
    }
  }, [weekdays, hours, place]);

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        {weekdays && (
          <>
            <div className={classes.daysplaces}>
              <div className={classes.days}>
                {weekdays.map((day) => {
                  return (
                    <div className="day" key={day.id}>
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
                  updatePlace={updatePlace}
                  showPlace={showPlace}
                  place={place}
                />
              </div>
            </div>
            <div className={classes.TimePickerContainer}>
              <div className={classes.timerange}>
                {hours.length > 0 &&
                  hours.map((timeRange, index) => {
                    return (
                      <TimePickerContainer
                        selectHours={selectHours}
                        indexTimer={index}
                        timeRange={timeRange}
                      />
                    );
                  })}
              </div>
              <Button
                className={classes.buttonAdd}
                color="primary"
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
        onClick={(e) => {
          deleteTimePickerContainer(e, indexTimeContainer);
        }}
      >
        <DeleteIcon fontSize="small" />
      </Button>
    </div>
  );
};

export default TimeContainer;
