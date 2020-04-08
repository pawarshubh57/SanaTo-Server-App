import fs from 'fs';
import path from 'path';
import { stringExtensions, momentExtensions } from '..';
import moment from 'moment';

class CsvFileParsing {
  public parseCsv = function (filePath: string, delimiter: string): boolean {
    const splitRegExp =
      new RegExp(`\\${delimiter}(?!(?<=(?:^|,)\\s*"(?:[^"]|""|\\\\")*,)(?:[^"]|""|\\\\")*"\\s*(?:,|$))`, 'ig');
    const readStream = fs.readFileSync(filePath);
    const entityName = stringExtensions.fileNameWithoutExtension(path.win32.basename(filePath));
    const descLines = readStream.toString().split('\n');
    const headers = descLines.shift().split(splitRegExp);
    let processLineCount: number = -1;
    try {
      for (const descLine of descLines) {
        // console.log("==========================================");
        // await universeUtilities.waitForMoment(300);
        ++processLineCount;
        if (typeof descLine === 'undefined' || descLine === null || descLine === '') continue;
        const splitedLines = descLine.split(splitRegExp);
        // var record: any = {};
        var count = -1;
        const csvRecord: any = {};
        csvRecord[headers[++count]] = entityName;
        for (const header of headers) {
          var shifted: string = splitedLines.shift() || '';
          const recordValue: string = shifted.replace(/\n/gi, '').trim();
          // idescRecord[headers[++count]] = recordValue;
          // OR
          csvRecord[header] = recordValue;
        }
        console.log(csvRecord);
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  public getHeaders = function (filePath: string, delimiter: string): Array<string> {
    const splitRegExp = new RegExp(`\\${delimiter}(?!(?<=(?:^|,)\\s*"(?:[^"]|""|\\\\")*,)(?:[^"]|""|\\\\")*"\\s*(?:,|$))`, 'ig');
    const readStream = fs.readFileSync(filePath);
    //const entityName = stringExtensions.fileNameWithoutExtension(path.win32.basename(filePath));
    const descLines = readStream.toString().split('\n');
    const headers: Array<string> = descLines.shift().split(splitRegExp);
    return headers;
  };

  public getProportionality = function (filePath: string, delimiter: string, dateColumn: string, propCol: string, dateFormat: string): string {
    const splitRegExp = new RegExp(`\\${delimiter}(?!(?<=(?:^|,)\\s*"(?:[^"]|""|\\\\")*,)(?:[^"]|""|\\\\")*"\\s*(?:,|$))`, 'ig');
    const readStream = fs.readFileSync(filePath);
    const descLines = readStream.toString().split('\n');
    const headers: Array<string> = descLines.shift().split(splitRegExp);
    let processLineCount: number = -1;
    const processedArray: Array<any> = [];

    try {
      for (const descLine of descLines) {
        ++processLineCount;
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
      var temp: any[] = processedArray.sort(function (a: any, b: any): any {
        let monthDays = momentExtensions.getDaysOfMonth(a[dateColumn]);
        console.log(monthDays);
        var momentA = moment(a[dateColumn], dateFormat);
        var momentB = moment(b[dateColumn], dateFormat);
        // var dateA = Date.parse(a[dateColumn]); // new Date(a[dateColumn]);
        // var dateB = Date.parse(b[dateColumn]); // new Date(b[dateColumn]);
        if (momentA > momentB) return 1;
        else return -1;
        // else if (momentA < momentB) return -1;       
        // return dateA - dateB;
      });
      // console.log(temp);
      let inc: number = 0;
      let dec: number = 0;
      for (let i = 0; i < temp.length - 1; i++) {
        var exp1 = Number.parseInt(temp[i][propCol]);
        var exp2 = Number.parseInt(temp[i + 1][propCol]);
        exp1 < exp2 ? inc++ : dec++;
      }
      var proportionality = inc > dec ? 'Directly' : 'Inversely';
      console.log('Proportionality Value: ', proportionality);
      return proportionality;
    } catch (ex) {
      console.log(ex);
    }
  };
}

const csvFileParsing: CsvFileParsing = new CsvFileParsing();

export { csvFileParsing, CsvFileParsing };
