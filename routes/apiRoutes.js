const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = function(app) {
  // GET /api/notes should read the db.json file and return all saved notes as JSON
  app.get('/api/notes', function(req, res) {
    fs.readFile('db.json', 'utf8', function(err, data) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to read notes.' });
      }

      let notes = [];
      try {
        notes = JSON.parse(data);
      } catch (parseError) {
        console.error(parseError);
        return res.status(500).json({ error: 'Failed to parse notes.' });
      }

      return res.json(notes);
    });
  });

  // POST /api/notes should receive a new note to save on the request body, add it to the db.json file,
  // and then return the new note to the client
  app.post('/api/notes', function(req, res) {
    fs.readFile('db.json', 'utf8', function(err, data) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to read notes.' });
      }

      let notes = [];
      try {
        notes = JSON.parse(data);
      } catch (parseError) {
        console.error(parseError);
        return res.status(500).json({ error: 'Failed to parse notes.' });
      }

      const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
      };

      notes.push(newNote);

      fs.writeFile('db.json', JSON.stringify(notes), function(writeErr) {
        if (writeErr) {
          console.error(writeErr);
          return res.status(500).json({ error: 'Failed to write notes.' });
        }

        return res.json(newNote);
      });
    });
  });

  // DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete.
  // It should remove the note with the given id property from the db.json file.
  app.delete('/api/notes/:id', function(req, res) {
    fs.readFile('db.json', 'utf8', function(err, data) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to read notes.' });
      }

      let notes = [];
      try {
        notes = JSON.parse(data);
      } catch (parseError) {
        console.error(parseError);
        return res.status(500).json({ error: 'Failed to parse notes.' });
      }

      const noteId = req.params.id;
      const updatedNotes = notes.filter(note => note.id !== noteId);

      fs.writeFile('db.json', JSON.stringify(updatedNotes), function(writeErr) {
        if (writeErr) {
          console.error(writeErr);
          return res.status(500).json({ error: 'Failed to write notes.' });
        }

        return res.json({ message: 'Note deleted successfully.' });
      });
    });
  });
};
