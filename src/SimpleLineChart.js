import React from 'react'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'
import LineChart from 'recharts/lib/chart/LineChart'
import Line from 'recharts/lib/cartesian/Line'
import XAxis from 'recharts/lib/cartesian/XAxis'
import YAxis from 'recharts/lib/cartesian/YAxis'
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid'
import Tooltip from 'recharts/lib/component/Tooltip'
import Legend from 'recharts/lib/component/Legend'

const data = [
  { name: 'Mon', S1: 2200, S2: 3400 },
  { name: 'Tue', S1: 1280, S2: 2398 },
  { name: 'Wed', S1: 5000, S2: 4300 },
  { name: 'Thu', S1: 4780, S2: 2908 },
  { name: 'Fri', S1: 5890, S2: 4800 },
  { name: 'Sat', S1: 4390, S2: 3800 },
  { name: 'Sun', S1: 4490, S2: 4300 }
]
class SimpleLineChart extends React.Component {
  componentDidMount(){
    
  }
  render() {
    return (
      // 99% per https://github.com/recharts/recharts/issues/172
      <ResponsiveContainer width="99%" height={320}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="S1" stroke="#82ca9d" />
          <Line type="monotone" dataKey="S2" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    )
  }
}

export default SimpleLineChart
