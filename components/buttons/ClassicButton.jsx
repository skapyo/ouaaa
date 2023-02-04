import { Button } from '@mui/material';
import { styled } from '@mui/styles';

const ClassicButton = styled(Button)({
  // width:'100%',
  textTransform: 'none',
  background: '#D96552',
  color: 'white',
  borderRadius: '8px',
  paddingTop: '12px',
  paddingBottom: '12px',
  marginBottom: '16px',
  '&:hover': {
    color: '#D96552',
    background: 'white',
  },
  '&.Mui-disabled': {
    background: '#E0E0E0',
  },
});


export default ClassicButton;
