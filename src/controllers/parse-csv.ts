import { Request, Response } from 'express';
import { csvFileParsing } from '../helpers';

const parseCsv = function(request: Request, response: Response) {
  const isParsed: boolean = csvFileParsing
  .parseCsv('D:\\Flo-Kapture-Mean-Stack-Projects\\Flo-Kapture-NodeJs-TypeScript-App\\dist\\ExtractedProjects\\CCSES-20180829\\I-Descriptors\\AC.FLE.csv', ',');
  
  response.status(200).send(isParsed).end();
};

export { parseCsv };
