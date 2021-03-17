const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
    name: { type: String, require: false, unique: false },
    phone: { type: String, required: false },
    number: { type:String, required: false },
    address: { type: String, required: false },
    note: { type: String, required: false },
    checked:{type:Boolean,default:false},
    product :{type:String,require:false}
});

module.exports = mongoose.model("Bill", billSchema);