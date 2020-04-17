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

export { DataTrainedModel, DataTrainedSchema };
