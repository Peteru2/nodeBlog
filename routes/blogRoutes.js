const express = require('express')
const router = express.Router();
const blogController = require('../controller/blogController')

router.get('/', blogController.blog_index )
router.get('/create', blogController.blog_createGet)
router.post('/', blogController.blog_createPost)

router.get('/:id', blogController.blog_details)
router.delete('/:id', blogController.blog_delete)

module.exports = router;