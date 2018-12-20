const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const firebase = require('firebase')

const MicroGear = require('microgear')
const microgear = MicroGear.create({
  key: "gCXI5fhwcoI10Ib",
  secret: "Yzer4RmRJcIxz5d3iV5KUDHXz",
  alias : "Backend"         /*  optional  */
})
microgear.connect("KevinNodeMCU")

var config = {
  apiKey: 'AIzaSyCBOlidiJcMT_pKbESrF-P5x1T9jio-oZs',
  authDomain: 'embedded-1c817.firebaseapp.com',
  databaseURL: 'https://embedded-1c817.firebaseio.com',
  projectId: 'embedded-1c817',
  storageBucket: 'embedded-1c817.appspot.com',
  messagingSenderId: '1074912203628'
}
firebase.initializeApp(config)

// Setting Endpoint (Middleware)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Microgear
microgear.on('message', (topic, msg)=>{
  const data = msg.toString('utf8')
  if(data == 's1'){
    firebase.database().ref('s1').push({
      timestamp : Date.now()
    })
    console.log('s1')
  }else if(data == 's2'){
    firebase.database().ref('s2').push({
      timestamp : Date.now()
    })
    console.log('s2')
  }
})

// Endpoints
app.get('/turnon', async (req, res) => {
  microgear.chat("NodeMCU","on");
  res.send('Success On')
})
app.get('/turnoff', async (req, res) => {
  microgear.chat("NodeMCU","off");
  res.send('Success Off')
})



module.exports = app
