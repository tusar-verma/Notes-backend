const { Note, Category } = require('../models')


const noteFinder = async (req, res, next) => {
  const id = Number(req.params.id);

  if (Number.isInteger(id)) {
    req.note = await Note.findByPk(id, {
    include: {
      model: Category,
      through: { attributes: [] }
    }
  });
  }

  next();
};

module.exports = noteFinder