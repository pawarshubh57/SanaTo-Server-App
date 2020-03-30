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
        Format: {
          type: String,
          required: true,
          trim: true,
        },
        DateColumn: {
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
        FieldName: { type: String, required: true, trim: true },
        Type: { type: String, required: true, trim: true, enum: ['String', 'Number'] },
        MaxValue: { type: Number, required: false, default: 0 },
        MinValue: { type: Number, required: false, default: 0 },
        Formula: { type: String, trim: true, required: false, default: null },
        CanBeNull: { type: Boolean, required: true },
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
  public DateColumn: string;
  public Format: string;
}

class OtherFields {
  public FieldName: string;
  public Type: string;
  public MaxValue?: number;
  public MinValue?: number;
  public Formula?: string;
  public CanBeNull: boolean;
}

export { StaticValidationModel, StaticValidationSchema };
