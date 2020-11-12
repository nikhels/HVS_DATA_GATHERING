import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
// import { green } from '@material-ui/core/colors';
// import { createMuiTheme } from '@material-ui/core/styles';
import {
   unstable_createMuiStrictModeTheme as createMuiTheme,
  } from '@material-ui/core/styles';


// import purple from '@material-ui/core/colors/purple';
import  grey from '@material-ui/core/colors/grey';
import  red from '@material-ui/core/colors/red';





export default function InputDropdown({data}) {
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

  
  const {
    label,
    className,
    functionCall,
    displayValue = "",
    selection1,
    selection2,
    selection3,
    selection4,
    disabled = false
  } = data

 

  return (
    <ThemeProvider theme = {theme}>
    <div className={classes}>
    <FormControl className={classes.root} variant="filled">
    <InputLabel color="primary">{label}</InputLabel>
    <Select
      className={className}
      onChange = {(e) => functionCall(e.target.value)}
      value = {displayValue}
      disabled={disabled}
    >
      <MenuItem value=''>
        <em>None</em>
      </MenuItem>
      <MenuItem value={selection1}>{selection1}</MenuItem>
      <MenuItem value={selection2}>{selection2}</MenuItem>
      <MenuItem value={selection3}>{selection3}</MenuItem>
      <MenuItem value={selection4}>{selection4}</MenuItem>
    </Select>
  </FormControl>
  </div>
  </ThemeProvider>
  )
}
