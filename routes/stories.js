var express = require('express');
var router = express.Router();

var StoriesController = require('../controllers/stories')

router.get('/', StoriesController.Index);
router.get('/:id', StoriesController.GetStory);
router.post('/:id', StoriesController.CreateStory);

module.exports = router;
