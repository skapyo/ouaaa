import { TextField, withStyles } from '@material-ui/core';

const CustomRadioGroup = withStyles({
  root: {
    width: '300px',
  },
})(TextField);

export default CustomRadioGroup;
