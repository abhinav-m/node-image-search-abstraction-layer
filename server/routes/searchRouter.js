const express = require('express');

const { saveSearchTerm, sendImagesResponse } = require('./middlewares/searchMiddlewares.js');

const searchRouter = express.Router();

searchRouter.get('/', [saveSearchTerm, sendImagesResponse]);

module.exports = searchRouter;
