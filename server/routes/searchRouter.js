const express = require('express');
const fetch = require('node-fetch');

const searchRouter = express.Router();

const sendImagesResponse = (req, res) => {
  const { API_KEY, SEARCH_ENGINE_KEY } = process.env;
  const QUERY = req.params.term;
  const URL = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_KEY}&q=${QUERY}&searchType=image&fileType=jpg&imgSize=xlarge&alt=json`;
  // &start=1&num=2
  fetch(URL)
    .then(data => data.json())
    .then(data =>
      data.items.map(imageData => {
        return {
          title: imageData.title,
          displayLink: imageData.displayLink,
          link: imageData.link,
          thumbnail: imageData.image.thumbnailLink,
          context: imageData.image.contextLink
        };
      }))
    .then(images => {
      res.status(200).json(images);
    })
    .catch(e => res.status(400).send(e));
};

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

// Middleware to save searchterm to db.
const saveSearchTerm = (req, res, next) => {
  const searchTerm = req.params.term;
  const db = req.db;

  getOrCreateCollection(db, 'Search_terms').then(collection => {
    collection
      .insertOne({
        searchTerm
      })
      .then(doc => {
        console.log(`Inserted term ${searchTerm}`);
        next();
      })
      .catch(e => console.log(e));
  });
};

searchRouter.get('/:term', [saveSearchTerm, sendImagesResponse]);

module.exports = searchRouter;
