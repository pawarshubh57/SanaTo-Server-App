import { sanaToService } from '../../base-repositories/sana-to-db-service';
import { DateField, OtherFields, ErrorField } from '../../models';
import moment from 'moment';
import isEmail from 'validator';
import validator from 'validator';

class ModelValidation {
  public validateObj = async function (body: any): Promise<Array<ErrorField>> {
    const errors: Array<ErrorField> = [];
    const primaryKeyFields: Array<string> = body.PrimaryKeyFields;
    const data: any = body.Data as any;
    const keys = Object.keys(data);
    const filter: object = {
      PrimaryKeyFields: { $all: primaryKeyFields },
      $and: [{ Columns: { $all: keys } }, { Columns: { $size: keys.length } }],
    };
    const model = await sanaToService.StaticModel.getItem(filter);
    console.log(model);
    const dates: Array<DateField> = model.DateField;
    const others: Array<OtherFields> = model.OtherFields;

    try {
      for (let d in data) {
        dates.find((v: DateField) => {
          if (v.dateColumn === d) {
            console.log('Date Field', v);
            var date: Date = data[d];
            // var test = isDate(data[d]);
            // check format of Date
            // changes done...
            // var isValidDate = moment('02/12/2020', v.format, true).isValid();
            console.log('isValidDate and format ', isValidDate);
            // check format of Date
            var testDate = moment(date);
            // var testFormat = moment.utc().format(v.format);
            var mDate = moment(date, v.format, true);
            var rtt = mDate.isValid();
            console.log(rtt);
            var isValidDate = moment.parseZone(testDate, v.format, true).isValid();

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
            if (o.type === 'String') {
              var value: string = data[d];
              var type = 'string';
              this.errors = this.checkNull(value, o, errors);
              this.errors = this.checkType(value, o, errors, type);
              this.errors = this.checkLength(value, o, errors);
              this.errors = o.isEmail ? this.checkEmail(value, o, errors) : [];
            } else if (o.type === 'Number') {
              var type = 'number';

              try {
                var val: number = Number.parseInt(data[d]);
                // if (NaN)
                // this.errors=this.checkType(val,o,errors,type);
                var typeCheck = typeof val === 'number' ? true : false;
                if (!typeCheck) {
                  errors.push({
                    column: o.fieldName,
                    value: val,
                    msg: `${val} is not of type ${o.type}`,
                  });
                }
              } catch (error) {
                errors.push({
                  column: o.fieldName,
                  value: val,
                  msg: `${val} is not of type ${o.type}`,
                  error,
                });
              }

              var valueCheck =
                (o.minValue === 0 && o.maxValue === 0) || (val <= o.maxValue && val >= o.minValue)
                  ? true
                  : false;
              if (!valueCheck) {
                var val: number = Number.parseInt(data[d]);
                if (isNaN(val)) {
                  errors.push({
                    column: o.fieldName,
                    value: data[d],
                    msg: `${o.fieldName} must be Number`,
                  });
                } else {
                  var typeCheck = typeof val === 'number' ? true : false;
                  if (!typeCheck) {
                    errors.push({
                      column: o.fieldName,
                      value: val,
                      msg: `${val} is not of type ${o.type}`,
                    });
                  }
                  var valueCheck =
                    (o.minValue === 0 && o.maxValue === 0) ||
                      (val <= o.maxValue && val >= o.minValue)
                      ? true
                      : false;
                  if (!valueCheck) {
                    errors.push({
                      column: o.fieldName,
                      value: val,
                      msg: `Value must be between ${o.minValue} and ${o.maxValue}`,
                    });
                  }
                }
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
  public checkEmail = function (value: string, o: OtherFields, errors: Array<ErrorField>): Array<ErrorField> {
    var test = validator.isEmail(value);
    this.errors = errors;
    var testRegex = new RegExp(o.regex);
    var isEmailCheck = testRegex.test(value);
    if (!isEmailCheck) {
      this.errors.push({
        column: o.fieldName,
        value: value,
        msg: `${o.fieldName} is not valid`,
      });
    }
    return this.errors;
  };
  public checkLength = function (value: string, o: OtherFields, errors: Array<ErrorField>) {
    this.errors = errors;
    var lengthCheck =
      (o.maxLength === 0 && o.minLength === 0) ||
        (value.length <= o.maxLength && value.length >= o.minLength)
        ? true
        : false;
    if (!lengthCheck) {
      this.errors.push({
        column: o.fieldName,
        value: value,
        msg: `Length of ${o.fieldName} must be between ${o.maxLength} and ${o.minLength}`,
      });
    }
    return this.errors;
  };
  public checkNull = function (value: string | number, o: OtherFields, errors: Array<ErrorField>): Array<ErrorField> {
    var nullCheck = (value === null) === o.canBeNull ? true : false;
    if (nullCheck) return errors;
    return this.errors.push({
      column: o.fieldName,
      value: value,
      msg: `${o.fieldName} can not null`,
    });
  };
  public checkType = function (value: string, o: OtherFields, errors: Array<ErrorField>, type: any): Array<ErrorField> {
    var typeCheck = typeof value === type ? true : false;
    if (typeCheck) return errors;
    return this.errors.push({
      column: o.fieldName,
      value: value,
      msg: `${o.fieldName} is not of type ${o.type}`,
    });
  };
}

const modelValidation: ModelValidation = new ModelValidation();
export { modelValidation, ModelValidation };
