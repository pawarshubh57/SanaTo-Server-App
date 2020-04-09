import moment from "moment";

class MomentExtensions {
      getDaysOfMonth(startIndex: number, monthDate: Date | string, objKey: string, datesArray: any[]) {
            let momentInstance = moment(monthDate);
            var daysInMonth = momentInstance.daysInMonth();
            let month: number = momentInstance.month();
            let year: number = momentInstance.year();
            var daysArray: any[] = [];
            for (let cnt = startIndex; cnt < datesArray.length; cnt++) {
                  let momentDate = moment(datesArray[cnt][objKey]);
                  if (!(momentDate.year() === year && momentDate.month() === month)) break;
                  daysArray.push(datesArray[cnt]);
            }
            return { daysInMonth, daysArray };
      }
}

const momentExtensions: MomentExtensions = new MomentExtensions();

export { momentExtensions, MomentExtensions };