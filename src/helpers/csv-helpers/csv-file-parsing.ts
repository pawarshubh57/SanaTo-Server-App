import fs from 'fs';
import { momentExtensions } from '..';
import moment from 'moment';
var _: any = require('lodash');
import { DataTrainedModel, DateField } from '../../models';

class CsvFileParsing {
  public parseCsv = function (filePath: string, delimiter: string): Array<any> | boolean {
    const splitRegExp = new RegExp(`\\${delimiter}(?!(?<=(?:^|,)\\s*"(?:[^"]|""|\\\\")*,)(?:[^"]|""|\\\\")*"\\s*(?:,|$))`, 'ig');
    if (!fs.existsSync(filePath)) return false;
    const readStream = fs.readFileSync(filePath);
    const descLines = readStream.toString().split('\n');
    const headers: Array<string> = descLines.shift().split(splitRegExp);
    const processedArray: Array<any> = [];
    try {
      for (const descLine of descLines) {
        if (typeof descLine === 'undefined' || descLine === null || descLine === '') continue;
        const splitedLines = descLine.split(splitRegExp);
        const csvRecord: any = {};
        for (const header of headers) {
          var shifted: string = splitedLines.shift() || '';
          const recordValue: string = shifted.replace(/\n/gi, '').trim();
          let trimmedHeader: string = header.trim();
          csvRecord[trimmedHeader] = recordValue;
        }
        processedArray.push(csvRecord);
      }
      return processedArray;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  public getHeaders = function (filePath: string, delimiter: string): Array<string> {
    const splitRegExp = new RegExp(`\\${delimiter}(?!(?<=(?:^|,)\\s*"(?:[^"]|""|\\\\")*,)(?:[^"]|""|\\\\")*"\\s*(?:,|$))`, 'ig');
    const readStream = fs.readFileSync(filePath);
    // const entityName = stringExtensions.fileNameWithoutExtension(path.win32.basename(filePath));
    const descLines = readStream.toString().split('\n');
    const headers: Array<string> = descLines.shift().split(splitRegExp);
    return headers;
  };

  public getProportionality = function (filePath: string, delimiter: string, dateColumn: string, propCol: string, dateFormat: string): string | object {
    const processedArray: Array<any> | boolean = this.parseCsv(filePath, delimiter);
    if (typeof processedArray === "boolean") return { msg: "Unable to parse provided csv", filePath };

    try {
      var temp: any[] = processedArray.sort(function (a: any, b: any): any {
        var momentA = moment(a[dateColumn], dateFormat);
        var momentB = moment(b[dateColumn], dateFormat);
        var dateA = Date.parse(a[dateColumn]); // new Date(a[dateColumn]);
        var dateB = Date.parse(b[dateColumn]); // new Date(b[dateColumn]);
        if (momentA > momentB) return 1;
        else if (momentA < momentB) return -1;
        return dateA - dateB;
      });
      let inc: number = 0;
      let dec: number = 0;
      for (let i = 0; i < temp.length - 1; i++) {
        var exp1 = Number.parseInt(temp[i][propCol]);
        var exp2 = Number.parseInt(temp[i + 1][propCol]);
        exp1 < exp2 ? inc++ : dec++;
      }
      var proportionality = inc > dec ? 'Directly' : 'Inversely';
      return proportionality;
    } catch (ex) {
      console.log(ex);
    }
  };
  /**
   * This function can be used when arguments Date and Time format is known.
   *
   * @memberof CsvFileParsing
   */
  public calculateProportionality = function (dataArray: any[], dateTimeField: string, dateTimeFormat: string, proportionalityField: string): {} {
    try {
      // const dataArray: Array<any> | boolean = this.parseCsv(dataTrainedModel.FileStatics.CompletePath, dataTrainedModel.CsvDelimiter);
      // if (typeof dataArray === "boolean") return { msg: "Unable to process provided csv file", fileDetails: dataTrainedModel.FileStatics };

      let processedArray: any[] = dataArray.sort(function (a: any, b: any): any {
        var momentA = moment(a[dateTimeField], a[dateTimeFormat] || "");
        var momentB = moment(b[dateTimeField], a[dateTimeFormat] || "");
        if (momentA > momentB) return 1;
        return -1;
      });

      let trendInc: number = 0;
      let trendDesc: number = 0;

      let inc: number = 0;
      let dec: number = 0;
      for (let cnt = 0; cnt < processedArray.length; cnt++) {
        let element: any = processedArray[cnt];
        let date: string = element[dateTimeField];
        let monthDays: { daysInMonth: number, daysArray: any[] } =
          momentExtensions.daysOfMonth(cnt, date, dateTimeField, processedArray);
        cnt += (monthDays.daysArray.length) - 1;
        let monthTrendInc: number = 0;
        let monthTrendDesc: number = 0;
        for (let i = 0; i < monthDays.daysArray.length - 1; i++) {
          var exp1 = Number.parseInt(monthDays.daysArray[i][proportionalityField]);
          var exp2 = Number.parseInt(monthDays.daysArray[i + 1][proportionalityField]);
          exp1 < exp2 ? inc++ : dec++;
          exp1 < exp2 ? monthTrendInc++ : monthTrendDesc++;
        }
        monthTrendInc > monthTrendDesc ? trendInc++ : trendDesc++;
      }
      var proportionality = inc > dec ? 'Directly' : 'Inversely';
      let overAllTrending: string = trendInc > trendDesc ? "Directly" : "Inversely";

      return { proportionality, overAllTrending };
    } catch (ex) {
      console.log(ex);
      return { ex };
    }
  };

  /**
   * This function is to calculate Proportionality and Trending.
   * This function can be used when model has TrainingDetails object attached.
   * 
   * Other function is: @alias calculateProportionality
   *
   * @param {DataTrainedModel} dataTrainedModel
   */
  public findProportionality = function (dataTrainedModel: DataTrainedModel) {
    const dataArray: Array<any> | boolean = this.parseCsv(dataTrainedModel.FileStatics.CompletePath, dataTrainedModel.CsvDelimiter);
    if (typeof dataArray === "boolean") return { msg: "Unable to process provided csv file", fileDetails: dataTrainedModel.FileStatics };

    let processType = dataTrainedModel.TrainingDetails.ProcessType;

    if (processType === "numericOnly") {
      let numericLimits: { baseField: string, lowerLimit: number, upperLimit: number } = {
        baseField: dataTrainedModel.TrainingDetails.BaseField,
        lowerLimit: dataTrainedModel.TrainingDetails.LowerUnit,
        upperLimit: dataTrainedModel.TrainingDetails.UpperUnit
      };
      // If this is the case, then we need to use other function in which date and time field is not used.
      // lowerLimit will be used as number of records can be used as 1 month records.
      // upperLimit will be used as total records needs to use.
      // slots will be like: var slots = upperLimit / lowerLimit. Generally, slots should be 12 (12 months records).
      let processedArray: any[] = dataArray.sort((a: any, b: any): any => {
        let valA: number = a[numericLimits.baseField];
        let valB: number = b[numericLimits.baseField];
        return valA > valB;
      });
      let trendInc: number = 0;
      let trendDesc: number = 0;
      let inc: number = 0;
      let dec: number = 0;
      let slot = Math.round(numericLimits.upperLimit / numericLimits.lowerLimit);
      for (let cnt = 0; cnt < processedArray.length; cnt++) {
        // let element: any = processedArray[cnt];
        let slots: any = processedArray.slice(cnt, (cnt + slot));
        cnt += slots.length - 1;
        let monthTrendInc: number = 0;
        let monthTrendDesc: number = 0;
        for (let i = 0; i < slots.length - 1; i++) {
          var exp1 = Number.parseInt(slots[i][dataTrainedModel.ProportionalityField]);
          var exp2 = Number.parseInt(slots[i + 1][dataTrainedModel.ProportionalityField]);
          exp1 < exp2 ? inc++ : dec++;
          exp1 < exp2 ? monthTrendInc++ : monthTrendDesc++;
        }
        monthTrendInc > monthTrendDesc ? trendInc++ : trendDesc++;
        if (cnt >= numericLimits.upperLimit) break;
      }
      var proportionality = inc > dec ? 'Directly' : 'Inversely';
      let overAllTrending: string = trendInc > trendDesc ? "Directly" : "Inversely";

      return { proportionality, overAllTrending };
    }
    // This is sample commented line after switching git branch...
    // branch name: yogeshs 
    // Shubhangi will start on following conditions...    
    let args = {
      delimiter: dataTrainedModel.CsvDelimiter,
      baseField: dataTrainedModel.TrainingDetails.BaseField,
      dateFormat: dataTrainedModel.TrainingDetails.DateFormat,
      timeFormat: dataTrainedModel.TrainingDetails.TimeFormat,
      dateField: dataTrainedModel.TrainingDetails.DateField,
      timeField: dataTrainedModel.TrainingDetails.TimeField
    };
    if (processType === "dateTime") {
      let proportionality: any = this.calculateProportionality(dataArray, args.dateField, args.dateFormat, dataTrainedModel.ProportionalityField);
      return proportionality;
    }
    if (processType === "dateOnly") {
      let proportionality: any = this.calculateProportionality(dataArray, args.dateField, args.dateFormat, dataTrainedModel.ProportionalityField);
      return proportionality;
    }
    if (processType === "dateAndTime") {
      const dateCustomField: string = "dateTime-customField";
      const dateCustomFormat: string = "dateTime-customFormat";
      dataArray.forEach(function (da: any) {
        let dateTime: string = da[args.dateField].trim() + " " + da[args.timeField].trim();
        let dateTimeFormat: string = args.dateFormat.trim().concat(" ", args.timeFormat).trim();
        da[dateCustomField] = dateTime;
        da[dateCustomFormat] = dateTimeFormat;
      });
      let proportionality: any = this.calculateProportionality(dataArray, dateCustomField, dateCustomFormat, dataTrainedModel.ProportionalityField);
      return proportionality;
    }
    return "Ok";
  };
};

const csvFileParsing: CsvFileParsing = new CsvFileParsing();

export { csvFileParsing, CsvFileParsing };
