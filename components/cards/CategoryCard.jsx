import React from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: '10px',
  },
  category: {
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginRight: 16,
    [theme.breakpoints.down('sm')]: {
      marginRight: 8,
    },
  },
  opacity: (props) => ({
    width: '40px',
    height: '40px',
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: props.color,
    opacity: '0.3',
  }),
  categoryIcon: (props) => ({
    width: '40px',
    height: '40px',
    mask: `url('/icons/${props.icon}.svg')`,
    maskPosition: 'center center',
    maskRepeat: 'no-repeat',
    maskSize: '22px',
    background: props.color,
  }),
  categoryTitle: {
    height: '65px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
  },
  threeLines: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 3,
  },
}));

const StyledBox = styled(Box)`
  ${({ theme }) => `
  cursor: pointer;
  box-shadow: none;
  transition: ${theme.transitions.create(['box-shadow'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    box-shadow: 2px 2px 8px ${theme.palette.primary.light};
  }
  `}
`;

const CategoryCard = ({ category }) => {
  const {
    id, label, description, icon, color,
  } = category;
  const styles = useStyles({ color, icon });

  return (
    <Grid
      item
      md={3}
      sm={6}
      xs={12}
    >
      <Link href={`/annuaire/${id}`} color="inherit" underline="none">
        <StyledBox
          className={styles.card}
        >
          <Stack
            spacing={2}
            alignItems="center"
          >
            <div className={styles.category}>
              <span className={styles.opacity} />
              <span className={styles.categoryIcon} />
            </div>
            <Typography variant="h5" className={styles.categoryTitle}>
              {label}
            </Typography>
            <Box>
              <Typography variant="subtitle1" className={styles.threeLines}>
                {description}
              </Typography>
            </Box>
          </Stack>
        </StyledBox>
      </Link>
    </Grid>
  );
};

export default CategoryCard;
