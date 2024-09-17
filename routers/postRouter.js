const { Router } = require('express')
const { getPosts, getPost, dispayPostPage, createPost, updatePost, deletePost } = require('../controllers/postContoller')

const postRouter = Router()

postRouter.get('/posts', getPosts)
postRouter.get('/posts/:id', getPost)
postRouter.get('/create-post-page', dispayPostPage)
postRouter.get('/create-post', createPost)
postRouter.put('/posts/:id', updatePost)
postRouter.delete('/posts/:id', deletePost)

module.exports = postRouter