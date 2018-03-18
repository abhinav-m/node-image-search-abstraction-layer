const express = require('express');
const { ObjectID } = require('mongodb');

const recentSearchesRouter = express.Router();

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
      req.docs = docs.map(doc => {
        return {
          search_term: doc.searchTerm,
          on: new Date(doc._id.getTimestamp()).toLocaleDateString() //eslint-disable-line
        };
      });

      next();
    })
    .catch(e => res.status(400).send(e));
};

recentSearchesRouter.get('', [queryRecentSearches, sendResponse]);

module.exports = recentSearchesRouter;
