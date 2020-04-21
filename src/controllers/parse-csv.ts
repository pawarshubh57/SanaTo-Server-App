import { Request, Response } from 'express';
import { csvFileParsing } from '../helpers';
import { Upload } from '../utils/multer-config';
import { sanaToService } from '../base-repositories/sana-to-db-service';
import { DataTrainedModel} from '../models';
import Mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { TrainingDetails } from '../helpers/models/training-details';

const parseCsv = function (request: Request, response: Response) {
  let filePath: string = '';
  if (typeof filePath === "undefined" || filePath === "") return response.send("filePath is null or empty");
  const result: Array<any> | boolean = csvFileParsing.parseCsv(filePath, ',');
  const isParsed: boolean = typeof result === "object" ? true : result;
  response.status(200).send(isParsed).end();
};
const uploadFiles = function (request: any, response: Response) {
  Upload(request, response, function (err: Error) {
    if (err) {
      response.status(500).json({ Status: 'Error in uploading file' });
    } else {
      const uploadDetails = request.uploadDetails;
      const headers = csvFileParsing.getHeaders(uploadDetails.CompletePath, ',');
      response.status(200).json({ uploadDetails: request.uploadDetails, headers });
    }
  });
};
const addDataTrainModel = function (request: Request, response: Response) {
  var reqBody: any = request.body;
  let trainingModel: TrainingDetails = reqBody.TrainingDetails;
  var primaryKeys: Array<string> = reqBody.PrimaryKeys;
  var fileStatic: any = reqBody.FileDetails;
  // var filePath: string = fileStatic.CompletePath;
  var proportionalityField: string = reqBody.ProportionalityField;
  var csvDelimiter: string = reqBody.CsvDelimiter;

  const proportionality: string | object = ""; // csvFileParsing.getProportionality(filePath, ',', trainingModel.DateField, proportionalityField, trainingModel.DateFormat);
  const trialModel: DataTrainedModel = {
    PrimaryKeyIndicators: primaryKeys,
    CsvDelimiter: csvDelimiter,
    TrainingDetails: trainingModel,
    NumericFields: reqBody.NumericFields,
    NonNumericFields: reqBody.NonNumericFields,
    ProportionalityField: proportionalityField,
    FileStatics: fileStatic,
    Proportionality: proportionality,
  } as DataTrainedModel;

  sanaToService.DataTrainModel.addItem(trialModel)
    .then(doc => {
      response.status(200).send(doc);
    })
    .catch((err: Mongoose.Error) => {
      response.status(400).send(JSON.stringify(err));
    });
};
const calculateProportionality = function (request: Request, response: Response) {
  let id: string | ObjectId = request.query.id;
  sanaToService.DataTrainModel.findById(id)
    .then((model) => {
      let prop: {} = csvFileParsing.calculateProportionality(model);
      response.status(200).json(prop).end();
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json(err).end();
    });
};
const findProportionality = function(request: Request, response: Response){
  let id: string | ObjectId = request.query.id;
  sanaToService.DataTrainModel.findById(id)
    .then((model) => {
      let prop: {} = csvFileParsing.findProportionality(model);
      response.status(200).json(prop).end();
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json(err).end();
    });
};

export { parseCsv, uploadFiles, addDataTrainModel, calculateProportionality, findProportionality };
