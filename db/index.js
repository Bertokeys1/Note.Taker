const util = require("util");
const fs = require("fs");

const uuid = require("uuid/v1");

const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);

class DB {
  read() {
    return readAsync("db/db.json", "utf8");
  }

  write(notes) {
    return writeAsync("db/db.json", JSON.stringify(notes));
  }

  readNotes() {
    return this.read().then((notes) => {
      let allNotes;

      try {
        allNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        allNotes = [];
      }

      return allNotes;
    });
  }

  createNote(note) {
    const { title, text } = note;

    const newNote = {
      title,
      text,
      id: uuid(),
    };

    return this.readNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(()=> newNote);
  }
}

module.exports = new DB();
