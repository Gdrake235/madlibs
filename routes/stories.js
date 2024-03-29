var express = require('express');
var router = express.Router();

var StoriesController = require('../controllers/stories')

router.get('/getRandom/:number/:id', StoriesController.GetRandom);
router.get('/clear/:id', StoriesController.Clear);

router.get('/new', StoriesController.CreateTemplate);
router.post('/new',StoriesController.SubmitTemplate);
router.get('/:id/:randomWords?', StoriesController.GetStory);
router.post('/:id', StoriesController.CreateStory);
router.get('/', StoriesController.Index);

module.exports = router;
///:randomWords?*