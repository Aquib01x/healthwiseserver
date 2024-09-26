const Application = require('../database/applicationModel')


 const addComponent = async (req, res) => {

  const user_id = req.user._id;


  const { appId } = req.params;
  const { screen, type, content } = req.body; 

  try {
    const application = await Application.findOne({_id: appId, user_id: user_id})
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (!application[screen]) {
      return res.status(400).json({ message: `Screen ${screen} not found in application` });
    }

  
    const newComponent = { type, content }; 


    application[screen].components.push(newComponent);
    await application.save();


    
    const addedComponent = application[screen].components[application[screen].components.length - 1];


    res.status(201).json({ message: 'Component added successfully to ' + screen, _id: addedComponent._id });
  } catch (error) {
    res.status(500).json({ message: 'Error adding component', error: error.message });
  }
};



const getComponents = async (req, res) => {


  const { appId } = req.params;

  try {
    const application = await Application.findOne({ _id: appId });
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching components', error: error.message });
  }
};

const updateComponent = async (req, res) => {

  const user_id = req.user._id

  const { appId, componentId } = req.params;

  const { screen, ...updateData } = req.body; 

  try {

    const application = await Application.findOne({_id: appId, user_id: user_id}); //auth
    if (!application || !application[screen]) {
      return res.status(404).json({ message: 'Application or screen not found' });
    }

    const componentIndex = application[screen].components.findIndex(c => c._id.toString() === componentId);
    if (componentIndex === -1) {
      return res.status(404).json({ message: 'Component not found' });
    }

    application[screen].components[componentIndex] = { ...application[screen].components[componentIndex].toObject(), ...updateData };
    await application.save();

    res.status(200).json({ message: 'Component updated successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Error updating component', error: error.message });
  }
};


const moveComponent = async (req, res) => {

  const user_id = req.user._id


  const { appId, componentId } = req.params;
  const { screen, direction } = req.body;

  try {
    const application = await Application.findOne({_id: appId, user_id: user_id}); //auth
    if (!application || !application[screen]) {
      return res.status(404).json({ message: 'Application or screen not found' });
    }

    const componentIndex = application[screen].components.findIndex(c => c._id.toString() === componentId);
    if (componentIndex === -1) {
      return res.status(404).json({ message: 'Component not found' });
    }

    if (direction === "up" && componentIndex > 0) {
      // Scambia con il componente precedente
      [application[screen].components[componentIndex], application[screen].components[componentIndex - 1]] =

      [application[screen].components[componentIndex - 1], application[screen].components[componentIndex]];
    } else if (direction === "down" && componentIndex < application[screen].components.length - 1) {

      [application[screen].components[componentIndex], application[screen].components[componentIndex + 1]] = 
      [application[screen].components[componentIndex + 1], application[screen].components[componentIndex]];
    }

    await application.save();
    res.status(200).json({ message: 'Component moved successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Error moving component', error: error.message });
  }
};




const deleteComponent = async (req, res) => {

  const user_id = req.user._id


  const { appId, componentId } = req.params;
  const { screen } = req.body; 

   console.log("appId:", appId, "componentId:", componentId);

  try {
   
  
    const updateResult = await Application.findOneAndUpdate(
      {
      _id: appId, 
      user_id: user_id
    } 
      , {
      $pull: { [`${screen}.components`]: { _id: componentId } }
    }, { new: true }); 

    if (!updateResult) {
      return res.status(404).json({ message: 'Application not found or component not removed' });
    }

    res.status(200).json({ message: 'Component deleted successfully', application: updateResult });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting component', error: error.message });
  }
};






module.exports = {
    addComponent,
    getComponents,
    updateComponent,
    deleteComponent,
    moveComponent
  
  }