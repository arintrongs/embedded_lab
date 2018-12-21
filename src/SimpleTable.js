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
    const result = []
    for (let i = 0; i < 2; i++) {
      result.push(
        <TableRow key={i}>
          <TableCell component="th" scope="row">
            {name[i]}
          </TableCell>
          <TableCell align="right">{this.props.data.hour[i]}</TableCell>
          <TableCell align="right">{this.props.data.day[i]}</TableCell>
          <TableCell align="right">{this.props.data.week[i]}</TableCell>
          <TableCell align="right">{this.props.data.month[i]}</TableCell>
          <TableCell align="right">{this.props.data.all[i]}</TableCell>
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
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object
}

export default withStyles(styles)(SimpleTable)
