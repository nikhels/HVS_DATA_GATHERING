import React from 'react'
import Axios from 'axios'
// import InputDropdown from '../INPUT/InputDropdown'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
 } from '@material-ui/core/styles';
 import  grey from '@material-ui/core/colors/grey';
 import  red from '@material-ui/core/colors/red';

export default function StationSelection() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: grey[900],
      },
      secondary: {
        main: red[800],
      },
    },
  });
  
  const [stations, setStations] = React.useState([])
  const useStyles = makeStyles({
    root: {
      backgroundColor:'white',
      border: 2,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      height: 48,
    },
    '&.MuiSelect-filled': {
      backgroundColor:'#000000'
    },
  });
  const classes = useStyles();

  React.useEffect(() => {
    async function getStations() {
      Axios.get("http://localhost:3001/existing").then((response) => {
        setStations(response.data.map(({ callLetters }) => ({ label: callLetters, value: callLetters })));
      });
      
    }
    getStations();
  }, []);

  // const stationMap = 
  
  return (
<>
<ThemeProvider theme = {theme}>
  <div className={classes}>
<FormControl className={classes.root} variant="filled">
<InputLabel color="primary">{"Choose Station"}</InputLabel>
<Select 
      className={"input__dropdown large"}
      onChange = {""}
      // value = {"choose station"}
      >
  {stations.map(({ label, value }) => (
    <MenuItem key = {label} value={value}>
      {value}
    </MenuItem>
  ))} 

</Select>
</FormControl>
  </div>
  </ThemeProvider>

</>
  )
}
