/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import TimeContainer from './TimeContainer';

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

  const [availableDays, setAvailableDays] = useState(WEEKDAYS);
  const [timeFrames, setTimeFrames] = useState(
    initData !== undefined
      ? initData.map((data) => {
          return [data.days, data.hours, data.place];
        })
      : [],
  );
  const [showPlace, setShowPlace] = useState(false);
  const [places, setPlaces] = useState([]); // TODO: not working yet

  const [timeContainerList, setTimeContainerList] = useState(
    initData !== undefined ? initData : [WEEKDAYS],
  );

  const firstUpdate = useRef(true);

  const addTimeContainer = () => {
    console.log('hello', timeContainerList);
    const newTimeContainerList = [...timeContainerList, availableDays];

    setTimeContainerList(newTimeContainerList);
  };

  const updateWeekDays = (daysList) => {
    setAvailableDays(daysList);
  };

  const updateTimeFrames = (timeFrame, index) => {
    if (timeFrames !== undefined && timeFrames.length !== 0) {
      // update timeFrames with initData
      let newTimeFramesList = [...timeFrames];
      debugger;
      // if it adds a new timeframe
      if (index + 1 > newTimeFramesList.length) {
        newTimeFramesList.push(timeFrame);
      } else {
        // modify the current timeframe
        newTimeFramesList = [...newTimeFramesList].map(
          (currentTimeFrame, ind) => {
            return index == ind ? timeFrame : currentTimeFrame;
          },
        );
      }

      setTimeFrames(newTimeFramesList);
    } else {
      setTimeFrames([timeFrame]);
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
    setTimeFrames(newTimeFramesList);
    setTimeContainerList(newTimeContainerList);
  };

  const updatePlaces = (newPlaces) => {
    setPlaces(newPlaces);
  };

  useEffect(() => {
    // initialize the timeFrames from initData
    if (initData !== undefined) {
      const updatedTimeFrames = initData.map((timeFrame) => timeFrame.days);
    }

    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    let hasOpeningHour = false;

    const openingHours = timeFrames.map((timeFrame) => {
      const openingHour = {};
      openingHour.days = timeFrame[0];
      openingHour.days.map((day) => {
        delete day.__typename;
        if (day.selected) {
          hasOpeningHour = true;
        }
        return 'ok';
      });
      openingHour.hours = timeFrame[1];
      openingHour.place = timeFrame[2];
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
