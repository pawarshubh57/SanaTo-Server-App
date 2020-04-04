console.clear();
const globalAny: any = global;
import https from 'https';
import Express from 'express';
import { json, urlencoded } from 'body-parser';
import Cors from 'cors';
import { join, resolve } from 'path';
import { existsSync, readFileSync, mkdirSync } from 'fs';
import './database/mongoose-database-config';
import mongoDbServer from './database/mongodb-database-config';

console.log('=======================================================================');

async function mongoConnection() {
  globalAny.mongoDbConnection = await mongoDbServer();
}

Promise.resolve(mongoConnection())
  .then(() => {
    // console.log('=======================================================================');
    var App = Express();
    App.use(json({ limit: '60mb' }));
    App.use(urlencoded({ limit: '60mb', extended: true }));
<<<<<<< HEAD
    App.use(Cors());
=======
<<<<<<< HEAD
    App.use(Cors());
=======
    App.use(Cors());   
>>>>>>> 75a4d1cef70dded24918568c78addd88a0f7fe18
>>>>>>> 5439a8cd000d4eb6b50a9ec845205465ea7aa878

    var ExpressPath: any = require('express-path');
    var AppRoutes: any = require('./routes/app-routes');
    ExpressPath(App, AppRoutes);

    var uploadPath = join(__dirname, 'file-uploads');
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath);
    }
    var crtPath = resolve(__dirname, 'certificates');
    var httpsOptions = {
      cert: readFileSync(join(crtPath, 'device.crt')),
      key: readFileSync(join(crtPath, 'device.key')),
    };
    App.use(Express.static(uploadPath));
    App.get("/", function (request, response) {
      response.status(200).json({ msg: "Server app is up and running!." }).end();
    });
    var expressHttpsServer = https.createServer(httpsOptions, App);
    var portNumber = process.env.PORT || 3000;
<<<<<<< HEAD
    expressHttpsServer.listen(portNumber, function () {
=======

    App.listen(portNumber, function() {
>>>>>>> 5439a8cd000d4eb6b50a9ec845205465ea7aa878
      var address: any = this.address();
      if (!globalAny.dbConnection) {
        console.log('==========================================================================');
        console.log(`Database connection failed!!!.  `);
        console.log('==========================================================================');
      }
      console.log('=========================================================================');
      console.log(`SanaTo Server Host Application is up running on port: ${portNumber}`);
      console.log(JSON.stringify(address));
      console.log('=========================================================================');
    });
  })
  .catch(error => {
    console.log(error);
  });
/*
    expressHttpsServer.listen(portNumber, function () {
        var address: any = this.address();
        if (!globalAny.dbConnection) {
            console.log("==========================================================================");
            console.log(`Database connection failed!!!.  `);
            console.log("==========================================================================");
        }
        console.log('=========================================================================');
        console.log(`SanaTo Server Host Application is up running on port: ${portNumber}`);
        console.log(JSON.stringify(address));
        console.log('=========================================================================');
    });
}).catch((error) => {
    console.log(error);
});
*/
