const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const port = process.env.PORT||5000;

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://admin-user:admin-user@atlascluster.7ljklja.mongodb.net/keeperDB", {useNewUrlParser:true});
// mongoose.connect("mongodb://0.0.0.0:27017/keeperDB", {useNewUrlParser:true});

const noteSchema = new mongoose.Schema({
    id: String,
    title : String,
    content : String
});

const Note = mongoose.model("Note", noteSchema);

app.post("/", (req,res)=>{

    const reqId = req.body.note.id;
    const reqTitle = req.body.note.title;
    const reqContent = req.body.note.content;

    const note = new Note({
        id: reqId,
        title: reqTitle,
        content: reqContent
    });

    note.save().then((data)=>{
        console.log(data);
    });
});

app.get('/noteList', function (req, res) {
    Note.find().then(function (collection, err){
        if(err){
            console.log(err);
        }else{
            res.json(collection);
        }
    });
});

app.delete('/',function(req, res){
    const id = req.query.id;
    console.log(id);
    Note.deleteOne({id: id}).then(function(err){
        console.log(err);
    });
});


app.listen(port, () => {
    console.log("server started on port " + port);
});