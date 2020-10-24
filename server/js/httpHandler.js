const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

// const validMessages = ['left', 'right', 'up', 'down'];
module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  if(req.method === 'GET'){
    // var index = Math.floor(Math.random()*validMessages.length);
    // res.write(validMessages[index]);
    let message = messageQueue.dequeue();
    if(message){
      res.write(message);
    } else {
      res.write('try again');
    }
  }
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
