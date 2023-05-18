const path = require("path");
const fs = require('fs');
const router = require('express').Router();
let db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

function newNote(body, noteArray){
    const addedNote = body;
    noteArray.push(addedNote);
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(noteArray)
    );
    return addedNote;
}

//gets
router.get('/api/notes', (req,res) =>{
    db = JSON.parse(fs.readFileSync('./db/db.json'))
    res.json(db)
});

router.post('/api/notes', (req,res) =>{
    req.body.id = uuidv4();
    const newAddedNote = newNote(req.body, db );
    res.json(newAddedNote);

})

router.delete('/api/notes/:id', (req, res)=>{
let notes = JSON.parse(fs.readFileSync('db/db.json'))
let freshNotes = notes.filter(note => note.id !== req.params.id);
fs.writeFileSync('db/db.json', JSON.stringify(freshNotes));
res.json(freshNotes);
})

module.exports=router;
