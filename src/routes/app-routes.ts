const homeRoutes = [['api/home/get-status', 'home#getStatus', 'get']];
const userMasterRoutes = [
  ['api/user-master/add-user', 'user-master#createUser', 'post'],
  ['api/user-master/user-login', 'user-master#userLogin', 'post'],
];
const parseCsvRoutes: string[][] = [
  ['api/parse-csv/parse', 'parse-csv#parseCsv', 'get'],
  ['api/parse-csv/upload-file', 'parse-csv#uploadFiles', 'post'],
  ['api/parse-csv/add-data-model', 'parse-csv#addDataTrainModel', 'post'],
];
var appRoutes: any[] = Array.prototype.concat(homeRoutes, parseCsvRoutes, userMasterRoutes);

module.exports = appRoutes;
