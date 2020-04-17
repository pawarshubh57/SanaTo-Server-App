import  Mongoose from "mongoose";
import { ProcessType } from "./process-type";

/**
 * This is important class for training details.
 * This is used to execute proper function depending upon user provided information.
 *
 * @class TrainingDetails
 * @extends {Mongoose.Document}
 */
export class TrainingDetails extends Mongoose.Document {
    public BaseField?: string;
    public DateField?: string;
    public ProcessType?: ProcessType;
    public TimeField?: string;
    public DateFormat?: string;
    public TimeFormat?: string;
    public LowerUnit?: number;
    public UpperUnit?: number;
}