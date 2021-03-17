const server = require('@aspiesoft/express-simplified');
const fs = require('fs-extra');

server.static();

const serverData = fs.readJsonSync('server-data.json');

if(server.regve){
  server.regve.addFunction('data', function(attrs){
    if(typeof attrs[0] !== 'string'){return;}
    try{
      return serverData[attrs[0].toString()].toString();
    }catch(e){}
  }, false);
}

server(3000, (app) => {

  app.req('/', (req, res, next) => {
    res.render('index');
  });

});
