import Mongoose from 'mongoose';

const DataTrainedSchema: Mongoose.Schema<DataTrainedModel> = new Mongoose.Schema<DataTrainedModel>({
  PrimaryKeyIndicators: {
    type: [String]
  },
  CsvDelimiter: {
    type: String,
    default: ",",
    required: false
  },
  TrainingDetails: {
    type: new Mongoose.Schema<TrainingDetails>({
      BaseField: { type: String },
      DateField: { type: String },
      ProcessType: { type: String },
      TimeField: { type: String },
      DateFormat: { type: String },
      TimeFormat: { type: String },
    })
  },
  NumericFields: {
    type: [String]
  },
  NonNumericFields: {
    type: [String]
  },
  Proportionality: {
    type: String
  },
  Trending: {
    type: String
  },
  ProportionalityColumn: {
    type: String
  },
  FileStatics: {
    type: {
      FileName: { type: String },
      UploadPath: { type: String },
      CompletePath: { type: String }
    }
  },
  CreatedOn: {
    type: Date,
    default: Date.now
  },
});

class TrainingDetails extends Mongoose.Document {
  public BaseField?: string;
  public DateField?: string;
  public ProcessType?: string;
  public TimeField?: string;
  public DateFormat?: string;
  public TimeFormat?: string;
}
class DataTrainedModel extends Mongoose.Document {
  public PrimaryKeyIndicators: Array<string>;
  public CsvDelimiter: string;
  public TrainingDetails: TrainingDetails;
  public NumericFields: Array<string>;
  public NonNumericFields: Array<string>;
  public Proportionality: string;
  public ProportionalityField: string;
  public Trending?: string;
  public FileStatics: {
    FileName: string,
    UploadPath: string,
    CompletePath: string
  };
}

export { DataTrainedModel, TrainingDetails, DataTrainedSchema };
