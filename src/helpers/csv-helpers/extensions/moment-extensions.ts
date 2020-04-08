import moment from "moment";

class MomentExtensions {
      getDaysOfMonth(monthDate: Date | string) {
            var daysInMonth = moment(monthDate).daysInMonth();
            var daysArray: moment.Moment[] = [];
            while (daysInMonth) {
                  var current = moment().date(daysInMonth);
                  daysArray.push(current);
                  daysInMonth--;
            }
            return daysArray;
      }
}

const momentExtensions: MomentExtensions = new MomentExtensions();

export { momentExtensions, MomentExtensions };