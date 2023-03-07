import React from 'react';
import withStyles from '@mui/styles/withStyles';
import { Menu } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const styles = (theme) => ({
  '@media print': {
    buttonCollapse: {
      display: 'none',
    },
  },
  buttonCollapse: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
    margin: '10px',
    boxShadow: 'none',
  },
  menuIcon: {
    color: '#2C367E',
  },
});

class ButtonAppBarCollapse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
    this.handleMenu = this.handleMenu.bind(this);
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.buttonCollapse}>
        <IconButton onClick={this.handleMenu} size="large">
          <MenuIcon className={classes.menuIcon} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
        >
          {this.props.children}
        </Menu>
      </div>
    );
  }
}
export default withStyles(styles)(ButtonAppBarCollapse);
