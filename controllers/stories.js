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
      if (err) {throw err}
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
  },
  CreateTemplate: function(req, res) {
    res.render('stories/new')
  },

  SubmitTemplate: function(req, res) {
    var story = new Story();
    story.title = req.body.title;
    story.text = req.body.content;
    story.form = createForm(req.body.content);

    story.save(function(err) {
      if (err) { throw err; }
      res.status(201).redirect('/stories');
  })
 }
};

function createEndStory(inputs, template){
  inputs = Object.values(inputs);
  inputs.map(input => template = template.replace(/\[.*?\]/, input));
  return template
}
function createForm(text){
  const pattern = /(?<=\[).+?(?=\])/gi;
  return text.match(pattern)
}

module.exports = StoriesController;
