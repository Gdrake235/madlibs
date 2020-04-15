var Story = require("../model/story")

var StoriesController = {
  Index: function(req, res) {
    Story.find().exec(function(err,stories) {
    if (err) {throw err;}
    console.log(stories)
    res.render('stories/index', {stories: stories})
    })
  }
};

module.exports = StoriesController;