const Post = require('../post')

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.render('posts', { posts })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!' })
    }
}

exports.getPost = async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findById(id)
        if (!post) return res.status(404).json({ message: `Post is not found!` })
        res.json({ post })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!' })
    }
}

exports.dispayPostPage = (req, res) => {
    res.render('create-post')
}

exports.displayPostUpdatePage = async (req, res) => {
    const id = req.params.id
    const post = await Post.findById(id)
    res.render('update-post', { post })
}

exports.createPost = async (req, res) => {
    try {
        const body = req.body
        const newPost = new Post(body)
        await newPost.save()
        res.redirect('/posts')
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!' })
    }
}

exports.updatePost = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        await Post.findOneAndUpdate(id, body)
        res.json({ message: 'Post is updated' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!' })
    }
}

exports.deletePost = async (req, res) => {
    try {
        const id = req.params.id
        await Post.findOneAndDelete(id)
        res.redirect('/posts')
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!' })
    }
}