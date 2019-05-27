const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Feedback
let Feedback = new Schema({
    fd_name: {
        type: String,
        default: ''
    },
    fd_email: {
        type: String,
        default: ''
    },
    fd_subject: {
        type: String,
        default: ''
    },
    fd_message: {
        type: String,
        default: ''
    },
    is_deleted: {
        type: String,
        default: 'N'
    }
}, {
    collection: 'feedback'
});

module.exports = mongoose.model('feedback', Feedback);