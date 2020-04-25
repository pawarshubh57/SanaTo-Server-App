import { Request, Response, response } from "express";
import Mongoose from "mongoose";
const _: any = require('lodash');
import { sanaToService } from "../base-repositories/sana-to-db-service";
import { UserMaster } from '../models';
import { ObjectId } from "mongodb";

var createUser = function (request: Request, response: Response) {
    var user = request.body;
    var UserMaster = sanaToService.UserMaster.getModel();
    var newUser: any = new UserMaster(user);
    newUser.save().then((res: any) => {
        response.send(res);
    }).catch((e: Mongoose.Error) => {
        response.status(400).send(JSON.stringify(e));
    });
    /*
    newUser
        .save()
        .then(() => {
            return newUser.generateAuthToken();
        }, (err: Mongoose.Error) => {
            response.status(400).send(JSON.stringify(err));
        }).then((token: string) => {
            response.setHeader('x-auth-token', token);
            response.send(newUser.toJSON(newUser));
        }).catch((e: Mongoose.Error) => {
            response.status(400).send(JSON.stringify(e));
        });
    */
};

const userLogin = function (request: Request, response: Response) {
    var body = _.pick(request.body, ['UserName', 'Password']);
    var UserMaster: any = sanaToService.UserMaster.getModel();
    UserMaster.findByCredentials(body.UserName, body.Password)
        .then(function (user: any) {
            response.setHeader('x-auth-token', user.Tokens[0].token);
            response.status(200).send(UserMaster.toJSON(user));
        })
        .catch(function (ex: Mongoose.Error) {
            response.status(400).send(JSON.stringify(ex));
        });
};






const getUsers = function (request: Request, response: Response) {
    sanaToService.UserMaster.getAllDocuments().then(function (users: any) {
        response.status(200).send(users);
    }).catch(function (ex: Mongoose.Error) {
        response.status(400).send(JSON.stringify(ex));
    })
}

const getUser = function (request: Request, response: Response) {
    var userId: any = request.query.id;
    sanaToService.UserMaster.findById(userId).then(function (user: UserMaster) {
        response.status(200).send(user);
    }).catch(function (ex: Mongoose.Error) {
        response.status(400).send(JSON.stringify(ex));
    })
}

const updateUser = function (request: Request, response: Response) {
    var id: any = request.query.id;
    var body = request.body as UserMaster;
    sanaToService.UserMaster.findByIdAndUpdate(id, body).then(function (user: UserMaster) {
        response.status(200).send(user);
    }).catch(function (ex: Mongoose.Error) {
        response.status(400).send(JSON.stringify(ex));
    })
}


export { createUser, userLogin, getUsers, getUser, updateUser };