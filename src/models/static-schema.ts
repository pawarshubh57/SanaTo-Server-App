import Mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const StaticValidationSchema: Mongoose.Schema<StaticValidationModel> = new Mongoose.Schema<
  StaticValidationModel
>({
  Columns: {
    type: [String],
    required: true,
  },
  DateField: {
    type: [
      new Mongoose.Schema<DateField>({
        format: {
          type: String,
          required: true,
          trim: true,
        },
        dateColumn: {
          type: String,
          required: true,
          trim: true,
        },
      }),
    ],
    required: true,
  },
  OtherFields: {
    type: [
      new Mongoose.Schema<OtherFields>({
        fieldName: { type: String, required: true, trim: true },
        type: { type: String, required: true, trim: true, enum: ['String', 'Number'] },
        maxValue: { type: Number, required: false, default: 0 },
        minValue: { type: Number, required: false, default: 0 },
        formula: { type: String, trim: true, required: false, default: null },
        canBeNull: { type: Boolean, required: true },
        minLength: { type: Number, required: false, default: 0 },
        maxLength: { type: Number, required: false, default: 0 },
      }),
    ],
    required: true,
  },
  PrimaryKeyFields: {
    type: [Object],
    required: true,
  },
  ModelId: {
    type: ObjectId,
    auto: true,
  },
  CreatedOn: {
    type: Date,
    default: Date.now,
  },
  CreatedBy: {
    type: ObjectId,
    required: false,
    default: null,
  },
});

class StaticValidationModel extends Mongoose.Document {
  public Columns: Array<string>;
  public DateField: Array<DateField>;
  public OtherFields: Array<OtherFields>;
  public PrimaryKeyFields: Array<object>;
  public ModelId: ObjectId;
  public CreatedOn?: Date;
  public CreatedBy?: string | ObjectId;
}

class DateField {
  public dateColumn: string;
  public format: string;
}

class OtherFields {
  public fieldName: string;
  public type: string;
  public maxValue?: number;
  public minValue?: number;
  public formula?: string;
  public canBeNull: boolean;
  public minLength?: number;
  public maxLength?: number;
}

class ErrorField {
  public column: string;
  public value: string | number | Date;
  public msg: string;
  public error?: any;
}
export { StaticValidationModel, StaticValidationSchema, DateField, OtherFields, ErrorField };