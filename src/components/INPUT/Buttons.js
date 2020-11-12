import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import  amber  from '@material-ui/core/colors/amber';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary:{
    main: amber[500]
    }
  },
});

export default function Buttons() {
  const classes = useStyles();


  return (
    <div>

      <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary" className={classes.margin}>
        test
        </Button>
      </ThemeProvider>
    </div>
  );
}