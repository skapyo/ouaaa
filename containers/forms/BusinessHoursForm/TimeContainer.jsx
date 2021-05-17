import React, { useState, useContext, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { nanoid } from 'nanoid';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import ButtonDay from './ButtonDay';
import TimePicker from './TimePicker';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  section: {
    color: 'white',
    padding: '0 0px',
    display: 'flex',
    flexDirection: 'column',
  },
  days: {
    color: 'white',
    padding: '0 0px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  places: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    color: 'black',
  },
  timerange: {
    color: 'white',
    padding: '0 0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonAdd: {
    marginTop: 'auto',
    textTransform: 'none',
    color: '#3f51b5',
  },
  buttonDelete: {
    marginTop: 'auto',
  },
}));

export default function TimeContainer(props) {
  const classes = useStyles();

  const {
    updateWeekDays,
    updateTimeFrames,
    availableDays,
    indexTimeContainer,
    deleteTimeContainer,
    places,
  } = props;

  const [hours, setHours] = useState([]);
  const [weekdays, setWeekDays] = useState(availableDays);
  const [timeRangeList, setTimeRangeList] = useState([1]);
  const [location, setLocation] = React.useState('');

  const addTimeRange = () => {
    setTimeRangeList([...timeRangeList, 1]);
  };

  const selectDays = (e) => {
    const dayId = e.currentTarget.dataset.id;
    const selectedDays = [...weekdays].map((day) =>
      day.id === +dayId ? { ...day, selected: !day.selected } : day,
    );

    // console.log(selectedDays);

    setWeekDays(selectedDays);
  };

  const selectLocation = (activeLocation) => {
    setLocation(activeLocation);
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
          <section>
            <div className={classes.places}>
              <div className={classes.days}>
                {weekdays.map((day) => {
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
              {places.length > 0 && (
                <>
                  <h4>Emplacements</h4>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={location}
                    onChange={(e) => selectLocation(e.target.value)}
                  >
                    {places.map((place) => {
                      return (
                        <MenuItem value={place.text}>{place.text}</MenuItem>
                      );
                    })}
                  </Select>
                </>
              )}
            </div>
            <div className={classes.timerange}>
              {timeRangeList.length > 0 &&
                timeRangeList.map((e, index) => {
                  return (
                    <TimePicker selectHours={selectHours} indexTimer={index} />
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
          </section>
        )}
      </div>
      <Button aria-label="delete" className={classes.buttonDelete}>
        <DeleteIcon
          fontSize="small"
          onClick={(e) => deleteTimeContainer(e, indexTimeContainer)}
        />
      </Button>
    </div>
  );
}
