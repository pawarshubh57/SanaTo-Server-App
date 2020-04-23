import Mongoose from 'mongoose';
import { TrainingDetails } from '../helpers/models/training-details';

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
      BaseField: { type: String, required: false },
      DateField: { type: String, required: false },
      ProcessType: { type: String, required: false },
      TimeField: { type: String, required: false },
      DateFormat: { type: String, required: false },
      TimeFormat: { type: String, required: false },
      LowerUnit: { type: String, required: false },
      UpperUnit: { type: String, required: false }
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
  ProportionalityField: {
    type: String,
    required: true
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

export { DataTrainedModel, DataTrainedSchema };
