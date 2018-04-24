const Datastore = require('@google-cloud/datastore');


const datastore = new Datastore({
  projectId:    process.env.PROJECT_ID || 'restimplementation-202104',
  keyFilename:  './config/RESTImplementation-3a0c988559d5.json'
});


module.exports = datastore;
