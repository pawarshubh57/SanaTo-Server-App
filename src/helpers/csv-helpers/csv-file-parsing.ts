import fs from 'fs';
import path from 'path';
import { stringExtensions } from '..';

class CsvFileParsing {
  public parseCsv = function(filePath: string, delimiter: string): boolean {
    const splitRegExp = new RegExp(
      `\\${delimiter}(?!(?<=(?:^|,)\\s*"(?:[^"]|""|\\\\")*,)(?:[^"]|""|\\\\")*"\\s*(?:,|$))`,
      'ig'
    );
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
  public getHeaders = function(filePath: string, delimiter: string): Array<string> {
    const splitRegExp = new RegExp(
      `\\${delimiter}(?!(?<=(?:^|,)\\s*"(?:[^"]|""|\\\\")*,)(?:[^"]|""|\\\\")*"\\s*(?:,|$))`,
      'ig'
    );
    const readStream = fs.readFileSync(filePath);
    //const entityName = stringExtensions.fileNameWithoutExtension(path.win32.basename(filePath));
    const descLines = readStream.toString().split('\n');
    const headers = descLines.shift().split(splitRegExp);
    return headers;
  };
}

const csvFileParsing: CsvFileParsing = new CsvFileParsing();

export { csvFileParsing, CsvFileParsing };
