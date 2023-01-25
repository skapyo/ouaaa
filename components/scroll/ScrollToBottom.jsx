import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Fab from '@mui/material/Fab';
import { scrollTo } from './scrollTo';

const ScrollButton = ({
  toRef, duration, children, sections,
}) => {
  const useStyles = makeStyles((theme) => ({
    fab: {
      position: 'fixed',
      bottom: '40px',
      right: '40px',
      zIndex: '1400',
      backgroundColor: '#2C367E',
      color: 'white',
      '&:hover': {
        color: '#2C367E',
      },
    },
  }));
  const styles = useStyles();

  const [down, setDown] = useState(true);
  const [sectionIterator, setSectionIterator] = useState(1);

  const scrollToBottom = () => {
    scrollTo({ id: sections[sectionIterator], ref: toRef, duration });
    
    if (sectionIterator === sections.length-1) {
      setDown(false);
      setSectionIterator(0);
    } else {
      setDown(true);
      setSectionIterator(sectionIterator + 1);
    }
    
  };

  return (
    <Fab className={styles.fab} aria-label="edit">
      { down && (
      <ArrowDownwardIcon
        onClick={scrollToBottom}
      />
      )}
      { !down && (
      <ArrowUpwardIcon
        onClick={scrollToBottom}
      />
      )}
    </Fab>
  );
};

export default ScrollButton;
