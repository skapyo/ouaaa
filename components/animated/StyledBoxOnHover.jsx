import Box from '@mui/material/Box';
import styled from 'styled-components';

const StyledBoxOnHover = styled(Box)`
  ${({ theme }) => `
  cursor: pointer;
  box-shadow: none;
  transition: ${theme.transitions.create(['box-shadow'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    box-shadow: 0 15px 40px ${theme.palette.shadow.main};
  }
  `}
`;

export default StyledBoxOnHover;
