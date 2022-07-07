import mongoose from "mongoose";

const toySchema = new mongoose.Schema({
    toyName: String,
    toyDescription: String,
    toyPrice: String,
    sellerName: String,
    toyImg: String,
    listedAt: {
        type: Date,
        default: new Date(),
    },
});

var toysdb = mongoose.model("toysdb", toySchema);

export default toysdb;