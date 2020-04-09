import Mongoose from 'mongoose';

const DataTrainedSchema: Mongoose.Schema<DataTrainedModel> = new Mongoose.Schema<DataTrainedModel>({
  PrimaryKeyIndicator: {
    type: [String],
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
  Trending: {
    type: String,
  },
  ProportionalityColumn: {
    type: String
  },
  FileStatics: {
    type: {
      FileName: { type: String },
      UploadPath: { type: String },
      CompletePath: { type: String }
    },
  },
  CreatedOn: {
    type: Date,
    default: Date.now,
  },
});

class DataTrainedModel extends Mongoose.Document {
  public PrimaryKeyIndicator: Array<string>;
  public DateColumn: string;
  public DateFormat: string;
  public NumericFields: Array<string>;
  public NonNumericFields: Array<string>;
  public Proportionality: string;
  public ProportionalityColumn: string;
  public Trending?: string;
  public FileStatics: {
    FileName: string,
    UploadPath: string,
    CompletePath: string
  };
}

export { DataTrainedModel, DataTrainedSchema };
