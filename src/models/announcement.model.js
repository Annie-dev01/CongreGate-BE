const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
    {
        title: {
            type: String
        },
        description: {
            type: String
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },

},
{ timestamps: true}
)

module.exports = mongoose.model('Announcement', announcementSchema);