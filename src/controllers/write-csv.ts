import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import { momentExtensions } from '../helpers';
var evaluate: any = require("evaluatex");

const writeFile = function (request: Request, response: Response) {
  let input: { dateFormat: string, name: string } = request.body;
  var header = { 0: "RowId", 1: "Name", 3: "CardNo", 4: "ContactNo", 5: "RandomNumber", 6: "Date", 7: "Time" };
  var filePath = path.join(__dirname, "../created-files", "sample.txt");
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  };  
  let data: any[] = [];
  data.push(Object.values(header));
  let startDate = new Date("01/01/2019")
  let endDate = new Date("12/31/2019");
  for (let cnt = 0; cnt <= 1499; cnt++) {
    var randomValue = Math.floor((Math.random() * 200) + cnt);
    var dateTime = momentExtensions.randomDateBetweenWithTime({ startDate, endDate });
    let momentInstance = moment(dateTime);
    let row = {
      RowId: (cnt + 1),
      Name: input.name,
      CardNo: "12349875",
      ContactNo: "(123) 456-4567",
      RandomNumber: randomValue,
      Date: momentInstance.format(input.dateFormat),
      Time: momentInstance.format("hh:mm:ss A"),// "hh:mm:ss A"
    };
    var r = Object.values(row);
    data.push(r);
  }
  let fileContent = data.join("\n");
  fs.writeFileSync(filePath, fileContent);
  response.status(200).send("Ok").end();
}

const evaluatex = function (request: Request, response: Response) {
  const formula = "\\frac{\\sqrt{b^2-4(a)(c)}}{2a}";
  var variables = { a: 2, b: 4, c: 0 };
  var fun: Function = evaluate(formula, { latex: true });
  var result: any = fun(variables);
  console.log(result);
  response.status(200).json({ fun, result }).end();
};

export {
  writeFile, evaluatex
}