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
const staticModelRoutes: string[][] = [
  ['api/static-model/add-model', 'static-model-validation#addStaticModel', 'post'],
  ['api/static-model/get-model', 'static-model-validation#getStaticModel', 'get'],
  ['api/static-model/validate-data', 'static-model-validation#validateData', 'post'],
];
const writeFileRoute : string[][] = [
   ['api/write-csv/append-file', 'write-csv#appendFile', 'get'],
   ['api/write-csv/write-file', 'write-csv#writeFile', 'post']
]
var appRoutes: any[] = Array.prototype.concat(
  homeRoutes,
  parseCsvRoutes,
  userMasterRoutes,
  staticModelRoutes,
  writeFileRoute
);

module.exports = appRoutes;
