
import { Request, Response } from 'express';
import Mongoose from 'mongoose';
import fs from 'fs';
import { join, resolve } from 'path';
import path from 'path';
import moment from 'moment';


const writeFile  = function (request: Request, response: Response) {
      var data = "Name, CardNo, ContactNo, RandomNumber, DateFormat";
    var filePath =  path.join(__dirname, "../created-files", "sample.txt"); 
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
      }
   var result =  fs.writeFileSync(filePath, data);
   console.log(result);
  response.send(result);
  }

  const appendFile = function(request: Request, response: Response){
    var data = "''Id', 'Name', 'CardNo', 'ContactNo', 'RandomNumber', 'DateFormat' ";
    var filePath =  path.join(__dirname, "../created-files"); // , "sample.txt"); 
    
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
      }
    var fileNewPath = path.join(filePath, "sample.txt");
    fs.writeFileSync(fileNewPath, data);


      // StartDate = moment(StartDate).format('MM-YYYY');
      // var body = request.body;
      var body = {
        "Id" : "0",
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
         console.log( "Block statement execution no." + i )
         var randomValue = Math.floor((Math.random() * 200) + i);
         body["RandomNumber"]= randomValue;
         body["Id"] = i.toString();
         const d = new Date('2019-04-14');

         const cDate = addDays(d, i);
         console.log(cDate)
         
         var formattedDate = moment(cDate).format("dd/MM/yyyy");
         body["DateFormat"] = formattedDate;  
         var newLine = Object.values(body);
        
         var nLine = "'" + newLine.join("','") + "'";
          fs.appendFileSync(fileNewPath, '\n'+ nLine);

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

const createLine = function (data : any){
  console.log(data);
}


export {
    writeFile,
    appendFile
}
