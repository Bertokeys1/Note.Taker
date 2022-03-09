const router = require("express").Router();
const db = require("../db");

router.get("/notes", (req, res) => {
  db.readNotes()
    .then((notes) => {
        return res.json(notes)
    })
    .catch((err) => res.json(err));
});

router.post("/notes", (req, res) => {
    db.createNote(req.body)
      .then((notes) => {
          return res.json(notes)
      })
      .catch((err) => res.json(err));
  });


module.exports = router;
