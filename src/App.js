import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Redirect, Route,  } from 'react-router-dom';
import Auth from './components/auth/auth.component.js';
import useStyles from './App.styles'
import Profile from './components/auth/profile.component.js';
import { useSelector } from 'react-redux';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/auth', state: {from: props.location}}} />}
    />
  )
}

function isAuth(token){
  if(token) return true
  return false;
}

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#d63031',
      },
      secondary: {
        main: '#d63031',
      },
    },
    typography: {
      fontFamily: "'Manrope', sans-serif",
    },
  });

  const classes = useStyles();
  const auth = useSelector(state => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <Router  className={classes.mainContainer} >
        <Route exact path="/auth" 
          render={() => ( <Auth /> )} />
        <PrivateRoute authed={isAuth(auth.token)} 
          path='/profile' component={Profile} />
        <Route exact path="/" 
          render={() => ( <Auth /> )} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
