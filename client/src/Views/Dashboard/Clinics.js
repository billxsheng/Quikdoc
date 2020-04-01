import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Components/Title';

const drawerWidth = 240;

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
  appointmentRow: {
    backgroundColor: '#ededed'
  }
}));

export default function Clinics() {
  const classes = useStyles();
  const [walkInClinics, setWalkInClinics] = useState([]);
  const [appointmentClinics, setAppointmentClinics] = useState([]);
  const [isSortedByRating, setIsSortedByRating] = useState(false);
  const [isSortedByProximity, setIsSortedByProximity] = useState(false);
  const [isSortedByWaitTime, setIsSortedByWaitTime] = useState(false);


  const onSortByRating = () => {
    setIsSortedByRating(true)
    setIsSortedByProximity(false)
    setIsSortedByWaitTime(false)
  }

  const onSortByProximity = () => {
    setIsSortedByProximity(true)
    setIsSortedByRating(false)
    setIsSortedByWaitTime(false)
  }

  const onSortByWaitTime = () => {
    setIsSortedByWaitTime(true)
    setIsSortedByProximity(false)
    setIsSortedByRating(false)
  }

  function List() {
    if(isSortedByRating) {
      return (
        <React.Fragment>
          {walkInClinics.sort((a, b) => {
            return parseFloat(b.clinic_rating) - parseFloat(a.clinic_rating)
          }).map((row) => {
            return (
            <TableRow key={row.name}>
              <TableCell>{row.clinic_name}</TableCell>
              <TableCell>{row.clinic_rating}</TableCell>
              <TableCell>Walk-in Clinic</TableCell>
              <TableCell>{row.avg_wait_time + " Hours"}</TableCell>
              <TableCell>{row.clinic_address}</TableCell>
              <TableCell>{Math.floor(Math.random() * 9 + 1)}</TableCell>
              <TableCell><Button component={Link} to={'/main/clinics/' + row.clinic_id}>More Info</Button></TableCell>
            </TableRow>
            )
          })}
          {
            appointmentClinics.sort((a,b) => {
              return parseFloat(b.clinic_rating) - parseFloat(a.clinic_rating)
            }).map((row) => {
              return (
            <TableRow className={classes.appointmentRow} key={row.name}>
              <TableCell>{row.clinic_name}</TableCell>
              <TableCell>{row.clinic_rating}</TableCell>
              <TableCell>Appointment Clinic</TableCell>
              <TableCell>{row.avg_wait_days + " Days"}</TableCell>
              <TableCell>{row.clinic_address}</TableCell>
              <TableCell>{Math.floor(Math.random() * 9 + 1)}</TableCell>
              <TableCell><Button component={Link} to={'/main/clinics/' + row.clinic_id}>More Info</Button></TableCell>
            </TableRow>
              )
            })
          }
        </React.Fragment>
      )
    } else if (isSortedByProximity) {
      return (
        <React.Fragment>
          {walkInClinics.sort((a, b) => {
            return parseFloat(b.avg_wait_time) - parseFloat(a.avg_wait_time)
          }).map((row) => {
            return (
            <TableRow key={row.name}>
              <TableCell>{row.clinic_name}</TableCell>
              <TableCell>{row.clinic_rating}</TableCell>
              <TableCell>Walk-in Clinic</TableCell>
              <TableCell>{row.avg_wait_time + " Hours"}</TableCell>
              <TableCell>{row.clinic_address}</TableCell>
              <TableCell>{Math.floor(Math.random() * 9 + 1)}</TableCell>
              <TableCell><Button component={Link} to={'/main/clinics/' + row.clinic_id}>More Info</Button></TableCell>
            </TableRow>
            )
          })}
          {
            appointmentClinics.sort((a,b) => {
              return parseFloat(b.avg_wait_days) - parseFloat(a.avg_wait_days)
            }).map((row) => {
              return (
            <TableRow className={classes.appointmentRow} key={row.name}>
              <TableCell>{row.clinic_name}</TableCell>
              <TableCell>{row.clinic_rating}</TableCell>
              <TableCell>Appointment Clinic</TableCell>
              <TableCell>{row.avg_wait_days + " Days"}</TableCell>
              <TableCell>{row.clinic_address}</TableCell>
              <TableCell>{Math.floor(Math.random() * 9 + 1)}</TableCell>
              <TableCell><Button component={Link} to={'/main/clinics/' + row.clinic_id}>More Info</Button></TableCell>
            </TableRow>
              )
            })
          }
        </React.Fragment>
      )
    } else if(isSortedByWaitTime) {
      return (
        <React.Fragment>
          {walkInClinics.sort((a, b) => {
            return parseFloat(b.avg_wait_time) - parseFloat(a.avg_wait_time)
          }).map((row) => {
            return (
            <TableRow key={row.name}>
              <TableCell>{row.clinic_name}</TableCell>
              <TableCell>{row.clinic_rating}</TableCell>
              <TableCell>Walk-in Clinic</TableCell>
              <TableCell>{row.avg_wait_time + " Hours"}</TableCell>
              <TableCell>{row.clinic_address}</TableCell>
              <TableCell>{Math.floor(Math.random() * 9 + 1)}</TableCell>
              <TableCell><Button component={Link} to={'/main/clinics/' + row.clinic_id}>More Info</Button></TableCell>
            </TableRow>
            )
          })}
          {
            appointmentClinics.sort((a,b) => {
              return parseFloat(b.avg_wait_days) - parseFloat(a.avg_wait_days)
            }).map((row) => {
              return (
            <TableRow className={classes.appointmentRow} key={row.name}>
              <TableCell>{row.clinic_name}</TableCell>
              <TableCell>{row.clinic_rating}</TableCell>
              <TableCell>Appointment Clinic</TableCell>
              <TableCell>{row.avg_wait_days + " Days"}</TableCell>
              <TableCell>{row.clinic_address}</TableCell>
              <TableCell>{Math.floor(Math.random() * 9 + 1)}</TableCell>
              <TableCell><Button component={Link} to={'/main/clinics/' + row.clinic_id}>More Info</Button></TableCell>
            </TableRow>
              )
            })
          }
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          {walkInClinics.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.clinic_name}</TableCell>
              <TableCell>{row.clinic_rating}</TableCell>
              <TableCell>Walk-in Clinic</TableCell>
              <TableCell>{row.avg_wait_time + " Hours"}</TableCell>
              <TableCell>{row.clinic_address}</TableCell>
              <TableCell>{Math.floor(Math.random() * 9 + 1)}</TableCell>
              <TableCell><Button component={Link} to={'/main/clinics/' + row.clinic_id}>More Info</Button></TableCell>
            </TableRow>
          ))}
          {appointmentClinics.map((row) => (
            <TableRow className={classes.appointmentRow} key={row.name}>
              <TableCell>{row.clinic_name}</TableCell>
              <TableCell>{row.clinic_rating}</TableCell>
              <TableCell>Appointment Clinic</TableCell>
              <TableCell>{row.avg_wait_days + " Days"}</TableCell>
              <TableCell>{row.clinic_address}</TableCell>
              <TableCell>{Math.floor(Math.random() * 9 + 1)}</TableCell>
              <TableCell><Button component={Link} to={'/main/clinics/' + row.clinic_id}>More Info</Button></TableCell>
            </TableRow>
          ))}
        </React.Fragment>
      )
        
    }
  }

  React.useEffect(() => {
    axios.get('http://localhost:8080/api/appointment_clinics').then((clinics) => {
      setAppointmentClinics(clinics.data);
    })
    axios.get('http://localhost:8080/api/walkin_clinics').then((clinics) => {
      setWalkInClinics(clinics.data);
    })
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <React.Fragment>
                  <Title>Clinics</Title>
                  <div className={classes.seeMore}>
                    <Button color="primary" onClick={onSortByRating}>
                      Sort by rating
                    </Button>
                    <Button color="primary" onClick={onSortByProximity}>
                      Sort by proximity
                    </Button>
                    <Button color="primary" onClick={onSortByWaitTime}>
                      Sort by wait time
                    </Button>
                  </div>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Rating (/5)</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Wait Time</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Distance (km)</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <List/>
                    </TableBody>
                  </Table>
                </React.Fragment>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}