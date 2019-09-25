const app = require('./app');
require('./database');

async function init() {
 await app.listen(3001);
 console.log('listening on 3001')

}

/*app.get('/products', (req, res) => {
  res.send(gato)
})

var gato = {

  michi :{
      name : "michi",
      age : "5years"  

  },
  michi2 :{
      name : "michi",
      age : "5years"  

  },

  michi3 :{
      name : "michi",
      age : "5years"  

  }

  ,    michi4 :{
      name : "michi",
      age : "5years"  

  },


}*/

init();
