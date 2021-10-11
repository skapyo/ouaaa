/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { v4 as uuidv4 } from 'uuid';

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

const BLANK_BUSINESS_HOURS = {
  days: [
    {
      id: '1',
      day: 'L',
      selected: false,
      identifier: '1',
    },
    {
      id: '2',
      day: 'M',
      selected: false,
      identifier: '2',
    },
    {
      id: '3',
      day: 'M',
      selected: false,
      identifier: '3',
    },
    {
      id: '4',
      day: 'J',
      selected: false,
      identifier: '4',
    },
    {
      id: '5',
      day: 'V',
      selected: false,
      identifier: '5',
    },
    {
      id: '6',
      day: 'S',
      selected: false,
      identifier: '6',
    },
    {
      id: '7',
      day: 'D',
      selected: false,
      identifier: '7',
    },
  ],
  hours: [[null, null]],
  place: '',
  __typename: 'OpeningHour',
  id: uuidv4(),
};
function hasPlace(initData) {
  let hasPlace = false;
  if (initData !== null) {
    initData.forEach((data) => {
      if (data.place !== '') {
        hasPlace = true;
      }
    });
  }
  return hasPlace;
}
const SchedulerContainer = (props) => {
  const { onChange, initData, ...other } = props;
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);

  const [availableDays, setAvailableDays] = useState(BLANK_BUSINESS_HOURS);
  const [timeFrames, setTimeFrames] = useState(
    initData !== undefined
      ? initData.map((data) => {
          return [data.days, data.hours, data.place, data.id];
        })
      : [],
  );
  const [showPlace, setShowPlace] = useState(
    initData !== undefined && hasPlace(initData),
  );

  const [timeContainerList, setTimeContainerList] = useState(
    initData !== undefined ? initData : [BLANK_BUSINESS_HOURS],
  );

  const firstUpdate = useRef(true);

  const addTimeContainer = () => {
    const newId = uuidv4();
    const NEW_BLANK_BUSINESS_HOURS = { ...BLANK_BUSINESS_HOURS };
    NEW_BLANK_BUSINESS_HOURS.id = newId;
    const addTimeFrame = ({ days, hours, place, id }) => {
      const newTimeFrame = [days, hours, place, newId];
      const timeFrameList = [...timeFrames, newTimeFrame];
      setTimeFrames(timeFrameList);
    };
    addTimeFrame(NEW_BLANK_BUSINESS_HOURS);

    const newTimeContainerList = [
      ...timeContainerList,
      NEW_BLANK_BUSINESS_HOURS,
    ];
    setTimeContainerList(newTimeContainerList);
  };

  const updateWeekDays = (daysList) => {
    setAvailableDays(daysList);
  };

  const updateTimeFrames = (timeFrame, indexTimeContainer) => {
    if (timeFrames !== undefined && timeFrames.length !== 0) {
      // update timeFrames with initData
      let newTimeFramesList = [...timeFrames];

      // modify the current timeframe
      newTimeFramesList = [...newTimeFramesList].map((currentTimeFrame) => {
        return indexTimeContainer === currentTimeFrame[3]
          ? timeFrame
          : currentTimeFrame;
      });

      setTimeFrames(newTimeFramesList);
    }
  };

  // const addNewTimeFrame = (timeFrame) => {
  //   const newTimeFramesList = [...timeFrames];
  //   newTimeFramesList.push(timeFrame);
  //   setTimeFrames(newTimeFramesList);
  // };

  const deleteTimeContainer = (e, index) => {
    const newTimeFramesList = [...timeFrames].filter((currentTimeFrame) => {
      return index !== currentTimeFrame[3];
    });

    const newTimeContainerList = [...timeContainerList].filter(
      (currentTimeFrame) => {
        return index !== currentTimeFrame.id;
      },
    );

    setTimeFrames(newTimeFramesList);
    setTimeContainerList(newTimeContainerList);
  };

  useEffect(() => {
    // initialize the timeFrames from initData
    if (initData !== undefined) {
      const updatedTimeFrames = initData.map((timeFrame) => timeFrame.days);
    }

    // avoid execution of first render
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
          timeContainerList.map(({ days, hours, place, id }) => {
            console.log('id rendered', id);
            return (
              <div className={classes.timeContainer} key={id}>
                <TimeContainer
                  updateWeekDays={updateWeekDays}
                  updateTimeFrames={updateTimeFrames}
                  availableDays={days}
                  indexTimeContainer={id}
                  deleteTimeContainer={deleteTimeContainer}
                  inputPlace={place}
                  showPlace={showPlace}
                  initData={hours}
                />
              </div>
            );
          })}
      </div>
      <ButtonW
        className={classes.button}
        onClick={addTimeContainer}
        disableRipple
      >
        <AddCircleOutlineIcon fontSize="small" />
      </ButtonW>
    </div>
  );
};

export default SchedulerContainer;
