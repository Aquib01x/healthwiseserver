const Application = require('../database/applicationModel')
const mongoose = require('mongoose')

const getAllApplications = async (req, res) => {
  const user_id = req.user._id
  const allApplications = await Application.find({user_id})
  res.status(200).json(allApplications)
}

const getSingleApplication = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'The application you are looking for does not exit, there seems to be a problem with the id'})
      }

    try{
      const application = await Application.findOne({ _id: id });
        res.status(200)
        res.json(application)
    }catch(error){
        return res.status(404).json({error: 'The application you are looking for does not exist'})
    }
  }

  const createApplication = async (req, res) => { 
        const {name, desc} = req.body 
    
        try{
            const user_id = req.user._id
            const application = await Application.create({name,desc,user_id})
             res.status(200).json(application)
    
        }catch(error){
            res.status(400).json({error:error.message})
        }
    }

    const deleteApplication = async(req,res)=>{
      const{id} = req.params
      const user_id = req.user._id

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Delete Error: The application you are looking for does not exit, there seems to be a problem with the id'})
      }

      try {
        const result = await Application.deleteOne({_id: id, user_id: user_id});
        if (result.deletedCount === 0) {
          return res.status(403).json({error: 'Authorization Error: No application found with the specified ID for this user or you are not authorized to delete this application'});
        }
        res.status(200)
        res.json({message: 'Application deleted'})
      } catch (error) {
        res.status(400).json({error: error.message})
      }
    }

const updateApplication = async (req, res) => {
  const user_id = req.user._id
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Update Error: The application you are looking for does not exit, there seems to be a problem with the id'})
  }

  try {
    const result = await Application.findOne({_id: id, user_id: user_id});
    result.name = req.body.name || result.name;
    result.desc = req.body.desc || result.desc;
    const updatedApplication = await result.save();
    res.json(updatedApplication);
  } catch (error) {
    console.error(error);
    res.status(409).json({ error: 'There is a conflict with the resource' })
  }
}

module.exports = {
  getAllApplications,
  getSingleApplication,
  createApplication,
  deleteApplication,
  updateApplication
}
