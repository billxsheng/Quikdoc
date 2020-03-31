import React, { useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Title from './Components/Title';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 240;

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '1250px'
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
  depositContext: {
    flex: 1,
  },
}));

export default function Clinic(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [clinic, setClinic] = useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:8080/api/clinics/${props.match.params.clinicID}`).then((clinics) => {
      setClinic(clinics.data[0]);
    })
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                <React.Fragment>
                  <Title>Clinic</Title>
                  <Typography component="p" variant="h4" className={classes.depositContext}>
                    {clinic.clinic_name}
                  </Typography>
                  <Typography color="textSecondary" >
                    Type: {clinic.avg_wait_time ? "Walk-in Clinic": "Appointment Clinic"}
                  </Typography>
                  <Typography color="textSecondary" >
                    Rating (/5): {clinic.clinic_rating}
                  </Typography>
                  <Typography color="textSecondary" >
                    Distance (km): 5
                  </Typography>
                  <Typography color="textSecondary" >
                    Wait Time: {clinic.avg_wait_time ? clinic.avg_wait_time + " Hours": clinic.avg_wait_days + " Days"}
                  </Typography>
                </React.Fragment>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                <React.Fragment>
                  <Title>Schedule</Title>
                  <Typography component="p" variant="h4">
                    Weekdays: {clinic.weekday_opening_time} - {clinic.weekday_closing_time}
                  </Typography>
                  <Typography component="p" variant="h4"  className={classes.depositContext}>
                    Weekends: {clinic.weekend_opening_time} - {clinic.weekend_closing_time}
                  </Typography>
                  <div>
                    <Button color="primary" component={Link} to={"/main/forms/clinic/" + clinic.clinic_id}>
                        Get Form
                    </Button>
                    <Button color="primary" href="#" onClick={preventDefault}>
                        Add Form
                    </Button>
                    <Button color="primary" href="#" onClick={preventDefault}>
                        Book Appointment
                    </Button>
                  </div>
                </React.Fragment>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}