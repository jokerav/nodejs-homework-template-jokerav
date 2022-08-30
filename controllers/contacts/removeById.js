const { basedir } = global;
const { Contact } = require(`${basedir}/models/contactsShema`);
const { createError } = require(`${basedir}/helpers`);

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw createError(404);
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = removeById;
