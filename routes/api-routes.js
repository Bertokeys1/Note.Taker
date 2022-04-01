const router = require("express").Router();
const db = require("../db");

// Routing function to get all notes thats were saved.
router.get("/notes", (req, res) => {
  db.readNotes()
    .then((notes) => {
        return res.json(notes)
    })
    .catch((err) => res.json(err));
});

// Routing function to post a note.
router.post("/notes", (req, res) => {
    db.createNote(req.body)
      .then((notes) => {
          return res.json(notes)
      })
      .catch((err) => res.json(err));
  });

  router.delete('/:id', (req, res) => {
    //id is retrieved from the parameter method, in the :id above
    let requestedID = req.params.id;
    //here we dynamically grab our existing notes by reading the db.json file. This is better than requiring the existing notes in the beginning, because it's not called on unless the user clicks delete :) 
    let notesJSON = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")))
    //the magic! Filter function takes the id child in each array object and compares it to the id from my parameter. 
    notesJSON = notesJSON.filter((note) => requestedID !== note.id)
    //Will filter the array so objects only continue on if their id does NOT match the requestedID from params.
    console.log(`${req.method} request received to delete.`)
    //here we write our filtered array back to the db json file. We stringify it back into the proper format
    fs.writeFileSync('db/db.json',
        JSON.stringify(notesJSON, null, 4)
    )
    //standard - ok message
    res.sendStatus(200);
})


module.exports = router;
