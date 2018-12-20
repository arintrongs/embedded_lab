import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
}

class SimpleTable extends React.Component {
  mapPropsToData = () => {
    const name = ['S1', 'S2']
    const all = this.props.data.all.map(arr => arr.values.reduce((acc, [timestamp, value]) => acc + parseInt(value), 0))
    const hour = this.props.data.hour.map(arr => arr.values.reduce((acc, [timestamp, value]) => acc + parseInt(value), 0))
    const day = this.props.data.day.map(arr => arr.values.reduce((acc, [timestamp, value]) => acc + parseInt(value), 0))
    const week = this.props.data.week.map(arr => arr.values.reduce((acc, [timestamp, value]) => acc + parseInt(value), 0))
    const month = this.props.data.month.map(arr => arr.values.reduce((acc, [timestamp, value]) => acc + parseInt(value), 0))
    const result = []
    for (let i = 0; i < 2; i++) {
      result.push(
        <TableRow key={i}>
          <TableCell component="th" scope="row">
            {name[i]}
          </TableCell>
          <TableCell align="right">{hour[i] || 0}</TableCell>
          <TableCell align="right">{day[i] || 0}</TableCell>
          <TableCell align="right">{week[i] || 0}</TableCell>
          <TableCell align="right">{month[i] || 0}</TableCell>
          <TableCell align="right">{all[i] || 0}</TableCell>
        </TableRow>
      )
    }
    return result
  }
  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Device Name</TableCell>
              <TableCell align="right">Last Hour</TableCell>
              <TableCell align="right">Today</TableCell>
              <TableCell align="right">Week</TableCell>
              <TableCell align="right">Month</TableCell>
              <TableCell align="right">All</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.mapPropsToData()}
            {/* {data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell component="th" scope="row">
                    {n.name}
                  </TableCell>
                  <TableCell align="right">{n.calories}</TableCell>
                  <TableCell align="right">{n.fat}</TableCell>
                  <TableCell align="right">{n.carbs}</TableCell>
                  <TableCell align="right">{n.protein}</TableCell>
                  <TableCell align="right">{n.protein}</TableCell>
                </TableRow>
              )
            })} */}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleTable)
