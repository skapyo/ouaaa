import { TextField, withStyles } from '@material-ui/core';

const StyledTextField = withStyles({
  root: {
    width: '300px',
  },
})(TextField);

export default StyledTextField;
