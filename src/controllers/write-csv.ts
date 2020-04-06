import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import moment from 'moment';

const writeFile = function (request: Request, response: Response) {
  let input: { dateFormat: string, name: string } = request.body;
  var header = { 0: "RowId", 1: "Name", 3: "CardNo", 4: "ContactNo", 5: "RandomNumber", 6: "Date" };
  var filePath = path.join(__dirname, "../created-files", "sample.txt");
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  };
  let data: any[] = [];

  data.push(Object.values(header));
  let startDate = moment("2019-12-31");
  for (let cnt = 0; cnt <= 365; cnt++) {
    var randomValue = Math.floor((Math.random() * 200) + cnt);
    let row = {
      RowId: cnt,
      Name: input.name,
      CardNo: "12349875",
      ContactNo: "(123) 456-4567",
      RandomNumber: randomValue,
      Date: startDate.add(1, "d").format(input.dateFormat)
    };
    var r = Object.values(row);
    data.push(r);
  }
  let fileContent = data.join("\n");
  fs.writeFileSync(filePath, fileContent);
  response.status(200).send("Ok").end();
}

export {
  writeFile,
  appendFile
}