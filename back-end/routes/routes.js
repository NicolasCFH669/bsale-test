const {request, response } = require('express');
const pool = require('../data/config');

const router = app => {

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  app.get('/', (request, response) =>{
    response.send({
      message: 'Node.js & Express RF API'
    });
  });

  // llamada a todos los productos de la bbdd
  app.get('/api/v.1.0/products', (request, response) => {
    pool.query('SELECT * FROM product', (error, result) => {
      if(error) throw error;

      response.json(result);
    });
    
  });
  // llamada por categorias
  app.get('/api/v.1.0/:id', (request, response) => {
    const id = request.params.id;
    pool.query('SELECT * FROM product WHERE category = ?', id, (error, result) => {
      if(error) throw error;

      response.json(result);
    });
    
  });

  // llamada a las categorias de la bbdd
  app.get('/api/v.1.0/category', (request, response) => {
    pool.query('SELECT * FROM category', (error, result) => {
      if(error) throw error;

      response.json(result);
    })
  })
}

module.exports = router;