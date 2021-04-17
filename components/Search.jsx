import React from 'react';
import SearchIcon from '@material-ui/core/SvgIcon/SvgIcon';
import InputBase from '@material-ui/core/InputBase/InputBase';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: '9em',
    backgroundColor: 'white',
    // marginLeft: theme.spacing(40),
    width: '35%',
    margin: '0 auto',
    marginTop: theme.spacing(2),
    color: 'black',
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    color: '#bf083e',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  align: {
    'text-align': 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 4),
    // vertical padding + font size from searchIcon

    transition: theme.transitions.create('width'),
  },
}));

export default function Search() {
  const styles = useStyles();

  return (
    <div className={styles.search}>
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Rechercher un acteur, un événement, un article"
        classes={{
          root: styles.inputRoot,
          input: styles.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
}
