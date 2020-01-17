import Rebase from 're-base' //allows us to mirror react state to firebase
import firebase from 'firebase'//google backend service for apps
//got this from firebase project overview app settings
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDqjVplVRXZtWbXmAhIpCmBh_3__ayVmpw",
    authDomain: "catch-of-the-day-f804a.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-f804a.firebaseio.com"
  })
const base = Rebase.createClass(firebaseApp.database())
export {firebaseApp}
export default base
