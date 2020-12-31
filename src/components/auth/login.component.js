import React, { useEffect, useState }  from 'react';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyles from './auth.styles'
import { Button, FormControl, Grid, OutlinedInput, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/auth.action';
import { useHistory } from "react-router-dom";
import { validate } from '../../constants/validator.constants';

export default function Login({creds, setCreds}){
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector(state => state.auth)

    const [showPassword, setShowPassword] = useState(false);

    const [formError, setFormError] = useState({
      email: [], password: []
    });


    const handleClickShowPassword = () => {
      setShowPassword( !showPassword );
    };
    
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleLogin = () => {
      console.log('creds: ', creds);
      dispatch(login(creds));
    }

    const handleChange = (name, value, rules) => {
      switch (name) {
          case 'email':
            setCreds({...creds, email: value}); 
            setFormError({...formError, email: validate(value, 'email', rules)});
            break;
          case 'password':
            setCreds({...creds, password: value}); 
            setFormError({...formError, password: validate(value, 'password', rules)});
            break;     
      }
    }   
    
    useEffect(() => {
        if(auth.token){
          history.push("/profile");
        }
        if(!auth.success) {
          console.log(auth);
          if(auth.email) {
            formError.email.push(auth.message);
          } else if (auth.password) {
            formError.password.push(auth.message);
          }
          setFormError({...formError});
        } 
    }, [auth]);
    return (
      <Grid container className={classes.form} >
        <Grid item container className={classes.mbxs} >
          <Grid item xs={12} className={classes.formControl} >
            <FormControl variant="outlined" fullWidth >
              <OutlinedInput className={classes.round} id="form-control-email" placeholder="Email"
                value={creds.email} onChange={(e) => handleChange('email', e.target.value, ['required', 'email'])} 
                startAdornment={
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                } labelWidth={0} />
            </FormControl>
          </Grid>
          <Grid item container >
              {formError.email.map((error, index) => (
                  <Typography xs={12} variant='caption' color='primary' key={index} >- {error}</Typography>
              ))}
          </Grid>
        </Grid>
        
        <Grid item container className={classes.mbs} >
          <Grid item xs={12} className={classes.formControl} >
            <FormControl variant="outlined" fullWidth >
              <OutlinedInput className={classes.round} id="form-control-password" type={showPassword ? 'text' : 'password'} 
              placeholder="Password"
                value={creds.password} onChange={(e) => handleChange('password', e.target.value, ['required', 'password'])} 
                startAdornment={
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" >
                      {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                } labelWidth={0} />
            </FormControl>
          </Grid>
          <Grid container >
              {formError.password.map((error, index) => (
                  <Typography xs={12} variant='caption' color='primary' key={index} >- {error}</Typography>
              ))}
          </Grid>
        </Grid>
        
        <Grid item container className={classes.btnControl} >
            <Grid item xs={4} >
                <Button className={classes.round+' '+classes.thicc} variant="outlined" size="large" color="primary" fullWidth>reset</Button>
            </Grid>
            <Grid item xs={1} ></Grid>
            <Grid item xs={7} >
                <Button className={classes.round+' '+classes.thicc} variant="contained" size="large" color="primary" fullWidth onClick={handleLogin} >Login</Button>
            </Grid>       
        </Grid>
      </Grid>
    );
}