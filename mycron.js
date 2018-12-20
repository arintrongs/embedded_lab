const firebase = require('firebase')
const axios = require('axios')
var config = {
  apiKey: 'AIzaSyCBOlidiJcMT_pKbESrF-P5x1T9jio-oZs',
  authDomain: 'embedded-1c817.firebaseapp.com',
  databaseURL: 'https://embedded-1c817.firebaseio.com',
  projectId: 'embedded-1c817',
  storageBucket: 'embedded-1c817.appspot.com',
  messagingSenderId: '1074912203628'
}
firebase.initializeApp(config)

const fetchData = async () => {
  // const axHour = createAxios('1hour')
  // const axDay = createAxios('1day')
  // const axWeek = createAxios('1week')
  // const axMonth = createAxios('1month')
  const axAll = createAxios('10years')

  // const { data: hour } = await axHour.get()
  // const { data: day } = await axDay.get()
  // const { data: week } = await axWeek.get()
  // const { data: month } = await axMonth.get()
  const { data: all } = await axAll.get()
  return {
    // hour,
    // day,
    // week,
    // month,
    all
  }
}

const createAxios = since => {
  return axios.create({
    baseURL: `https://api.netpie.io/feed/SensorFeed2?apikey=206yNynJBZoNlxDsmalgProGfW0MNzPf&granularity=1second&since=${since}`,
    timeout: 10000
  })
}

const fetchToFirebase = async () => {
  const result = await fetchData()
  const name = ['S1', 'S2']
  const all = result.all.data.map(arr => arr.values.reduce((acc, [timestamp, value]) => acc + parseInt(value), 0))
  console.log(result,all)
  // const hour = result.hour.map(arr => arr.values.reduce((acc, [timestamp, value]) => acc + parseInt(value), 0))
  // const day = result.day.map(arr => arr.values.reduce((acc, [timestamp, value]) => acc + parseInt(value), 0))
  // const week = result.week.map(arr => arr.values.reduce((acc, [timestamp, value]) => acc + parseInt(value), 0))
  // const month = result.month.map(arr => arr.values.reduce((acc, [timestamp, value]) => acc + parseInt(value), 0))
  firebase.database().ref('embedded').set({
    all
  })
}
fetchToFirebase()
