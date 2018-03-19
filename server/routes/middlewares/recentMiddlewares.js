const sendResponse = (req, res) => {
  const response = req.docs.length === 0 ? { error: 'no recent searches' } : req.docs;
  res.send(response);
};

const queryRecentSearches = (req, res, next) => {
  const db = req.db;
  db
    .collection('Search_terms')
    .find({})
    .sort({
      _id: -1
    })
    .toArray()
    .then(docs => {
      const recentSearches = docs.map(doc => {
        return {
          search_term: doc.searchTerm,
          on: new Date(doc._id.getTimestamp()).toLocaleDateString() //eslint-disable-line
        };
      });
      req.docs = {
        recent_searches: recentSearches,
        length: recentSearches.length
      };
      next();
    })
    .catch(e => res.status(400).send(e));
};

module.exports = {
  sendResponse,
  queryRecentSearches
};
