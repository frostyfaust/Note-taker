const path = require('path');
const router = require('express').Router();

// get route to send user to normal path
router.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

// get route to send user to notes path
router.get("/notes", (req,res)=>{
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

// catch all get route to send user to normal path
router.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'))
})


module.exports = router;