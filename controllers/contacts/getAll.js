const { basedir } = global;
const { Contact } = require(`${basedir}/models/contactsShema`);

const getAll = async (req, res) => {
  const result = await Contact.find({});
  res.json(result);
};

module.exports = getAll;
