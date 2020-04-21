var Story = require("../model/story");
var request = require('request');

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
      if (req.params.randomWords) {
        randomWords = req.params.randomWords.slice(1, -1)
                                            .split(',') 
                                            .map(str => str = str.slice(1, -1));
        res.render('stories/story', {
          story: story, 
          randomWords: randomWords
        });
      }
      else { res.render('stories/story', { story : story}); }
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
   var url = "https://random-word-api.herokuapp.com/word?";
   url += `number=${req.params.number}`;
   request.get(url, function(error, response, body) {
    console.log(`Response from the api: ${body}`);
    res.status(200).redirect(`/stories/${req.params.id}/${body}`);
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
