import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import User from './models/User';

const PORT = process.env.PORT || 5004;

const app = express();

require('dotenv').config();

app.get('/',(req,res) => {
  res.send('Server Running');
})

app.get('/saveUser',(req,res) => {
    const tempData = new User({
      username: "rootx",
      password: "rootxyzt",
      notes: {title:"Maths", body: "13 is prime number"}
    })
    tempData.save(err => {
       if(err) throw err;
    })
    res.send('Saved Successfully');
})

app.get('/addNote', (req,res) => {
  const noteTitle = "Turkish", noteBody = "Turkish Turkish";
  const userId = '6055f6b9fd0d0928168423cb'
  User.findById(userId).then(doc => {
      doc.notes.push({
           title:noteTitle,
           body:noteBody
      })

      doc.save();
      res.send('Note Added Into NoteBox Collection');
  })
})

app.get('/deleteNote',(req,res) => {
  const userId = '6055f6b9fd0d0928168423cb';
  const noteIdDeleted = '6056067ad0fe4d2de37140d5';
  User.findById(userId).then(doc => {
    doc.notes.map(note => {
      if(note._id == noteIdDeleted) note.remove();
    })

    doc.save();
    res.send("Note Removed Into NoteBox Collection");
  })
})

app.get('/updateNote', (req,res) => {
  const userId = '6055f6b9fd0d0928168423cb';
  const noteIdUpdated = '6055f6b9fd0d0928168423cc';
  User.findById(userId).then(doc => {
    doc.notes.map(note => {
       if(note._id == noteIdUpdated) {
          note.body = "17 is prime number"
       } 
    })

    doc.save();
    res.send("Note Updated Into NoteBox Collection");
  })
})

mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true},(err)=> {
    if(err) throw err;
    console.log("Connection With Mongoose Success");
})

app.listen(PORT,(err) => {
  if(err) throw err;
  console.log(`Server Running in ${PORT}`);
});


