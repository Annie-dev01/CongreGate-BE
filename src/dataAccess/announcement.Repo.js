const Announcement = require('../models/announcement.model');

const createAnnouncement = async (data) => {
  return await new Announcement(data);
};

const saveAnnouncement = async (announcementInstance) => {
  return await announcementInstance.save();
};

const getAll = async (query = () => {}) => {
  const data = await Announcement.find(query).populate(
    'createdBy',
    'firstName lastName'
  );
  return data;
};

module.exports = Object.freeze({
  createAnnouncement,
  saveAnnouncement,
  getAll,
});
