const router = require('express').Router()

const { Note, Category } = require('../models')
const  noteFinder = require('../middlewares/noteFinder')


router.get('/', async (req, res) => {
  const notes = await Note.findAll({
    include: {
      model: Category,
      through: { attributes: [] } 
    }
  }); 
  res.json(notes)
})

router.post('/', async (req, res) => {
  try {
    const note = await Note.create(req.body)
    res.json(note)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', noteFinder, async (req, res) => {
  if (req.note) {
    res.json(req.note)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', noteFinder, async (req, res) => {
  if (req.note) {
    await req.note.destroy()
  }
  res.status(204).end()
})

router.put('/:id', noteFinder, async (req, res) => {

  if (!req.note) {
    return res.status(404).end();
  }

  const updates = req.body;

  Object.keys(updates).forEach((key) => {
    if (key in req.note) {
      req.note[key] = updates[key];
    }
  });

  await req.note.save();
  res.json(req.note);

})

module.exports = router