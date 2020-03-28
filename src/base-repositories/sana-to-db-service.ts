import BaseRepository from './BaseRepository';
import '../extensions/array-extensions';
import '../extensions/string-extensions';

import {
  UserMasterSchema,
  RoleMasterSchema,
  RoleMaster,
  UserMaster,
  DataTrainedModel,
  DataTrainedSchema,
} from '../models';

import { Db, MongoClient } from 'mongodb';
import Mongoose from 'mongoose';

const globalAny: any = global;
const dbConnection: Mongoose.Connection = globalAny.dbConnection as Mongoose.Connection;
const mongoDatabase: Db = globalAny.mongoDbConnection as Db;
const mongoClient: MongoClient = globalAny.mongoDbClient as MongoClient;

class SanaToService {
  public mongoDbClient: MongoClient;
  public mongooseConnection: Mongoose.Connection = dbConnection;
  public mongoDatabase: Db;
  constructor() {
    this.mongoDbClient = mongoClient;
    this.mongooseConnection = dbConnection;
    this.mongoDatabase = mongoDatabase;
  }
  public UserMaster = new BaseRepository<UserMaster>({
    collectionName: 'UserMaster',
    schema: UserMasterSchema,
  });
  public RoleMaster = new BaseRepository<RoleMaster>({
    collectionName: 'RoleMaster',
    schema: RoleMasterSchema,
  });
  public DataTrainModel = new BaseRepository<DataTrainedModel>({
    collectionName: 'DataTrainedModel',
    schema: DataTrainedSchema,
  });
}

const sanaToService: SanaToService = new SanaToService();

export { sanaToService, SanaToService };
