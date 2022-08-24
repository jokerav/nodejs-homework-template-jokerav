const { Contact, schemas } = require("../models/contactsShema");
const { createError } = require("../helpers");

const updateById = async (req, res) => {
  const { error } = schemas.put.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateById;
