const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/authMiddleware');

// Create a new post (Protected)
router.post('/create', auth, async (req, res) => {
  const { title, description, image } = req.body;

  try {
    const post = new Post({
      title,
      description,
      image,
      author: req.user.id, // from token
    });

    await post.save();
    res.status(201).json({ message: 'Post created', post });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

router.get('/getAll', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name email'); // Optional: populate author
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
