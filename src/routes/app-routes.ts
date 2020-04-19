const homeRoutes = [
  ['api/home/get-status', 'home#getStatus', 'get'],
  ['home/getStatus', 'home#getStatus', 'get']
];
// added comment to app-routes 
const userMasterRoutes = [
  ['api/user-master/add-user', 'user-master#createUser', 'post'],
];
const parseCsvRoutes: string[][] = [
  ['api/parse-csv/parse', 'parse-csv#parseCsv', 'get'],
  ['api/parse-csv/upload-file', 'parse-csv#uploadFiles', 'post'],
  ['api/parse-csv/add-data-model', 'parse-csv#addDataTrainModel', 'post'],
  ['api/parse-csv/calculate-proportionality', 'parse-csv#calculateProportionality', 'get']
];
const staticModelRoutes: string[][] = [
  ['api/static-model/add-model', 'static-model-validation#addStaticModel', 'post'],
  ['api/static-model/get-model', 'static-model-validation#getStaticModel', 'get'],
  ['api/static-model/validate-data', 'static-model-validation#validateData', 'post']
];
const writeFileRoute: string[][] = [
  ['api/write-csv/write-file', 'write-csv#writeFile', 'post'],
  ['api/write-csv/evaluate', 'write-csv#evaluatex', 'get']
]
var appRoutes: any[] = Array.prototype.concat(
  homeRoutes,
  parseCsvRoutes,
  userMasterRoutes,
  staticModelRoutes,
  writeFileRoute
);

module.exports = appRoutes;
