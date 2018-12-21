import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'
import SimpleLineChart from './SimpleLineChart'
import SimpleTable from './SimpleTable'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Drawer from '@material-ui/core/Drawer'
import _ from 'lodash'
import axios from 'axios'
import firebase from 'firebase'
import moment from 'moment'

var config = {
  apiKey: 'AIzaSyCBOlidiJcMT_pKbESrF-P5x1T9jio-oZs',
  authDomain: 'embedded-1c817.firebaseapp.com',
  databaseURL: 'https://embedded-1c817.firebaseio.com',
  projectId: 'embedded-1c817',
  storageBucket: 'embedded-1c817.appspot.com',
  messagingSenderId: '1074912203628'
}
firebase.initializeApp(config)
const db = firebase.database()
require('dotenv').config()

const drawerWidth = 300

const styles = theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    textAlign: 'center'
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1,
    marginLeft: 45
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto'
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  },
  notiItemContainer: {
    height: 65,
    fontSize: 14,
    textAlign: 'left',
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 15,
    paddingLeft: 20,
  },
  notiItemContainerGray: {
    height: 65,
    fontSize: 14,
    textAlign: 'left',
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 15,
    paddingLeft: 20,
    backgroundColor: '#cacaca'
  },
  notiContainer: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    height: '800px'
  },
  deviceNameS1: {
    color: '#82ca9d'
  },
  deviceNameS2: {
    color: '#8884d8'
  }
})

class Dashboard extends React.Component {
  state = {
    open: true,
    hour: [0, 0],
    day: [0, 0],
    week: [0, 0],
    month: [0, 0],
    all: [0, 0],
    graph_s1: [0, 0, 0, 0, 0, 0, 0],
    graph_s2: [0, 0, 0, 0, 0, 0, 0],
    isOn: true,
    lastest_added: []
  }
  async componentDidMount() {
    db.ref('s1')
      .orderByChild('timestamp')
      .limitToLast(5)
      .on('child_added', snapshot => {
        this.setState({
          lastest_added: [...this.state.lastest_added, { device: 's1', timestamp: snapshot.val().timestamp }]
        })
      })
    db.ref('s2')
      .orderByChild('timestamp')
      .limitToLast(10)
      .on('child_added', snapshot => {
        this.setState({
          lastest_added: [...this.state.lastest_added, { device: 's2', timestamp: snapshot.val().timestamp }]
        })
      })
    var { lastest_added, open, isOn, ...count } = this.state
    const now = moment()
    // Fetch All Once
    await db.ref('s1').once('value', snapshot => {
      snapshot.forEach(child => {
        if (now.diff(moment(child.val().timestamp), 'hours') <= 1) {
          count.hour[0] += 1
        }
        if (now.diff(moment(child.val().timestamp), 'days') <= 1) {
          count.day[0] += 1
          count.graph_s1[moment(child.val().timestamp).day()] += 1
        }
        if (now.diff(moment(child.val().timestamp), 'weeks') <= 1) {
          count.week[0] += 1
        }
        if (now.diff(moment(child.val().timestamp), 'months') <= 1) {
          count.month[0] += 1
        }
        count.all[0] += 1
      })
      this.setState(count)
    })
    await db.ref('s2').once('value', snapshot => {
      snapshot.forEach(child => {
        if (now.diff(moment(child.val().timestamp), 'hours') <= 1) {
          count.hour[1] += 1
        }
        if (now.diff(moment(child.val().timestamp), 'days') <= 1) {
          count.day[1] += 1
          count.graph_s2[moment(child.val().timestamp).day()] += 1
        }
        if (now.diff(moment(child.val().timestamp), 'weeks') <= 1) {
          count.week[1] += 1
        }
        if (now.diff(moment(child.val().timestamp), 'months') <= 1) {
          count.month[1] += 1
        }
        count.all[1] += 1
      })
      this.setState(count)
    })

    // Handler Change while on web
    await db
      .ref('s1')
      .endAt()
      .limitToLast(1)
      .on('child_added', snapshot => {
        if (now.diff(moment(snapshot.val().timestamp), 'hours') <= 1) {
          count.hour[0] += 1
        }
        if (now.diff(moment(snapshot.val().timestamp), 'days') <= 1) {
          count.day[0] += 1
          count.graph_s1[moment(snapshot.val().timestamp).day()] += 1
        }
        if (now.diff(moment(snapshot.val().timestamp), 'weeks') <= 1) {
          count.week[0] += 1
        }
        if (now.diff(moment(snapshot.val().timestamp), 'months') <= 1) {
          count.month[0] += 1
        }
        count.all[0] += 1
        this.setState(count)
      })
    await db
      .ref('s2')
      .endAt()
      .limitToLast(1)
      .on('child_added', snapshot => {
        if (now.diff(moment(snapshot.val().timestamp), 'hours') <= 1) {
          count.hour[1] += 1
        }
        if (now.diff(moment(snapshot.val().timestamp), 'days') <= 1) {
          count.day[1] += 1
          count.graph_s2[moment(snapshot.val().timestamp).day()] += 1
        }
        if (now.diff(moment(snapshot.val().timestamp), 'weeks') <= 1) {
          count.week[1] += 1
        }
        if (now.diff(moment(snapshot.val().timestamp), 'months') <= 1) {
          count.month[1] += 1
        }
        count.all[1] += 1
        this.setState(count)
      })
  }
  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }
  toggleOnOff = async e => {
    if (this.state.isOn) {
      await axios.get('http://localhost:3003/turnoff')
      this.setState({ isOn: !this.state.isOn })
    } else {
      await axios.get('http://localhost:3003/turnon')
      this.setState({ isOn: !this.state.isOn })
    }
  }
  render() {
    const { classes } = this.props
    const notilist = _.slice(
      _.sortBy(this.state.lastest_added, [
        o => {
          return -o.timestamp
        }
      ]),
      0,
      15
    )
    // console.log(this.state)
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Little Feet Dashboard
            </Typography>
            <FormControlLabel
              control={<Switch value="checkedB" color="secondary" disableTouchRipple disableRipple />}
              onChange={this.toggleOnOff}
              label="On/Off"
            />
            <IconButton
              color="inherit"
              onClick={() => {
                this.setState({ open: !this.state.open })
              }}
            >
              <NotificationsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            Graph Last 7 Days
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <SimpleLineChart data={this.state} />
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">
            Statistic
          </Typography>
          <div className={classes.tableContainer}>
            <SimpleTable data={this.state} />
          </div>
        </main>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper
          }}
          hidden={!this.state.open}
        >
          <h1>Watcher</h1>
          <div className={classes.notiContainer}>
            {notilist.map((obj, idx) => (
              <div className={idx%2==0 ? classes.notiItemContainerGray : classes.notiItemContainer} key={idx}>
                <div className="notiDevice">
                  {`Something went through : `}
                  <span className={obj.device == 's1' ? classes.deviceNameS1 : classes.deviceNameS2}>
                    <b>{obj.device.toUpperCase()}</b>
                  </span>
                </div>
                <div className="notiTime">{`Time : ${moment(obj.timestamp).format('MM/DD/YYYY HH:MM')}`}</div>
              </div>
            ))}
          </div>
        </Drawer>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard)
