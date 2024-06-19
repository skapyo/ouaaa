import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    green: Palette['primary'];
    white: Palette['primary'];
    tertiary: Palette['primary'];
  }

  interface PaletteOptions {
    green?: PaletteOptions['primary'];
    white?: PaletteOptions['primary'];
    tertiary?: PaletteOptions['primary'];
  }

  interface TypographyVariants {
    greenTitle: React.CSSProperties;
    paragraph: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    greenTitle?: React.CSSProperties;
    paragraph?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    greenTitle: true;
    paragraph: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    hoverScaled: true;
  }

  interface ButtonPropsColorOverrides {
    green: true;
    greenInverted: true;
    tertiary: true;
  }
}

declare module '@mui/material/Card' {
  interface CardPropsVariantOverrides {
    classic: true;
  }
}

const colorTheme = createTheme({
  palette: {
    primary: {
      main: '#2c367e', //bleu
      light: '#86A7D8',
    },
    secondary: {
      main: '#d96552', 
      light: '#D9A2BC',
      contrastText: '#fff',
    },
    tertiary: {
      main: '#fcc100', //jaune
      light: '#FBEF6A',
      contrastText: '#fff',
    },
    green: {
      main: '#69b6a9', //vert
      light: '#AFD5A7',
      contrastText: '#fff',
    },
    white: {
      main: '#fff',
      contrastText: '#E56794',
    },
  },
});

const theme = createTheme(colorTheme, {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    body1: {
      lineHeight: 1.7,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    h1: {
      fontSize: '4rem',
      color: colorTheme.palette.primary.main,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    h2: {
      fontSize: '1.5rem',
      color: colorTheme.palette.primary.main,
      marginTop: colorTheme.spacing(2),
      marginBottom: colorTheme.spacing(2),
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    h3: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '23px',
      color: colorTheme.palette.primary.main,
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '1.5rem',
      color: colorTheme.palette.primary.main,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    h5: {
      color: colorTheme.palette.primary.main,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    h6: {
      color: colorTheme.palette.primary.main,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    button: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    caption: {
      color: colorTheme.palette.common.white,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontStyle: 'italic',
      fontSize: '13px',
    },
    greenTitle: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '20px',
      color: colorTheme.palette.green.main,
      marginBottom: colorTheme.spacing(3),
      [colorTheme.breakpoints.up('md')]: {
        fontSize: '30px',
      },
      [colorTheme.breakpoints.down('md')]: {
        fontSize: '20px',
      },
    },
    paragraph: {
      marginBottom: colorTheme.spacing(2),
      color: colorTheme.palette.text.primary,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: false, // Remove default maxWidth
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          greenTitle: 'h2',
          paragraph: 'p',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        square: true,
      },
      styleOverrides: {

      },
      variants: [
        {
          props: { variant: 'classic' },
          style: {
            border: '1px',
            borderColor: 'inherit',
            backgroundColor: 'inherit',
            transition: 'inherit',
            paddingBottom: 'inherit',
            borderRadius: '4px',
            boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
            '&:hover': {
              transform: 'inherit',
              backgroundColor: 'inherit',
              borderColor: 'inherit',
            },

          },
        },
      ],
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingTop: colorTheme.spacing(3),
          paddingBottom: colorTheme.spacing(2),

        }
      }
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          paddingBottom: colorTheme.spacing(2),
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: 'grey',
        }
      }
    },
  },
});

export default theme;
