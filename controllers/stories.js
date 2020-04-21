var Story = require("../model/story");
var http = require("http");
var https = require("https");
var url = "https://random-word-api.herokuapp.com/word?";

var StoriesController = {
  Index: function(req, res) {
    Story.find().sort({title: 1 }).exec(function(err, stories) {
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
 }, 
 GetRandom: function(req, res) {
   url += `number=${req.params.number}`;
   console.log(url)
   var request = https.get(url, function(res){
    if (res.statusCode === 200) {
      console.log(res.body)
    };
    res.send()
   });
   request.on('error', function(e) {
    console.log('ERROR: ' + e.message);
   });
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
