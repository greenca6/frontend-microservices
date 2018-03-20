const express = require('express');
const request = require('request');

const server = express();

server.set('view engine', 'ejs');

const endpoints = {
  footer: 'http://footer:3000',
  header: 'http://header:3000',
  frag_one: 'http://frag-one:3000',
  frag_two: 'http://frag-two:3000',
};

server.get('/', (req, res) => {
  Promise.all([
    getContents(endpoints.header),
    getContents(endpoints.footer),
  ]).then(responses =>
    res.render('index', { header: responses[0], footer: responses[1] })
  ).catch(error =>
    res.send(error.message)
  );
});

server.get('/home', (req, res) => {
  Promise.all([
    getContents(endpoints.header),
    getContents(endpoints.footer),
    getContents(endpoints.frag_one),
    getContents(endpoints.frag_two),
  ]).then(responses =>
    res.render('home', {
      header: responses[0],
      footer: responses[1],
      frag_one: responses[2],
      frag_two: responses[3]
    })
  ).catch(error =>
    res.send(error.message)
  );
});

server.get('/applications', (req, res) => {
  Promise.all([
    getContents(endpoints.header),
    getContents(endpoints.footer),
  ]).then(responses =>
    res.render('applications', { header: responses[0], footer: responses[1] })
  ).catch(error =>
    res.send(error.message)
  );
});

const getContents = (url) => new Promise((resolve, reject) => {
  request.get(url, (error, response, body) => {
    if (error) return resolve("Error loading " + url + ": " + error.message);

    console.log('resolved request successfully: ' + body.toString());
    return resolve(body);
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Homepage listening on port ${port}`);
});
