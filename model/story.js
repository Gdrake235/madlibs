var mongoose = require('mongoose');

var StorySchema = new mongoose.Schema({
  title: String,
  text: String,
  form: Array

})
var Story = mongoose.model('Story', StorySchema)
console.log(mongoose.connection.db);
module.exports = Story