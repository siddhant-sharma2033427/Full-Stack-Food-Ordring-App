import mongoose from "mongoose";
const foodModel = new mongoose.Schema({
    name:{type:String},
    price:{type:Number},
    img_path:{type:String},
    description:{type:String},
    resto_id:{type:mongoose.Schema.Types.ObjectId},
})
export const foodSchema = mongoose.models.foods || mongoose.model("foods",foodModel);