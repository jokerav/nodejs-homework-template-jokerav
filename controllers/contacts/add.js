const { basedir } = global;
const { Contact, schemas } = require(`${basedir}/models/contactsShema`);
const { createError } = require(`${basedir}/helpers`);

const add = async (req, res) => {
  const { error } = schemas.add.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  const result = new Contact(req.body);
  await result.save();
  res.status(201).json(result);
};
module.exports = add;
