import { Request, Response } from 'express';
import { csvFileParsing } from '../helpers';
import { Upload } from '../utils/multer-config';
import { sanaToService } from '../base-repositories/sana-to-db-service';
import { DataTrainedModel } from '../models';
import Mongoose from 'mongoose';

const parseCsv = function(request: Request, response: Response) {
  const isParsed: boolean = csvFileParsing.parseCsv('E:\\csv files\\CN.FLE.csv', ',');

  response
    .status(200)
    .send(isParsed)
    .end();
};

const uploadFiles = function(request: any, response: Response) {
  Upload(request, response, function(err: Error) {
    if (err) {
      response.status(500).json({ Status: 'Error in uploading file' });
    } else {
      const uploadDetails = request.uploadDetails;
      const Headers = csvFileParsing.getHeaders(uploadDetails.CompletePath, ',');
      // console.log(Headers);
      response.status(200).json({ uploadDetails: request.uploadDetails, headers: Headers });
    }
  });
};

const addDataTrainModel = function(request: Request, response: Response) {
  var reqBody = request.body; // as DataTrainedModel;
  var dateColumn: string = reqBody.DateColumn;
  // var numericFields: Array<string> = reqBody.NumericFields;
  //var nonNumericFields = reqBody.NonNumericFields;
  var primaryKeys: Array<string> = reqBody.PrimaryKeys;
  var primaryKeyIndicator = primaryKeys.join('-');
  var fileStatic: any = reqBody.FileDetails;
  var filePath = fileStatic.CompletePath;
  var temp = reqBody.ProportionalityColumn;

  const proportionality: string = csvFileParsing.getProportionality(
    filePath,
    ',',
    dateColumn,
    temp
  );
  const trianModel: DataTrainedModel = {
    PrimaryKeyIndicator: primaryKeyIndicator,
    DateColumn: dateColumn,
    NumericFields: reqBody.NumericFields,
    NonNumericFields: reqBody.NonNumericFields,
    DateFormat: reqBody.DateFormat,
    FileStatics: fileStatic,
    Proportionality: proportionality,
  } as DataTrainedModel;
  
  sanaToService.DataTrainModel.addItem(trianModel)
    .then(doc => {
      response.status(200).send(doc);
    })
    .catch((err: Mongoose.Error) => {
      response.status(400).send(JSON.stringify(err));
    });
};

export { parseCsv, uploadFiles, addDataTrainModel };
