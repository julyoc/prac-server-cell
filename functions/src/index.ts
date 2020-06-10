import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParder from 'body-parser';
import * as admin from 'firebase-admin';

const server = express();


admin.initializeApp({
    credential: admin.credential.cert(require('../serviceAccount.json')),
    databaseURL: "https://proc-serv-online.firebaseio.com"
});

server.use(bodyParder.json());
server.use('/api/v1', require('./routes').routes);

export const app = functions.https.onRequest(server);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
