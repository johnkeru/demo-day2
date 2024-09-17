const { Router } = require('express')
const { getPost, createPost, updatePost, deletePost, getPosts, dispayPostPage, displayPostUpdatePage } = require('../controllers/postContoller')

const postRouter = Router()

postRouter.get('/posts/:id', getPost)
postRouter.post('/posts', createPost)
postRouter.put('/posts/:id', updatePost)
postRouter.delete('/posts/:id', deletePost)

// templates
postRouter.get('/posts', getPosts)
postRouter.get('/create-post-page', dispayPostPage)
postRouter.get('/update-post-page/:id', displayPostUpdatePage)

module.exports = postRouter