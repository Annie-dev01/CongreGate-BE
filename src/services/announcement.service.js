const announcementRepo = require('../dataAccess/announcement.Repo');
const { buildResponse, buildFailedResponse } = require('../utils/responses');

const createAnnouncement = async (payload) => {
    try {
        const announcementInstance = await announcementRepo.createAnnouncement(payload);
        const savedAnnouncement = await announcementRepo.saveAnnouncement(announcementInstance);

        if(savedAnnouncement){
            return buildFailedResponse({
                message: "Announcement already exists!"
            })
        };

        return buildResponse({
            message: "Announcement added successfully",
            data: savedAnnouncement
        })
    } catch (error) {
        throw new Error(`${error.message}`);
    }
};

const getAll = async ( query = {}) => {
    try {
        const announcements = await announcementRepo.getAll(query);

        if(!announcements){
            return buildFailedResponse({message:"No announcements found!"})
        }
        return buildResponse({
            message: "Announcemnts fetched",
            data: announcements
        })
    } catch (error) {
     throw new Error(`${error.message}`);   
    }
};

module.exports = Object.freeze({
    createAnnouncement,
    getAll
});