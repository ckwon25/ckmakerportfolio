// Key
const admin = require("firebase-admin");
const serviceAccount = require("C:\\Users\\Calvin\\Deskto\\boatmeter-fbdb-d119d-firebase-adminsdk-d7yzj-2d55bf2815.json"); 
const firebaseConfig = {
    apiKey: "AIzaSyCmMCi9NncmxgI-ZDGA_RHXLE4FWwNxoXU",
    authDomain: "boatmeter-fbdb-d119d.firebaseapp.com",
    databaseURL: "https://boatmeter-fbdb-d119d-default-rtdb.firebaseio.com/",
    projectId: "boatmeter-fbdb-d119d",
    storageBucket: "boatmeter-fbdb-d119d.appspot.com",
    messagingSenderId: "986861883435",
    appId: "1:986861883435:web:ad54866d34352dc6cada6e",
    measurementId: "G-D04XBSR53F"
};

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL
});

const messageRef = admin.database().ref("messages");

var Test = serialPortJawn();


// Access Ephemeral Port
function serialPortJawn() {
  var SerialPort = require("C:\Users\\Calvin\\Desktop\\WSFB2\\node_modules\\serialport");
  var Test = "egg";
  const port = new SerialPort('COM17', {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
  });

  // Listen for incoming data
  port.on('data', (data) => {

    messageRef.push({
      text: data.toString('utf-8'),
      timestamp: admin.database.ServerValue.TIMESTAMP
    });
  });

  // Handle errors
  port.on('error', (error) => {
    console.error('Error:', error.message);
  });
} 