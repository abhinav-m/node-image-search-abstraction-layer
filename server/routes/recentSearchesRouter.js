const express = require('express');

const { queryRecentSearches, sendResponse } = require('./middlewares/recentMiddlewares');

const recentSearchesRouter = express.Router();

recentSearchesRouter.get('', [queryRecentSearches, sendResponse]);

module.exports = recentSearchesRouter;
