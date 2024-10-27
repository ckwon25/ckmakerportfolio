const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with service acc key
const serviceAccount = require("C:\\Users\\Calvin\\Desktop\\WSFB2\\boatmeter3-firebase-adminsdk-b11dp-d637db9d66.json");

// Initialize app with the service acc key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Get a reference to the Firestore database
const db = admin.firestore();

// Function to update a specific field within a document
async function updateFirestoreDocument(collectionName, documentId, fieldName, newValue) {
  try {
    const docRef = db.collection(collectionName).doc(documentId);
    await docRef.update({
      [fieldName]: newValue
    });
    console.log('Document successfully updated!');
  } catch (error) {
    console.error('Error updating document:', error);
  }
}

function delayedUpdate(inc, fieldName) {
  return new Promise(resolve => {
    const updateNext = async () => {
      if (inc <= 275) {
        await updateFirestoreDocument('variablecollection', 'ETNeMWPeAVtSBOwVxoHJ', fieldName, inc);
        inc += 5;
        setTimeout(updateNext, 1500); // Timeout for the next update
      } else {
        resolve();
      }
    };
    updateNext();
  });
}

async function updateVariables() {
  await Promise.all([
    delayedUpdate(0, 'row1variable'),
    delayedUpdate(15, 'row2variable'),
    delayedUpdate(25, 'row3variable'),
    delayedUpdate(35, 'row4variable'),
    delayedUpdate(45, 'row5variable'),
    delayedUpdate(55, 'row6variable')
  ]);
}

updateVariables();