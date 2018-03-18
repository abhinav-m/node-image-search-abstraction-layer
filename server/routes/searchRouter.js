const express = require('express');
const fetch = require('node-fetch');

const searchRouter = express.Router();

const getImageResults = searchTerm => {
  const { API_KEY, SEARCH_ENGINE_KEY } = process.env;
  const QUERY = searchTerm || 'apples';
  const URL = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_KEY}&q=${QUERY}&searchType=image&fileType=jpg&imgSize=xlarge&alt=json`;
  // &start=1&num=2
  return fetch(URL).then(data => data.json());
};

searchRouter.get('/:term', (req, res) => {
  debugger; // eslint-disable-line
  const searchTerm = req.params.term;
  getImageResults(searchTerm)
    .then(data => {
      const images = data.items.map(imageData => {
        return {
          title: imageData.title,
          displayLink: imageData.displayLink,
          link: imageData.link,
          thumbnail: imageData.image.thumbnailLink,
          context: imageData.image.contextLink
        };
      });
      return images;
    })
    .then(images => {
      res.status(200).json(images);
    })
    .catch(e => res.status(400).send(e));
});

module.exports = searchRouter;
