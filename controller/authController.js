const authmodel = require('../model/authModel.js')
const datamodel = require('../model/userNotes.js')

async function userController(req, res) {
    try {
        const user = await authmodel.findOne({ email: req.body.email });

        if (user) { 
            const data = await datamodel
                .findOne({ email: user._id })
                .populate(  
                    { path: 'data', options: { sort: { createdAt: -1 } } }
                )
            
            return res.send({
                success: true,
                message: "User found successfully",
                data
            })
        }
        else { 
            const user = await authmodel.create({ email: req.body.email });

            const upload = await datamodel.create({
                email: user._id, data: []  
            });

            if (user && upload) {
                return res.send({
                    success: true,
                    message: "New user created successfully"
                })
            }
            else {
                return res.send({
                    success: false,
                    error: "Error while making user"
                })
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.send({
            success: false,
            error: "Internal server error"
        })
    }
}

module.exports = { userController };