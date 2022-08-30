const { basedir } = global;
const { Contact } = require(`${basedir}/models/contactsShema`);
const { createError } = require(`${basedir}/helpers`);

const getById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result = await Contact.findById(id);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = getById;
