import Contact from '../db/models/contact.js';

export const getAllContacts = async () => {
  return await Contact.find({});
};
