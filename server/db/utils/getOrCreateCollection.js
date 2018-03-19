// Create a capped collection if it doesn't exist, otherwise return collection.
// This will help with only fetching 10 latest results( by sorting in reverse order)
const getOrCreateCollection = (db, collName) => {
  return new Promise((resolve, reject) => {
    db
      .listCollections({ name: collName })
      .hasNext()
      .then(exists => {
        if (exists) {
          resolve(db.collection(collName));
        } else {
          db
            .createCollection(collName, {
              capped: true,
              size: 5000000,
              max: 10
            })
            .then(collection => resolve(collection));
        }
      })
      .catch(e => reject(e));
  });
};

module.exports = getOrCreateCollection;
