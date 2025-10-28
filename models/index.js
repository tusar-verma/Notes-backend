const Note = require('./note')
const Category = require('./categorie')

Note.belongsToMany(Category, { through: 'note_categories', foreignKey: 'note_id', otherKey: 'category_id' }) 
Category.belongsToMany(Note, { through: 'note_categories', foreignKey: 'category_id', otherKey: 'note_id' })

module.exports = {
  Note, Category
}