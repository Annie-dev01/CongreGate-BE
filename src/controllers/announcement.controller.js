const announcementServices = require("../services/announcement.service");

const createAnnouncement = async (req, res) =>{
    try {
        req.body.createdBy = req.user._id;
        const data = await announcementServices.createAnnouncement(req.body);
        return res.status(data.statusCode).json(data);
    } catch (error) {
        return res.status(500).json({
            message: 'Announcement could not be created. Please try again!',
            status: 'failure'
        });
    }
};

const getAllAnnouncements = async (req, res)=> {
    try {
        const data = await announcementServices.getAll(req.query);
        return res.status(data.statusCode).json(data);
    } catch (error) {
        return res.status(500).json({
            message: "Error in getting all announcements",
            status: 'failure'
        })
    };
};

module.exports = Object.freeze({
    createAnnouncement,
    getAllAnnouncements
})