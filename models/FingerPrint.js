const mongoose = require('mongoose');

const { Schema } = mongoose;

const FingerPrintSchema = Schema({
    _id: Schema.Types.ObjectId,
    hash: {
        type: Schema.Types.String,
        required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
    },
    userId: {
        type: Schema.Types.String,
        required: true,
    }, 
});

const FingerPrint = mongoose.model('FingerPrint', FingerPrintSchema);

module.exports = FingerPrint;
