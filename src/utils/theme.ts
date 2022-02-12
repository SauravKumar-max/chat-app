import { createTheme } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        background: {
            default: "#fff"
        },
        primary: {
            main: '#3d41d7',
        },
        secondary: {
            main: blueGrey[50],
        },
        text: {
            primary: "#29292ff2",
            secondary: "#000000ab"
        }
    },
  });