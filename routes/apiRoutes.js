const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// GET /api/notes - Read all notes from db.json and return as JSON
router.get("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed doctype database." });
    }
    try {
      const notes = JSON.parse(data);
      res.json(notes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed saved database." });
    }
  });
});

router.post('/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read notes in database." });
    }
    try {
      const notes = JSON.parse(data || "[]"); // Initialize empty array if data is empty
      notes.push(newNote);
      fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to save note in database." });
        }
        res.json(newNote);
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to parse notes in database." });
    }
  });
});

// DELETE /api/notes/:id - Delete a note from db.json with the given id
router.delete("/notes/:id", (req, res) => {
  const id = req.params.id;

  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read notes from database." });
    }
    try {
      let notes = JSON.parse(data);
      const updatedNotes = notes.filter((note) => note.id !== id);
      if (notes.length === updatedNotes.length) {
        return res.status(404).json({ error: "Note not found." });
      }
      fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(updatedNotes), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to delete notes from database." });
        }
        res.sendStatus(204);
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed parse notes from database." });
    }
  });
});

module.exports = router;
