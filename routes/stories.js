var express = require('express');
var router = express.Router();

var StoriesController = require('../controllers/stories')

router.get('/', StoriesController.Index);
router.get('/new', StoriesController.CreateTemplate);
router.post('/new',StoriesController.SubmitTemplate);
router.get('/:id', StoriesController.GetStory);
router.post('/:id', StoriesController.CreateStory);

module.exports = router;
