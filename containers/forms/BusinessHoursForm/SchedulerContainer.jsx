/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useContext, useEffect } from 'react';
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

const WEEKDAYS = [
  { id: 1, day: 'L', selected: false },
  { id: 2, day: 'M', selected: false },
  { id: 3, day: 'M', selected: false },
  { id: 4, day: 'J', selected: false },
  { id: 5, day: 'V', selected: false },
  { id: 6, day: 'S', selected: false },
  { id: 7, day: 'D', selected: false },
];

const SchedulerContainer = (props) => {
  const {
    onChange,
    initData,
    ...other
  } = props;
  const classes = useStyles();

  const [timeContainerList, setTimeContainerList] = useState([WEEKDAYS]);
  const [availableDays, setAvailableDays] = useState(WEEKDAYS);
  const [timeFrames, setTimesFrames] = useState(initData !== undefined ? initData : []);
  const [showPlace, setShowPlace] = useState(true);
  const [places, setPlaces] = useState([]);

  /* useEffect(() => {
    debugger;
    setTimeContainerList([initData !== undefined ? initData[0][0] : [WEEKDAYS]]);
  }, [initData]);
  */
  const addTimeContainer = () => {
    const newTimeContainerList = [...timeContainerList, availableDays];
    setTimeContainerList(newTimeContainerList);
  };

  const updateWeekDays = (daysList) => {
    setAvailableDays(daysList);
  };

  const updateTimeFrames = (timeFrame, index) => {
    // console.log('follow up timeFrames', index, timeFrames.length);

    if (index + 1 > timeFrames.length) {
      setTimesFrames([...timeFrames, timeFrame]);
      // console.log('new timeframe added');
    } else {
      const newTimeFramesList = [...timeFrames].map((currentTimeFrame, ind) => {
        return index == ind ? timeFrame : currentTimeFrame;
      });

      setTimesFrames(newTimeFramesList);
      // console.log('old timeframe updated');
    }

    //  console.log('list of timeFrames', timeFrames);
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

    //   console.log('newTimeFramesList', newTimeFramesList);

    setTimesFrames(newTimeFramesList);
    setTimeContainerList(newTimeContainerList);
  };

  const updatePlaces = (newPlaces) => {
    setPlaces(newPlaces);
    //  console.log(places);
  };

  useEffect(() => {
    const openingHours = timeFrames.map((timeFrames) => {
      const openingHour = {};
      openingHour.days = timeFrames[0];
      openingHour.days.map((day) => {
        delete day.__typename;
        return 'ok';
      });
      openingHour.hours = timeFrames[1];
      openingHour.place = timeFrames[2];
      return openingHour;
    });
    console.log('openingHourss', openingHours);
    onChange(openingHours);

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
            label={showPlace ? 'Cacher les lieux' : 'Afficher les lieux'}
          />
        </div>

        {timeContainerList.length > 0
          && timeContainerList.map((days, index) => {
            return (
              <div className={classes.timeContainer}>
                <TimeContainer
                  updateWeekDays={updateWeekDays}
                  updateTimeFrames={updateTimeFrames}
                  availableDays={days}
                  indexTimeContainer={index}
                  deleteTimeContainer={deleteTimeContainer}
                  places={places}
                  showPlace={showPlace}
                  updatePlaces={updatePlaces}
                  initData={initData}
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
