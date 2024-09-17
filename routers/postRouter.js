const { Router } = require('express')
const { getPost, createPost, updatePost, deletePost, getPosts, dispayPostPage, displayPostUpdatePage } = require('../controllers/postContoller')
const auth = require('../middleware/auth')

const postRouter = Router()

postRouter.get('/posts/:id', auth, getPost)
postRouter.post('/posts', auth, createPost)
postRouter.put('/posts/:id', auth, updatePost)
postRouter.delete('/posts/:id', auth, deletePost)

// templates
postRouter.get('/posts', auth, getPosts)
postRouter.get('/create-post-page', auth, dispayPostPage)
postRouter.get('/update-post-page/:id', auth, displayPostUpdatePage)

module.exports = postRouter