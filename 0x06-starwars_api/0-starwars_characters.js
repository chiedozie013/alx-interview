#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2];

const getCharacterNames = async () => {
  try {
    const filmResponse = await new Promise((resolve, reject) => {
      const filmUrl = `https://swapi-api.hbtn.io/api/films/${movieId}/`;
      request(filmUrl, (err, res, body) => {
        if (err || res.statusCode !== 200) {
          reject(err || new Error(`StatusCode: ${res.statusCode}`));
        } else {
          resolve(JSON.parse(body));
        }
      });
    });

    const characters = filmResponse.characters;

    await Promise.all(characters.map(async characterUrl => {
      try {
        const characterResponse = await new Promise((resolve, reject) => {
          request(characterUrl, (err, res, body) => {
            if (err || res.statusCode !== 200) {
              reject(err || new Error(`StatusCode: ${res.statusCode}`));
            } else {
              resolve(JSON.parse(body));
            }
          });
        });

        console.log(characterResponse.name);
      } catch (error) {
        console.error('Error:', error);
      }
    }));
  } catch (error) {
    console.error('Error:', error);
  }
};

getCharacterNames();
