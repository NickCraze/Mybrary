const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({   //in mongoDb or NoSql databases a schema takes a similiar form as a table in a SQL database
  name: {
    type: String,
    required: true
  }
})

authorSchema.pre('remove', function(next) {
  Book.find({ author: this.id }, (err, books) => {
    if (err) {
      next(err)
    } else if (books.length > 0) {
      next(new Error('This author has books still'))
    } else {
      next()
    }
  })
})

module.exports = mongoose.model('Author', authorSchema) //export model with name of table of database and then pass it the schema. 