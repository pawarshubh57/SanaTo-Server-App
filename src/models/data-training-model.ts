import Mongoose from 'mongoose';

/**
 * This enum is used to check process type.
 * Instead of using number format, it's better to use enum.
 *
 * @enum {number}
 */
enum ProcessType {
  numericOnly = 1,
  dateOnly,
  dateTime,
  dateAndTime
};
/**
 * This is important class for training details.
 * This is used to execute proper function depending upon user provided information.
 *
 * @class TrainingDetails
 * @extends {Mongoose.Document}
 */
class TrainingDetails extends Mongoose.Document {
  public BaseField?: string;
  public DateField?: string;
  public ProcessType?: ProcessType;
  public TimeField?: string;
  public DateFormat?: string;
  public TimeFormat?: string;
  public LowerUnit?: number;
  public UpperUnit?: number;
}

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
    type: TrainingDetails,
    required: true
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

/**
 * This model is for data training purpose.
 * This is used to calculate Proportionality and Trending.
 *
 * @class DataTrainedModel
 * @extends {Mongoose.Document}
 */
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

export { DataTrainedModel, TrainingDetails, ProcessType, DataTrainedSchema };
