const notesmodel = require("../model/notesmodel.js");
const authmodel = require('../model/authModel.js');
const datamodel = require('../model/userNotes.js');

async function postNotesController(req, res) {
    try {
        let notesfind = await notesmodel.findOne({ data: req.body.data });
        if (notesfind) {
            return res.send({
                success: false,
                error: "Data already exist"
            })
        }
        let notes = await notesmodel.create({ data: req.body.data });

        let user = await authmodel.findOne({ email: req.body.email });

        let upload = await datamodel.updateOne({ email: user._id }, { $push: { data: notes._id } });

        if (notes && upload) {
            return res.send({
                success: true,
                message: 'Data uploaded successfully'
            });
        }
        else {
            return res.send({
                success: false,
                error: "Query error"
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.send({
            success: false,
            error: "Internal server error"
        });
    }
}

async function getOneNotesController(req, res) {
    try {
        
        let notes = await notesmodel.findOne({ _id: req.body.id }); 

        if (notes) {
            return res.send({
                success: true,
                message: "Notes fetched successfully",
                notes
            });
        }
        else {
            return res.send({
                success: false,
                error: "Query error"
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.send({
            success: false,
            error: "Internal server error"
        });
    }
}

async function deleteNotesController(req, res){
    try{
        
        let notes = await notesmodel.deleteOne({ _id: req.body.id});
        let user = await authmodel.findOne({ email: req.body.email });
        let data = await datamodel.updateOne({email: user._id}, {$pull: {data: notes._id}});

        if(notes && data){
            return res.send({
                success: true,
                message: "Deleted successfully"
            })
        }
    }
    catch(err){
        console.log(err);
        return res.send({
            success: false,
            error: "Query error"
        })
    }
}

module.exports = { postNotesController, getOneNotesController, deleteNotesController };