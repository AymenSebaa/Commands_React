import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './auth.styles'
import { useHistory } from "react-router-dom";
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { logout } from '../../actions/auth.action'

export default function Profile() {
    const classes = useStyles();
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    console.log('profile:', auth);

    const handleLogout = () => {
        dispatch(logout(auth));
    }

    useEffect(() => {
        if(!auth.token){
            history.push("/auth");
        }
    }, [auth]);


    return(
        !auth.token ? history.push("/auth") : (
        <Paper className={classes.mainContainer} elevation={3} >
            <Grid container >
                <Grid item container>
                    <Grid item xs={4} >
                    <Typography variant="h4" > Email</Typography>: 
                    </Grid>
                    <Grid item xs={8} >
                        <Typography variant="h4" >{auth.user.email}</Typography>
                    </Grid>
                </Grid>
                <Button variant="outlined" onClick={handleLogout} >Logout</Button>
            </Grid>
        </Paper>
        )
       
    );
}