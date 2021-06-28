import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

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
    background: '#D96552',
  },
  '&.Mui-disabled': {
    background: '#E0E0E0',
  },
});

// const useStyles = makeStyles((theme) => ({
//     root : {
//         // width:'100%',
//         textTransform:'none',
//         background:'#D96552',
//         color:'white',
//         borderRadius:'8px',
//         paddingTop:'12px',
//         paddingBottom:'12px',
//         marginBottom:'16px',
//         '&:hover': {
//             background:'#D96552',
//         }
//     }
// }))

// const ClassicButton = ({children, className,...props}) => {

//     const styles = useStyles()

//     return (
//         <Button className={clsx(className,styles.root)} {...props}>
//             {children}
//         </Button>
//     )
// }

export default ClassicButton;
