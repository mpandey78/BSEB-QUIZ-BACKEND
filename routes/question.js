const router = require('express').Router();
const Question = require('../models/question');
const jwt = require('jsonwebtoken');

// Middleware for token authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const secret = process.env.JWT_SEC
    console.log(secret);
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get all questions (requires token authentication)
router.get('/questions', authenticateToken, async (req, res) => {
  try {
    console.log(authenticateToken)
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve questions' });
  }
});

// Create a new question (requires token authentication)
router.post('/questions', authenticateToken, async (req, res) => {
  const { question, options } = req.body;

  // Validate the request
  if (!question || !options || options.length !== 4) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  // Create a new question object
  const newQuestion = new Question({
    question,
    options,
  });

  try {
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save question' });
  }
});

module.exports = router;
