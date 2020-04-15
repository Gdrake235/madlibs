var express = require('express');
var router = express.Router();

var StoriesController = require('../controllers/stories')

router.get('/', StoriesController.Index);
/* router.post('/', PostsController.Create);
router.get('/new', PostsController.New); */

module.exports = router;
