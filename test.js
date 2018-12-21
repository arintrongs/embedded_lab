const firebase = require('firebase')
var config = {
  apiKey: 'AIzaSyCBOlidiJcMT_pKbESrF-P5x1T9jio-oZs',
  authDomain: 'embedded-1c817.firebaseapp.com',
  databaseURL: 'https://embedded-1c817.firebaseio.com',
  projectId: 'embedded-1c817',
  storageBucket: 'embedded-1c817.appspot.com',
  messagingSenderId: '1074912203628'
}
firebase.initializeApp(config)
firebase
  .database()
  .ref('s1')
  .push({
    timestamp: Date.now()
  })
