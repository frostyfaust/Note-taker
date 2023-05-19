const path = require("path");
const fs = require('fs');
const router = require('express').Router();
let db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

//function that helps create a new note(body), adds note to array param(noteArray), and returns note body/info
function newNote(body, noteArray){
    const addedNote = body;
    noteArray.push(addedNote);
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(noteArray)
    );
    return addedNote;
}

//get route that retrieves notes from database
router.get('/api/notes', (req,res) =>{
    db = JSON.parse(fs.readFileSync('./db/db.json'))
    res.json(db)
});

//post route that allows for a new note to be posted to the existing note database
router.post('/api/notes', (req,res) =>{
    req.body.id = uuidv4();
    const newAddedNote = newNote(req.body, db );
    res.json(newAddedNote);
});

// delete route that helps delete desired note and remove specified note from database and returns a new database.
router.delete('/api/notes/:id', (req, res)=>{
let notes = JSON.parse(fs.readFileSync('db/db.json'))
let freshNotes = notes.filter(note => note.id !== req.params.id);
fs.writeFileSync('db/db.json', JSON.stringify(freshNotes));
res.json(freshNotes);
})

module.exports=router;
