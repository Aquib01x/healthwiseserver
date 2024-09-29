const { PORT, MONGODB_URI } = require('./config')

const express = require('express')
const cors = require('cors');
const applicationAPIRoutes = require('./model/APIRoutes/applicationRoutes')

const componentsAPIRoutes = require('./model/APIRoutes/componentRoutes')

const participantAPIRoutes = require('./model/APIRoutes/partecipantRoutes'); 

const userAPIRoutes = require('./model/APIRoutes/userRoutes')

const mongoose = require('mongoose')


//SERVER ROOT 
const app = express()

const corsOptions = {

   //CORS ORIGINS
    origin: ['https://devweb2023.cis.strath.ac.uk/~fqb19176/healthwisecms/build/','http://cpunode1:3006','http://cpunode2:3006','http://cpunode3:3006','http://cpunode4:3006','http://localhost:3000'],      // or a list of origins
    methods: 'GET,POST,PATCH,DELETE,OPTIONS', // Allowed request methods
    allowedHeaders: 'Content-Type,Authorization', // Allowed request headers
    credentials: true, // Whether to allow sending of cookies and other credentials
 
  };


app.use(cors(corsOptions));


app.use(express.json())//MIDDLEWARE

//ROUTES

app.use('/api/user', userAPIRoutes);


app.use('/api/applications', applicationAPIRoutes); 



app.use('/api/applications/:appId/components', componentsAPIRoutes);

app.use('/api/partecipants', participantAPIRoutes); 


//DB CONNECTION
mongoose.connect(MONGODB_URI)
    .then(()=>{ 
      
     app.listen(PORT, () => {
     console.log('Server listening on port 3000!!!')
    })
})
    .catch((error)=>{
        console.log(error)
    })



