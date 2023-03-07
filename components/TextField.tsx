import { styled, TextField } from '@mui/material';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    fontSize: '24px',
    fontWeight: '500',
    '&:hover fieldset': {
      borderColor: '#D96552',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#D96552',
      borderWidth: '2px',
    },
    '&.Mui-disabled input': {
      // borderColor: "none",
      // borderWidth: "2px"
      // color: "red"
      // fontWeight: "700",
      // fontSize: "24px"
      zIndex: 1000,
      // color: "#D96552"
    },
    '&.Mui-disabled fieldset': {
      // borderColor: "none",
      // borderWidth: "2px"
      backgroundColor: '#F8F8F8',
      // opacity: '0.5'
    },
  },
});

export default StyledTextField;
