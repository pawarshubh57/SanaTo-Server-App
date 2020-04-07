import { sanaToService } from '../../base-repositories/sana-to-db-service';
import { DateField, OtherFields, ErrorField } from '../../models';
import moment from 'moment';
import isEmail from 'validator';
import validator from 'validator';

class ModelValidation {
  public validateObj = async function (body: any): Promise<Array<ErrorField>> {
    let errors: Array<ErrorField> = [];
    const primaryKeyFields: Array<string> = body.PrimaryKeyFields;
    const data: any = body.Data as any;
    const keys = Object.keys(data);
    const filter: object = {
      PrimaryKeyFields: { $all: primaryKeyFields },
      $and: [{ Columns: { $all: keys } }, { Columns: { $size: keys.length } }],
    };
    const model = await sanaToService.StaticModel.getItem(filter);
    if (model === null) return [];
    const dates: Array<DateField> = model.DateField;
    const others: Array<OtherFields> = model.OtherFields;

    try {
      for (let d in data) {
        dates.find((v: DateField) => {
          if (v.dateColumn === d) {
            var date: Date = data[d];
            // var testDate = moment(date);
            // var mDate = moment(date, v.format, true);
            // var rtt = mDate.isValid();
            // console.log(rtt);
            var isValidDate = moment.parseZone(date, v.format, true).isValid();

            if (!isValidDate) {
              errors.push({
                column: v.dateColumn,
                value: date,
                msg: `${v.dateColumn}  must be in format ${v.format}`,
              });
            }
          }
        });
        others.find((o: OtherFields) => {
          if (o.fieldName === d) {
            if (o.type === 'string') {
              var value: string = data[d];
              var type = 'string';
              this.checkNull(value, o, errors);
              this.checkType(value, o, type, errors);
              this.checkLength(value, o, errors);
              o.isEmail ? this.checkEmail(value, o, errors) : [];
            } else if (o.type === 'number') {
              var val1 = data[d];
              var val = Number.parseInt(data[d]);
              if (val1 === null) {
                this.checkNull(val1, o, errors);
              } else if (isNaN(val)) {
                this.checkNanValue(val, o, errors);
              } else {
                this.checkMinMaxValue(val, o, errors);
              }
            }
          }
        });
      }
      return errors;
    } catch (error) {
      console.log();
      return errors;
    }
  };
  public checkEmail = function (value: string, o: OtherFields, errors: Array<ErrorField>){
    // var test = validator.isEmail(value);
    var testRegex = new RegExp(o.regex);
    var isEmailCheck = testRegex.test(value);
    if (isEmailCheck) return errors;
   return errors.push({
      column: o.fieldName,
      value: value,
      msg: `${o.fieldName} is not valid`,
      error: null
    });
  };
  public checkLength = function (value: string, o: OtherFields, errors: Array<ErrorField>) {
    var lengthCheck =
      (o.maxLength === 0 && o.minLength === 0) ||
        (value.length <= o.maxLength && value.length >= o.minLength)
        ? true
        : false;
    if (lengthCheck) return errors;
    return errors.push({
      column: o.fieldName,
      value: value,
      msg: `Length of ${o.fieldName} must be between ${o.maxLength} and ${o.minLength}`,
    });
  };
  public checkNull = function (value: string | number, o: OtherFields, errors: Array<ErrorField>) {
    var nullCheck = (value === null) === o.canBeNull ? true : false;
    if (nullCheck) return errors;
    return errors.push({
      column: o.fieldName,
      value: value,
      msg: `${o.fieldName} can not null`,
    });
  };
  public checkType = function (value: string, o: OtherFields, type: any, errors: Array<ErrorField>) {
    var typeCheck = typeof value === type ? true : false;
    if (typeCheck) return errors;
    return errors.push({
      column: o.fieldName,
      value: value,
      msg: `${o.fieldName} is not of type ${o.type}`,
    });
  };
  public checkNanValue = function (value: any, o: OtherFields, errors: Array<ErrorField>) {
    if (isNaN(value)) {
      return errors.push({
        column: o.fieldName,
        value: value,
        msg: `${o.fieldName} must be Number`,
      });
    }
  };
  public checkMinMaxValue = function (value: number, o: OtherFields, errors: Array<ErrorField>) {
    var valueCheck =
      (o.minValue === 0 && o.maxValue === 0) || (value <= o.maxValue && value >= o.minValue)
        ? true
        : false;
    if (valueCheck) return errors;
    return errors.push({
      column: o.fieldName,
      value: value,
      msg: `Value must be between ${o.minValue} and ${o.maxValue}`,
    });
  };
}

const modelValidation: ModelValidation = new ModelValidation();
export { modelValidation, ModelValidation };
