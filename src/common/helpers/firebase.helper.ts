import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

let firebaseApp: admin.app.App | null = null;

const serviceAccountPath = path.resolve(process.cwd(), 'fvv-mobile-firebase-adminsdk-fbsvc-6bd822dcce.json');

if (fs.existsSync(serviceAccountPath)) {
  try {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(require(serviceAccountPath)),
    });
    // Optionally, you can log success
    // console.log('Firebase Admin initialized');
  } catch (err) {
    console.warn('Firebase Admin initialization failed:', err);
    firebaseApp = null;
  }
} else {
  console.warn('Firebase Admin credentials file not found, Firebase features will be disabled.');
}

export { firebaseApp, admin };
