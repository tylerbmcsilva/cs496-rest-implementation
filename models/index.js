const Datastore = require('@google-cloud/datastore');


const datastore = new Datastore({
  projectId:    process.env.PROJECT_ID || 'restimplementation-202104',
  keyFilename:  './config/RESTImplementation-3a0c988559d5.json'
});


async function getAllOfKind(KIND) {
  try {
    const query = datastore.createQuery(KIND);

    const response = await query.run();

    const entities = response[0].map( (ent) => {
      ent.id = ent[datastore.KEY].id;
      return ent;
    });

    return entities;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function createEntity({ KIND, data }) {
  try {
    const key     = datastore.key(KIND);
    const entity  = {
      key,
      data
    };

    await datastore.save(entity);

    return key.path[1];
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function getEntityById({ KIND, id }){
  try {
    const key       = await datastore.key([KIND, parseInt(id)]);
    const response  = await datastore.get(key);

    const entity = response[0];

    if( entity ) {
      entity.id = entity[datastore.KEY].id;
      return entity;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function updateEntity({ KIND, id, data }) {
  try {
    const key     = datastore.key([KIND, parseInt(id)]);
    const entity  = {
      key,
      data
    };
    const res = await datastore.update(entity);

    return key.path[1];
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function deleteEntity({ KIND, id }) {
  try {
    const key = await datastore.key([KIND, parseInt(id)]);
    return await datastore.delete(key);
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function filterDatabase({ KIND, key, value }) {
  try {
    const query = datastore.createQuery(KIND);

    query.filter(key, value);

    return await query.run();
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function firstAvailableEntityByFilter({ KIND, key, value }) {
  try {
    const query = datastore.createQuery(KIND);
    query.filter(key, value);

    const response = await query.run();

    const entity = response[0][0];

    if( entity ) {
      entity.id = entity[datastore.KEY].id;
      return entity;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}


module.exports = {
  getAllOfKind,
  createEntity,
  getEntityById,
  updateEntity,
  deleteEntity,
  filterDatabase,
  firstAvailableEntityByFilter
};
