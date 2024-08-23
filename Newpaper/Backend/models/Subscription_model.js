const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subscriptionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Subscription', subscriptionSchema);
  