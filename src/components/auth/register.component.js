import React, { useState, useEffect } from 'react';
import useStyles from './auth.styles'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { FormControl, Grid, IconButton, InputAdornment, MenuItem, OutlinedInput, TextField } from '@material-ui/core';
import { REGISTER_ADDRESS, REGISTER_AUTHENTICATION, REGISTER_INFORMATION, USER_TYPES  } from '../../constants/commands.constants';
import { validate } from '../../constants/validator.constants';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/auth.action';
import { unique, wilayas, districts, dairas } from '../../actions/helper.action';
import { useHistory } from "react-router-dom";
import { DAIRAS, DISTRICTS, WILAYAS, UNIQUE } from '../../constants/action.constants';



function getSteps() {
  return ['Authentication', 'Information', 'Address'];
}

function getStepContent(stepIndex, classes, creds, setCreds, showPassword, setShowPassword, selectedWilaya, setSelectedWilaya,
    handleClickShowPassword, handleMouseDownPassword, showConfirm, setShowConfirm, wilayasData, districtsData, dairasData,
    confirm, setConfirm, handleClickShowConfirm, handleMouseDownConfirm, formError, setFormError ) {
 
    const handleChange = (name, value, rules) => {
        switch (name) {
            case 'account':
                setCreds({...creds, account: value}); 
                setFormError({...formError, account: validate(value, 'account', rules)});
                break;
            case 'email':
                setCreds({...creds, email: value}); 
                setFormError({...formError, email: validate(value, 'email', rules)});
                break;
            case 'password':
                setCreds({...creds, password: value}); 
                setFormError({...formError, password: validate(value, 'password', rules)});
                break;  
            case 'confirm':
                setConfirm(value); 
                setFormError({...formError, confirm: validate(value, 'confirm', rules)});
                break;
            case 'firstName':
                setCreds({...creds, firstName: value}); 
                setFormError({...formError, firstName: validate(value, 'first name', rules)});
                break;  
            case 'lastName':
                setCreds({...creds, lastName: value}); 
                setFormError({...formError, lastName: validate(value, 'last name', rules)});
                break;  
            case 'phone':
                setCreds({...creds, phone: value}); 
                setFormError({...formError, phone: validate(value, 'phone', rules)});
                break; 
            case 'wilaya':
                setSelectedWilaya(selectedWilaya);
                setFormError({...formError, wilaya: validate(value, 'wilaya', rules)});
                break;  
            case 'district':
                setCreds({...creds, address: {...creds.address, district: value} });
                setFormError({...formError, district: validate(value, 'district', rules)});
                break;
            case 'daira':
                setCreds({...creds, address: {...creds.address, daira: value} });
                setFormError({...formError, daira: validate(value, 'daira', rules)});
                break; 
            case 'street':
                setCreds({...creds, address: {...creds.address, street: value} }); 
                setFormError({...formError, street: validate(value, 'street', rules)});
                break;  
        }
    }

  switch (stepIndex) {
    case REGISTER_AUTHENTICATION:
      return(
        <Grid container className={classes.form} >
            <Grid container className={classes.mbxs}  >
                <Grid item xs={12} >
                    <TextField  className={classes.formControl} select variant="outlined"
                        required error={ formError.account.length > 0 }
                        value={creds.account} onChange={(e) => handleChange('account', e.target.value, ['required'])} fullWidth
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircleOutlinedIcon />
                                {creds.account === '' ?  "Type" : ''}
                            </InputAdornment>
                            ),
                        }} >
                        {USER_TYPES.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} >
                    {formError.account.map((error, index) => (
                        <Typography xs={12} variant='caption' color='primary' key={index} >- {error}</Typography>
                    ))}
                </Grid>
            </Grid>
            <Grid item container className={classes.mbxs}  >
                <Grid item xs={12} >
                    <FormControl className={classes.formControl} error={formError.email.length > 0} variant="outlined" fullWidth  >
                        <OutlinedInput className={classes.round} placeholder="Email" 
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
            <Grid item container className={classes.mbxs}  >
                <Grid item xs={12} >
                    <FormControl className={classes.formControl} error={formError.password.length > 0} variant="outlined" fullWidth >
                        <OutlinedInput className={classes.round} type={showPassword ? 'text' : 'password'} placeholder="Password"
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
                <Grid item container >
                    {formError.password.map((error, index) => (
                        <Typography xs={12} variant='caption' color='primary' key={index} >- {error}</Typography>
                    ))}
                </Grid>
            </Grid>
            <Grid item container className={classes.mbxs} >
                <Grid item xs={12} >
                    <FormControl className={classes.formControl} error={formError.confirm.length > 0} variant="outlined" fullWidth >
                        <OutlinedInput className={classes.round} type={showConfirm ? 'text' : 'password'} placeholder="Confirm"
                        value={confirm} onChange={(e) => handleChange('confirm', e.target.value, ['confirm:'+creds.password])}
                        startAdornment={
                            <InputAdornment position="start">
                            <LockOutlinedIcon />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton onClick={handleClickShowConfirm} onMouseDown={handleMouseDownConfirm} edge="end" >
                                {showConfirm ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                            </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={0}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item container >
                {formError.confirm.map((error, index) => (
                    <Typography xs={12} variant='caption' color='primary' key={index} >- {error}</Typography>
                ))}
            </Grid>
        </Grid>
      );
    case REGISTER_INFORMATION:
      return (
        <Grid container className={classes.form} >
            <Grid item container className={classes.mbxs} >
                <Grid item xs={12} className={classes.formControl}  >
                    <FormControl error={formError.confirm.length > 0} variant="outlined" fullWidth >
                        <OutlinedInput className={classes.round} placeholder="First name"
                        value={creds.firstName} onChange={(e) => handleChange('firstName', e.target.value, ['required'])}
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircleOutlinedIcon />
                            </InputAdornment>
                        }
                        labelWidth={0} />
                    </FormControl>
                </Grid>
                <Grid item container >
                    {formError.firstName.map((error, index) => (
                        <Typography xs={12} variant='caption' color='primary' key={index} >- {error}</Typography>
                    ))}
                </Grid>
            </Grid>
            <Grid item container className={classes.mbxs} >
                <Grid item xs={12} className={classes.formControl} >
                <FormControl variant="outlined" fullWidth >
                    <OutlinedInput className={classes.round} placeholder="Last name"
                    value={creds.lastName} onChange={(e) => handleChange('lastName', e.target.value, ['required'])}
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircleOutlinedIcon />
                        </InputAdornment>
                    }  labelWidth={0} />
                </FormControl>
                </Grid>
                <Grid item container >
                    {formError.lastName.map((error, index) => (
                        <Typography xs={12} variant='caption' color='primary' key={index} >- {error}</Typography>
                    ))}
                </Grid>
            </Grid>
            <Grid item container className={classes.mbxs} >
                <Grid item xs={12} className={classes.formControl} >
                    <FormControl variant="outlined" fullWidth >
                        <OutlinedInput type='number' className={classes.round} placeholder="Phone"
                        value={creds.phone} onChange={(e) => handleChange('phone', e.target.value, ['required'])}
                        startAdornment={
                            <InputAdornment position="start">
                                <CallOutlinedIcon />
                            </InputAdornment>
                        } labelWidth={0} />
                    </FormControl>
                </Grid>
                <Grid item container >
                    {formError.phone.map((error, index) => (
                        <Typography xs={12} variant='caption' color='primary' key={index} >- {error}</Typography>
                    ))}
                </Grid>
            </Grid>
        </Grid>
      );
    case REGISTER_ADDRESS:
      return (
        <Grid container className={classes.form} >
            <Grid item container className={classes.mbxs} >
                <Grid item xs={12} className={classes.formControl} >
                    <TextField className={classes.formControlS} select variant="outlined" 
                        value={creds.address.wilaya} onChange={(e) => handleChange('wilaya', e.target.value, ['required'])} fullWidth
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <MapOutlinedIcon />
                                {creds.address.wilaya === '' ?  "Wilaya" : ''}
                            </InputAdornment>
                            ),
                        }} >
                        {wilayasData.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                            {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid container >
                    {formError.wilaya.map((error, index) => (
                        <Typography xs={12} variant='caption' color='primary' key={index} >- {error}</Typography>
                    ))}
                </Grid>
            </Grid>
            <Grid item container >
                <Grid item xs={12} className={classes.mbxs} >
                    <TextField className={classes.formControl} select variant="outlined" disabled={districtsData.length === 0 ? true : false}
                        value={creds.address.district} onChange={(e) => handleChange('district', e.target.value, ['required'])} fullWidth
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <ExploreOutlinedIcon />
                                {creds.address.district === '' ?  "District" : ''}
                            </InputAdornment>
                            ),
                        }} >
                        { districtsData.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                            {option.name}
                            </MenuItem>
                        ))  }
                    </TextField>
                </Grid>
                <Grid item container >
                    {formError.district.map((error, index) => (
                        <Typography xs={12} variant='caption' color='primary' key={index} >- {error}</Typography>
                    ))}
                </Grid>
            </Grid>
                    
            <Grid item container >
                <Grid item xs={12} className={classes.mbxs} >
                    <TextField className={classes.formControl} select variant="outlined" disabled={dairasData.length === 0 ? true : false}
                        value={creds.address.daira} onChange={(e) => handleChange('daira', e.target.value, ['required'])} fullWidth
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <ExploreOutlinedIcon />
                                {creds.address.daira === '' ?  "Daira" : ''}
                            </InputAdornment>
                            ),
                        }} >
                        { dairasData.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                            {option.name}
                            </MenuItem>
                        ))  }
                    </TextField>
                </Grid>
                <Grid item container >
                    {formError.daira.map((error, index) => (
                        <Typography xs={12} variant='caption' color='primary' key={index} >- {error}</Typography>
                    ))}
                </Grid>
            </Grid>
            
            <Grid item container >
                <Grid item xs={12} className={classes.mbxs} >
                    <FormControl className={classes.formControl} variant="outlined" fullWidth >
                        <OutlinedInput className={classes.round} placeholder="Street" 
                        value={creds.address.street} onChange={(e) => handleChange('street', e.target.value, ['required'])} 
                        startAdornment={
                            <InputAdornment position="start">
                                <RoomOutlinedIcon />
                            </InputAdornment>
                        }
                        labelWidth={0} />
                    </FormControl>
                </Grid>
                <Grid item container >
                    {formError.district.map((error, index) => (
                        <Typography xs={12} variant='caption' color='primary' key={index} >- {error}</Typography>
                    ))}
                </Grid>
            </Grid>
        </Grid>
      );
    default:
      return 'Unknown stepIndex';
  }
}

export default function Register({creds, setCreds}) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const helper = useSelector(state => state.helper)

    const [wilayasData, setWilayasData] = useState([]);
    const [districtsData, setDistrictsData] = useState([]);
    const [dairasData, setDairasData] = useState([]);
    const [selectedWilaya, setSelectedWilaya] = useState(1);
    const [confirm, setConfirm] = useState('');

    useEffect(() => {
        dispatch(wilayas());
    }, []);

    useEffect(() => {
        switch(helper.type){
            case WILAYAS: 
                setWilayasData(helper.data.wilayas);
                break;
            case DISTRICTS: 
                setDistrictsData(helper.data.districts);
                break;
            case DAIRAS: 
                setDairasData(helper.data.dairas);
                console.log('dairas', helper);
                break;
            case UNIQUE: 
                if(helper.data.email && errorCount === 0) {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                } else {
                    errorCount += 1;
                    setFormError({...formError, email: [helper.data.message]})
                }
                break;
        }
    }, [helper]);

    const [activeStep, setActiveStep] = useState(REGISTER_AUTHENTICATION);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [formError, setFormError] = useState({
        account: [], email: [], password: [], confirm: [],
        firstName: [], lastName: [], phone: [],
        wilaya: [], district: [], daira: [], street: []
    });

    const handleClickShowPassword = () => {
        setShowPassword( !showPassword );
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowConfirm = () => {
        setShowConfirm( !showConfirm );
    };
    const handleMouseDownConfirm = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        if(selectedWilaya !== '' ){
            setCreds({...creds, address: {...creds.address, wilaya: selectedWilaya} }); 
            dispatch(districts({wilaya_id: selectedWilaya}));
            dispatch(dairas({wilaya_id: selectedWilaya}));
        }
    }, [selectedWilaya]);

    const steps = getSteps();
    const checkErrors = (value, name, rules) => {
        let errors = validate(value, name, rules);
        switch (name) {
            case 'account':
                formError.account = errors;
                break;
            case 'email':
                formError.email = errors;
                break;
            case 'password':
                formError.password = errors;
                break;  
            case 'confirm':
                formError.confirm = errors;
                break; 
            case 'firstName':
                formError.firstName = errors;
                break;  
            case 'lastName':
                formError.lastName = errors;
                break;  
            case 'phone':
                formError.phone = errors;
                break;  
            case 'wilaya':
                formError.wilaya = errors;
                break;
            case 'district':
                formError.district = errors;
                break;
            case 'street':
                formError.street = errors;
                break; 
        }
        return errors.length;
    }
    var errorCount = 0;
    const handleNext = () => {
        errorCount = 0;
        switch(activeStep) {
            case REGISTER_AUTHENTICATION:         
                errorCount += checkErrors(creds.email, 'email', ['required', 'email']);
                if(errorCount === 0) dispatch(unique({name: 'email', value: creds.email}));
                errorCount += checkErrors(creds.account, 'account', ['required']);
                errorCount += checkErrors(creds.password, 'password', ['required', 'password']);
                errorCount += checkErrors(confirm, 'confirm', ['required', 'confirm:'+creds.password]);
                break;
            case REGISTER_INFORMATION: 
                errorCount += checkErrors(creds.firstName, 'firstName', ['required']);
                errorCount += checkErrors(creds.lastName, 'lastName', ['required']);
                errorCount += checkErrors(creds.phone, 'phone', ['required']);
            break;
            case REGISTER_ADDRESS: 
                errorCount += checkErrors(creds.address.wilaya, 'wilaya', ['required']);
                errorCount += checkErrors(creds.address.district, 'district', ['required']);
                errorCount += checkErrors(creds.address.daira, 'daira', ['required']);
                errorCount += checkErrors(creds.address.street, 'street', ['required']);
            break;
        }        
        setFormError({...formError});
        if(activeStep === REGISTER_AUTHENTICATION || errorCount !== 0) return;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleRegister = () => {
        console.log('creds: ', creds);
        dispatch(register(creds));
    };

    useEffect(() => {
        if(auth.token){
            history.push("/profile");
        }
        if(!auth.success) {
            console.log(auth.message);
        } 
        console.log("Register res: ", auth.success);
    }, [auth]);

  return (
    <div>
      <Stepper className={classes.stepperHeader} activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
        <Grid container >
            <Grid item container className={classes.form} >
                <Grid item container className={classes.text} >
                    <Grid item xs={3} > <Typography variant='caption' color='primary' >Account: </Typography> </Grid>
                    <Grid item xs={8} > <Typography variant='caption'>{USER_TYPES[creds.account].label}</Typography> </Grid>
                    <Grid item xs={1} > <PeopleAltOutlinedIcon /> </Grid>
                </Grid>
                <Grid item container className={classes.text} >
                    <Grid item xs={3} > <Typography variant='caption' color='primary' >Email: </Typography> </Grid>
                    <Grid item xs={8} > <Typography variant='caption'>{creds.email}</Typography> </Grid>
                    <Grid item xs={1} > <EmailOutlinedIcon /> </Grid>
                </Grid>
                <Grid item container className={classes.text} >
                    <Grid item xs={3} > <Typography variant='caption' color='primary' >Fullname: </Typography> </Grid>
                    <Grid item xs={8} > <Typography variant='caption'>{creds.firstName+' '+creds.lastName}</Typography> </Grid>
                    <Grid item xs={1} > <AccountCircleOutlinedIcon /> </Grid>
                </Grid>
                <Grid item container className={classes.text} >
                    <Grid item xs={3} > <Typography variant='caption' color='primary' >Phone: </Typography> </Grid>
                    <Grid item xs={8} > <Typography variant='caption'>{creds.phone}</Typography> </Grid>
                    <Grid item xs={1} > <CallOutlinedIcon /> </Grid>
                </Grid>
                <Grid item container className={classes.text} >
                    <Grid item xs={3} > <Typography variant='caption' color='primary' >Address: </Typography> </Grid>
                    <Grid item xs={8} > 
                        <Typography variant='caption'>
                            {creds.address.street}, 
                            {dairasData[creds.address.daira-1].name}, 
                            {districtsData[creds.address.district-1].name}, 
                            {wilayasData[creds.address.wilaya-1].name}
                        </Typography> 
                    </Grid>
                    <Grid item xs={1} > <RoomOutlinedIcon /> </Grid>
                </Grid>
            </Grid>
            <Grid item container className={classes.btnControl} >
                <Grid item xs={4} >
                    <Button className={classes.round+' '+classes.thicc} variant="outlined" size="large" color="primary" onClick={handleBack} fullWidth>Back</Button>
                </Grid>
                <Grid item xs={1} ></Grid>
                <Grid item xs={7} >
                    <Button className={classes.round+' '+classes.thicc} variant="contained" size="large" color="primary" fullWidth onClick={handleRegister} >Register</Button>
                </Grid>       
            </Grid>
        </Grid>
          </div>
        ) : (
          <div>
           <div>{getStepContent(activeStep, classes, creds, setCreds, showPassword, setShowPassword,selectedWilaya, setSelectedWilaya,
                handleClickShowPassword, handleMouseDownPassword, showConfirm, setShowConfirm, wilayasData, districtsData, dairasData,
                confirm, setConfirm, handleClickShowConfirm, handleMouseDownConfirm, formError, setFormError)}</div>
            <Grid item container className={classes.btnControl} >
                <Grid item xs={4} >
                    { (activeStep === 0) ? '' :
                        <Button className={classes.round+' '+classes.thicc} variant="outlined" size="large" color="primary"  onClick={handleBack} fullWidth>Back</Button> 
                    }
                </Grid>
                <Grid item xs={4} ></Grid>
                <Grid item xs={4} >
                    <Button className={classes.round+' '+classes.thicc} variant="contained" size="large" color="primary" fullWidth onClick={handleNext} >{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
                </Grid>       
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
}
