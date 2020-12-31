import { makeStyles } from '@material-ui/core/styles';
import background from '../../images/bg1.jpg';

export default makeStyles((theme) => ({
    mainContainer: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url('+background+')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    formContainer: {
      padding: 0,
      width: '30rem',
      margin: '1rem',
      background: '#fff9',
      borderRadius: '1rem',
      backdropFilter: 'blur(.8rem)',
      border: '1px solid transparent',
      backgroundClip: 'padding-box',
      boxShadow: '0px 3px 10px 3px rgba(30, 30, 30, .3)'
    },
    swiperContainer: {
      boxSizing: "border-box",
      padding: '3rem',
      '& .MuiInputBase-root': {
        borderRadius: '3rem'
      },
      
    },
    formControl: {
      borderRadius: '3rem',
      background: '#aaa5',
    },
    mb: {
      marginBottom: '3rem',
    },
    mbs: {
      marginBottom: '1.5rem',
    },
    mbxs: {
      marginBottom: '.8rem',
    },
    btnControl: {
    
    },
    tabs: {
      borderRadius: '1rem 1rem 0 0',
      background: '#fff4',
      backdropFilter: 'blur(.8rem)',
    },
    form: {
      boxSizing: "border-box",
      padding: '1rem 0'
    },
    text: {
      boxSizing: "border-box",
      padding: '.5rem 0'
    },
    round: {
      borderRadius: '3rem'
    },
    thicc: {
      borderWidth: '2px',
      boxShadow: '0 3px 5px 2px ##d6303122',
      border: '1px solid ##d63031',
      '&:hover': {
        borderWidth: '2px',
        boxShadow: '0 3px 5px 2px ##d6303133'
     },
    },
    label: {
      marginLeft: '1rem',
      backgroundColor: '#f5f5f5',
      padding: '0 1rem'
    },
    stepperHeader: {
      background: 'none',
      padding: '0'
    },
    [theme.breakpoints.down('xs')]: {
      swiperContainer: {
        padding: '1rem'
      }
    },
}));