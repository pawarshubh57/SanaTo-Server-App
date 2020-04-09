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
      };
      randomDateWithTime() {
            return new Date(Math.random() * new Date().getTime())
      };
      randomDateBetweenWithTime(startDate: Date, endDate: Date) {
            let start: Date = startDate || new Date();
            let end: Date = endDate || new Date();
            let diff = end.getTime() - start.getTime();
            return new Date(Math.random() * diff + start.getTime());
      };
}

const momentExtensions: MomentExtensions = new MomentExtensions();

export { momentExtensions, MomentExtensions };