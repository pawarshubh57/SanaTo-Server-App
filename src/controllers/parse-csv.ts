import { Request, Response } from 'express';
import { csvFileParsing } from '../helpers';
import { Upload } from '../utils/multer-config';

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
  var reqBody = request.body;
  console.log('reqBody:', reqBody);
  response.status(200).send();
};

export { parseCsv, uploadFiles, addDataTrainModel };
