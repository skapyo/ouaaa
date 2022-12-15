import PropTypes from 'prop-types';
import {Button} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';

const useStyles = makeStyles((theme) => ({
  root: {
    width: (props) => props.width,
    border: '1px solid grey light',
    marginBottom: theme.spacing(1),
  },
}));

const SocialNetworkButton = ({ socialNetwork, width, ...props }) => {
  const useStylesProps = { width };
  const styles = useStyles(useStylesProps);

  let icon = <LanguageIcon />;

  switch (socialNetwork) {
    case 'Website':
      icon = <LanguageIcon />;
      break;
    case 'Youtube':
      icon = <YouTubeIcon />;
      break;
    case 'Instagram':
      icon = <InstagramIcon />;
      break;
    case 'Linkedin':
      icon = <LinkedInIcon />;
      break;
    case 'Facebook':
      icon = <FacebookIcon />;
      break;
  }

  return (
    <Button className={styles.root} startIcon={icon} {...props}>
      {socialNetwork}
    </Button>
  );
};

SocialNetworkButton.defaultProps = {
  socialNetwork: 'Website',
  width: '200px',
};

SocialNetworkButton.propTypes = {
  socialNetwork: PropTypes.oneOf([
    'Website',
    'Youtube',
    'Linkedin',
    'Instagram',
    'Facebook',
  ]),
  width: PropTypes.any,
};

export default SocialNetworkButton;
