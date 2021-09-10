import {createTheme} from "@material-ui/core";

const titleStyles = {
    fontFamily: 'Lato',
    fontStyle: 'bold'
};

export const baseColors = {
    primary: '#2685ff'
};

export const baseShadows = {
    card: '0px 0px 30px rgba(255, 255, 255, 0.3), 0px 4px 60px rgba(255, 255, 255, 0.5)'
};

const base = {
    typography: {
        fontFamily: [
            'Lato',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"'
        ].join(','),
        h1: {
            ...titleStyles,
            fontSize: '25px',
            fontWeight: 800,
            marginBottom: '1em',
            letterSpacing: '0.2em',
        },
        h2: {
            ...titleStyles,
            fontSize: '25px',
            fontWeight: '700',
        },
        h3: {
            ...titleStyles,
            fontSize: '22px',
            fontWeight: 500,
        },
        h4: {
            ...titleStyles,
            fontSize: '19px',
            fontWeight: 'bold',
        },
        h5: {
            ...titleStyles,
            fontSize: '16px',
            fontWeight: 900,
        },
        h6: {
            fontSize: '14px',
            fontWeight: 900,
            letterSpacing: '0.15em',
        },
        body1: {
            fontStyle: 'normal',
            fontWeight: 'normal',
        },
        body2: {
            fontStyle: 'normal',
            fontWeight: 'bold',
        },
        caption: {
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '10px',
        }
    },
    palette: {
        primary: {
            main: baseColors.primary
        },
        text: {
            primary: '#222'
        },
        background: {
            primary: '#d3f6f9'
        }
    },
    overrides: {
        MuiCssBaseline: {
            "@global": {
                body: {
                }
            }
        },
        MuiCard: {
            root: {
                boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 10px',
                borderRadius: '16px',
            }
        },
        MuiCardContent: {
            root: {
                padding: '20px'
            }
        },
        MuiButton: {
            containedPrimary: {
                borderRadius: '20px',
                color: '#fff',
                fontWeight: 'bold'
            }
        },
        MuiTextField: {
            root: {
                borderRadius: '20px',
                backgroundColor: '#F7F7F7',
                '&:before': {
                    backgroundColor: 'rgba(0.5, 121, 215, 247)'
                }
            },
            notchedOutline: {
                borderRadius: '20px'
            }
        },
        MuiOutlinedInput: {
            notchedOutline: {
                borderRadius: '20px'
            },
        },
        MuiInput: {
            root: {
                borderRadius: '20px'
            },
            notchedOutline: {
                borderRadius: '20px'
            }
        }
    }
};

const theme = createTheme(base);

export default theme;