const express = require('express');
const router = express.Router();

// Store the notes in memory (replace this with a database in a real application)
let notes = [];

// Get all notes
router.get('/api/notes', (req, res) => {
res.json(notes);
});

// Create a new note
router.post('/api/notes', (req, res) => {
  const newNote = req.body;
  notes.push(newNote);
  res.json(newNote);
});

// Delete a note by ID
router.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  notes = notes.filter((note) => note.id !== noteId);
  res.sendStatus(204);
});

module.exports = router;
