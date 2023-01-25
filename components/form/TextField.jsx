import { TextField } from '@mui/material';

import withStyles from '@mui/styles/withStyles';

const StyledTextField = withStyles({
  root: {
    width: '300px',
  },
})(TextField);

export default StyledTextField;
