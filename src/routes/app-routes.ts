const homeRoutes = [['api/home/get-status', 'home#getStatus', 'get']];
const userMasterRoutes = [
  ['api/user-master/add-user', 'user-master#createUser', 'post'],
  ['api/user-master/user-login', 'user-master#userLogin', 'post'],
];
const parseCsvRoutes: string[][] = [['api/parse-csv/parse', 'parse-csv#parseCsv', 'get']];
var appRoutes: any[] = Array.prototype.concat(homeRoutes, parseCsvRoutes, userMasterRoutes);

module.exports = appRoutes;
