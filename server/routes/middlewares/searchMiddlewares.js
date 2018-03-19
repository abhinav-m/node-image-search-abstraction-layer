const fetch = require('node-fetch');

const getOrCreateCollection = require('../../db/utils/getOrCreateCollection');

const saveSearchTerm = (req, res, next) => {
  const searchTerm = req.query.q;
  const db = req.db;

  getOrCreateCollection(db, 'Search_terms').then(collection => {
    collection
      .insertOne({
        searchTerm
      })
      .then(doc => {
        next();
      })
      .catch(e => console.log(e));
  });
};

const sendImagesResponse = (req, res) => {
  const offset = req.query.offset || 1;
  const NUM = 10;
  const START = (offset - 1) * NUM + 1; //eslint-disable-line
  const { API_KEY, SEARCH_ENGINE_KEY } = process.env;
  const QUERY = req.query.q;
  const URL = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_KEY}&q=${QUERY}&searchType=image&fileType=jpg&imgSize=xlarge&alt=json&start=${START}&num=${NUM}`;
  fetch(URL)
    .then(data => data.json())
    .then(data => {
      const items = data.items.map(imageData => {
        return {
          title: imageData.title,
          displayLink: imageData.displayLink,
          link: imageData.link,
          thumbnail: imageData.image.thumbnailLink,
          context: imageData.image.contextLink
        };
      });

      const parsed = {
        items,
        length: items.length
      };

      return parsed;
    })
    .then(images => {
      res.status(200).json(images);
    })
    .catch(e => res.status(400).send(e));
};

module.exports = {
  saveSearchTerm,
  sendImagesResponse
};
