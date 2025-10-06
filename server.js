const jsonServer = require('json-server');
const https =  require('https');
const fs = require('fs');

const server = jsonServer.create();
const router = jsonServer.router('./data/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const options = {
    key: fs.readFileSync('./certs/localhost-key.pem'),
    cert: fs.readFileSync('./certs/localhost.pem')
};

https.createServer(options, server).listen(3001, () => {
    console.log('JSON Server is running on https://localhost:3001');
});

server.get('/test', (req, res) => {
    res.json({ message: 'It works!' });
});
