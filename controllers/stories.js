var Story = require("../model/story");

var StoriesController = {
  Index: function(req, res) { 
    Story.find().exec(function(err,stories) {
    if (err) {throw err;}
    res.render('stories/index', {stories: stories})
    })
  }, 
  GetStory: function(req, res) {
    Story.findById(req.params.id, function(err, story){
      if (err) {throw err};
      res.render('stories/story', { story : story});
    })
  }, 
  CreateStory: function(req, res) {
    Story.findById(req.params.id, function(err, story) {
      if (err) {throw err};
      story.endStory = createEndStory(req.body, story.text); 
      story.save(); 
      res.render("stories/endStory", { story: story });
    }); 
  }
};

function createEndStory(inputs, template){
  inputs = Object.values(inputs);
  inputs.map(input => template = template.replace(/\[.*?\]/, input)); 
  return template
}

module.exports = StoriesController;