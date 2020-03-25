const homeRoutes = [
    ["api/home/get-status", "home#getStatus", "get"]
];
const userMasterRoutes = [
    ["api/user-master/add-user", "user-master#createUser", "post"],
    ["api/user-master/user-login", "user-master#userLogin", "post"]
];
var appRoutes: any[] = Array.prototype.concat(
    homeRoutes,
    userMasterRoutes
);

module.exports = appRoutes;