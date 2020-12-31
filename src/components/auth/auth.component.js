import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Box, Paper, Grow } from '@material-ui/core';
import useStyles from './auth.styles'
import Login from './login.component';
import Register from './register.component';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} 
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}  >
      {value === index && (
        <Box p={1}>
          <Typography variant='h6' >{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Auth() {
  const classes = useStyles();

  const theme = useTheme();
  const [value, setTab] = useState(1);
  const [creds, setCreds] = useState({ email: '', password: '', account: '', firstName: '', lastName: '', phone: '', 
    address: {wilaya: '', district: '', daira: '',  street: ''} });
  
  const handleTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleTabIndex = (index) => {
    setTab(index);
  };

  return (
    <form className={classes.mainContainer} noValidate autoComplete="off" >
      <Paper className={classes.formContainer} elevation={5} >
        <AppBar position="static" color="default" className={classes.tabs} >
          <Tabs value={value} onChange={handleTab} indicatorColor="primary"
            textColor="primary" variant="fullWidth" >
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Register" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <Grow in >
        <SwipeableViews className={classes.swiperContainer} axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value} onChangeIndex={handleTabIndex} > 
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Login creds={creds} setCreds={setCreds} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Register creds={creds} setCreds={setCreds} />
          </TabPanel>
        </SwipeableViews>
        </Grow>
      </Paper>
    </form>
  );
}
