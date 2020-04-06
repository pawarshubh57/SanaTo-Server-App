
import { Request, Response } from 'express';
import Mongoose from 'mongoose';
import fs from 'fs';
import { join, resolve } from 'path';
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

const appendFile = function (request: Request, response: Response) {
  var data = "''Id', 'Name', 'CardNo', 'ContactNo', 'RandomNumber', 'DateFormat' ";
  var filePath = path.join(__dirname, "../created-files"); // , "sample.txt"); 

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
  var fileNewPath = path.join(filePath, "sample.txt");
  fs.writeFileSync(fileNewPath, data);


  // StartDate = moment(StartDate).format('MM-YYYY');
  // var body = request.body;
  var body = {
    "Id": "0",
    "Name": "Yogesh Sonawane",
    "CardNo": "111111",
    "ContactNo": "(123) 456–7890",
    "RandomNumber": 450,
    "DateFormat": "2020-04-06 11:12:40"
  }

  var date = body["DateFormat"];
  var formattedDate = moment(date).format("YYYY-MM-DD") //('MM-DD-YYYY');
  console.log(formattedDate);
  body["DateFormat"] = formattedDate;

  let i: number = 1;

  while (i < 60) {
    console.log("Block statement execution no." + i)
    var randomValue = Math.floor((Math.random() * 200) + i);
    body["RandomNumber"] = randomValue;
    body["Id"] = i.toString();
    const d = new Date('2019-04-14');

    const cDate = addDays(d, i);
    console.log(cDate)

    var formattedDate = moment(cDate).format("dd/MM/yyyy");
    body["DateFormat"] = formattedDate;
    var newLine = Object.values(body);

    var nLine = "'" + newLine.join("','") + "'";
    fs.appendFileSync(fileNewPath, '\n' + nLine);

    /*
    fs.appendFile(fileNewPath,'\n'+ nLine, function(err){
       if(err) console.log(err);
       else console.log("Ok");
   });
   */
    i++;
  }

}

function addDays(date: any, days: any) {
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  return copy
}

const createLine = function (data: any) {
  console.log(data);
}


export {
  writeFile,
  appendFile
}
