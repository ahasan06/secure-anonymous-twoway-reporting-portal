import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

    sender:{
        type: String,
        enum: ['user', 'admin'],
        required: true
    },
    content:{
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now 
    }

})

// Define the schema for the report
const reportSchema = new mongoose.Schema({
    anonymousCode: {
        type: String,
        required: true,
        unique: true 
      },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    messages: [messageSchema],
    status :{
        type : String,
        enum:['open','closed','in-progress','completed'],
        default:'open'
    },
    lastUpdated: {
        type: Date,
        default: Date.now // Tracks when the report was last updated
      }

})

reportSchema.pre('save', function (next) {
    this.lastUpdated = Date.now();
    next();
});

// Export the report model
const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);

export default Report;