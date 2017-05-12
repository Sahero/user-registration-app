const mongoose = require('mongoose');
const config = require('../config/database');

const ActivitySchema = mongoose.Schema({
    userId: { type: String, required: true },
    timestamp: { type: String, required: true },
    log: { type: String, required: true },
    status: { type: String, required: true }
});

const Activity = module.exports = mongoose.model('Activity', ActivitySchema);

module.exports.getActivityByUserId = function (userId, callback) {
    const query = { userId: userId };
    Activity.findOne(query, callback).sort({ timestamp: -1 });
}

module.exports.addActivity = function (newActivity, callback) {
    newActivity.save(callback);
}

