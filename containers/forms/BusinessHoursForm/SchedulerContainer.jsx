/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import TimeContainer from './TimeContainer';

console.log('debugger');
// debugger;

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  timeContainer: {
    display: 'flex',
    marginTop: '20px',
  },
  button: {
    marginTop: 'auto',
  },
}));

const WEEKDAYS = {
  days: [
    {
      id: '1',
      day: 'L',
      selected: false,
    },
    {
      id: '2',
      day: 'M',
      selected: false,
    },
    {
      id: '3',
      day: 'M',
      selected: false,
    },
    {
      id: '4',
      day: 'J',
      selected: false,
    },
    {
      id: '5',
      day: 'V',
      selected: false,
    },
    {
      id: '6',
      day: 'S',
      selected: false,
    },
    {
      id: '7',
      day: 'D',
      selected: false,
    },
  ],
  hours: [['2021-07-16T15:00:00', '2021-07-07T14:00:01.006Z']],
  place: '',
  __typename: 'OpeningHour',
};

const SchedulerContainer = (props) => {

  const { onChange, initData, ...other } = props;
  const classes = useStyles();

   console.log('here jojo', initData);

  // console.log('timeContainerList 1', timeContainerList);

  const [availableDays, setAvailableDays] = useState(WEEKDAYS);
  const [timeFrames, setTimesFrames] = useState([]);
  const [showPlace, setShowPlace] = useState(false);
  const [places, setPlaces] = useState([]); // TODO: not working yet

  const [timeContainerList, setTimeContainerList] = useState(
    // initData !== undefined ? initData[0]?.[0] : WEEKDAYS,
    initData !== undefined ? initData : WEEKDAYS,
  );

  // console.log('timeContainerList 2', timeContainerList);
  /* useEffect(() => {
    debugger;
    WEEKDAYS = initData !== undefined ? initData[0][0] : WEEKDAYS;

  }, [initData]);
*/
  const addTimeContainer = () => {
    const newTimeContainerList = [...timeContainerList, availableDays];

    // LIMIT the number of TimeContainer while it is still buggy
    // if (newTimeContainerList.length > 1) return;

    // console.log('newTimeContainerList', newTimeContainerList);
    setTimeContainerList(newTimeContainerList);
  };

  const updateWeekDays = (daysList) => {
    setAvailableDays(daysList);
  };

  const updateTimeFrames = (timeFrame, index) => {
    if (index + 1 > timeFrames.length) {
      setTimesFrames([...timeFrames, timeFrame]);
    } else {
      const newTimeFramesList = [...timeFrames].map((currentTimeFrame, ind) => {
        return index == ind ? timeFrame : currentTimeFrame;
      });

      setTimesFrames(newTimeFramesList);
    }
  };

  const deleteTimeContainer = (e, index) => {
    const newTimeFramesList = [...timeFrames].filter(
      (currentTimeFrame, ind) => {
        return index !== ind;
      },
    );

    const newTimeContainerList = [...timeContainerList].filter(
      (currentTimeFrame, ind) => {
        return index !== ind;
      },
    );

    setTimesFrames(newTimeFramesList);
    setTimeContainerList(newTimeContainerList);
  };

  const updatePlaces = (newPlaces) => {
    setPlaces(newPlaces);
  };

  useEffect(() => {
    let hasOpeningHour = false;

    const openingHours = timeFrames.map((timeFrames) => {
      const openingHour = {};
      openingHour.days = timeFrames[0];
      openingHour.days.map((day) => {
        delete day.__typename;
        if (day.selected) {
          hasOpeningHour = true;
        }
        return 'ok';
      });
      openingHour.hours = timeFrames[1];
      openingHour.place = timeFrames[2];
      return openingHour;
    });
    if (hasOpeningHour) {
      console.table('openingHours before sent to GRAPHQL', openingHours);
      onChange(openingHours);
    } else {
      onChange([]);
    }

    // call to API
  }, [timeFrames]);

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div>
          <FormControlLabel
            control={
              <Switch
                checked={showPlace}
                onChange={() => setShowPlace(!showPlace)}
                name="Unique Place"
              />
            }
            label={
              showPlace
                ? 'Cacher les emplacements'
                : 'Indiquer des emplacements'
            }
          />
        </div>

        {timeContainerList.length > 0 &&
          timeContainerList.map(({ days, hours, placesInput }, index) => {
            return (
              <div className={classes.timeContainer}>
                <TimeContainer
                  updateWeekDays={updateWeekDays}
                  updateTimeFrames={updateTimeFrames}
                  availableDays={days}
                  indexTimeContainer={index}
                  deleteTimeContainer={deleteTimeContainer}
                  places={placesInput}
                  showPlace={showPlace}
                  updatePlaces={updatePlaces} // FIXME: place not updated
                  initData={hours}
                />
              </div>
            );
          })}
      </div>
      <Button
        className={classes.button}
        onClick={addTimeContainer}
        disableRipple
      >
        <AddCircleOutlineIcon fontSize="small" />
      </Button>
    </div>
  );
};

export default SchedulerContainer;
