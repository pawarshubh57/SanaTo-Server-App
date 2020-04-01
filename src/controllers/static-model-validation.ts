import { Request, Response } from 'express';
import { sanaToService } from '../base-repositories/sana-to-db-service';
import Mongoose from 'mongoose';
import { StaticValidationModel } from '../models';
import { modelValidation } from '../helpers/static-helper/model-validation';

const addStaticModel = function(request: Request, response: Response) {
  const reqBody = request.body as StaticValidationModel;
  sanaToService.StaticModel.addItem(reqBody)
    .then(res => {
      response.status(200).send(res);
    })
    .catch((err: Mongoose.Error) => {
      response.status(400).json(err.message);
    });
};

const getStaticModel = function(request: Request, response: Response) {
  sanaToService.StaticModel.getAllDocuments()
    .then(docs => {
      response.status(200).send(docs);
    })
    .catch((err: Mongoose.Error) => {
      response.status(400).json(err.message);
    });
};

const validateData = async function(request: Request, response: Response) {
  const reqBody = request.body;
  const result = await modelValidation.validateObj(reqBody);
  response.status(200).send(result);
};
export { addStaticModel, getStaticModel, validateData };
