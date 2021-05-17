import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import TimeContainer from './TimeContainer';
import PlaceContainer from './PlaceContainer';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '20px',
  },
  button: {
    marginTop: 'auto',
    // position: 'relative',
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

export default function SchedulerContainer() {
  const classes = useStyles();

  const [timeContainerList, setTimeContainerList] = useState([WEEKDAYS]);
  const [availableDays, setAvailableDays] = useState(WEEKDAYS);
  const [timeFrames, setTimesFrames] = useState([]);
  const [uniquePlace, setUniquePlace] = useState(true);
  const [places, setPlaces] = useState([]);

  const addTimeContainer = () => {
    const newTimeContainerList = [...timeContainerList, availableDays];
    setTimeContainerList(newTimeContainerList);
  };

  const updateWeekDays = (daysList) => {
    setAvailableDays(daysList);
  };

  const updateTimeFrames = (timeFrame, index) => {
    console.log('follow up timeFrames', index, timeFrames.length);

    if (index + 1 > timeFrames.length) {
      setTimesFrames([...timeFrames, timeFrame]);
      console.log('new timeframe added');
    } else {
      const newTimeFramesList = [...timeFrames].map((currentTimeFrame, ind) => {
        return index == ind ? timeFrame : currentTimeFrame;
      });

      setTimesFrames(newTimeFramesList);
      console.log('old timeframe updated');
    }

    console.log('list of timeFrames', timeFrames);
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

    console.log('newTimeFramesList', newTimeFramesList);

    setTimesFrames(newTimeFramesList);
    setTimeContainerList(newTimeContainerList);
  };

  const updatePlaces = (newPlaces) => {
    setPlaces(newPlaces);
    console.log(places);
  };

  useEffect(() => {
    console.log('freshed', timeFrames);
    // call to API
  }, [timeFrames]);

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div>
          <FormControlLabel
            control={
              <Switch
                checked={uniquePlace}
                onChange={() => setUniquePlace(!uniquePlace)}
                name="Unique Place"
              />
            }
            label={
              uniquePlace ? 'Emplacement unique' : 'Plusieurs emplacements'
            }
          />
          {!uniquePlace && <PlaceContainer updatePlaces={updatePlaces} />}
        </div>

        {timeContainerList.length > 0 &&
          timeContainerList.map((days, index) => {
            return (
              <div className={classes.timeContainer}>
                <TimeContainer
                  updateWeekDays={updateWeekDays}
                  updateTimeFrames={updateTimeFrames}
                  availableDays={days}
                  indexTimeContainer={index}
                  deleteTimeContainer={deleteTimeContainer}
                  places={places}
                />
              </div>
            );
          })}
      </div>
      <Button className={classes.button} onClick={addTimeContainer}>
        <AddCircleOutlineIcon fontSize="small" />
      </Button>
    </div>
  );
}
