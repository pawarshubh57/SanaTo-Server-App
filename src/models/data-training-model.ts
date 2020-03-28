import Mongoose from 'mongoose';

const DataTrainedSchema: Mongoose.Schema<DataTrainedModel> = new Mongoose.Schema<DataTrainedModel>({
  PrimaryKeyIndicator: {
    type: String,
  },
  DateColumn: {
    type: String,
  },
  DateFormat: {
    type: String,
  },
  NumericFields: {
    type: [String],
  },
  NonNumericFields: {
    type: [String],
  },
  Proportionality: {
    type: String,
  },
  Trend: {
    type: String,
  },
  FileStatics: {
    type: Object,
  },
  CreatedOn: {
    type: Date,
    default: Date.now,
  },
});

class DataTrainedModel extends Mongoose.Document {
  public PrimaryKeyIndicator: string;
  public DateColumn: string;
  public DateFormat: string;
  public NumericFields: Array<string>;
  public NonNumericFields: Array<string>;
  public Proportionality: string;
  public Trend?: string;
  public FileStatics: object;
}

export { DataTrainedModel, DataTrainedSchema };
