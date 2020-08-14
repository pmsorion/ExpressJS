const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');

const { 
    logErrors, 
    clientErrorHandler,
    errorHnadler
} = require('./utils/middlewares/errorHandlers')

//App
const app = express();

//middleware
app.use(bodyParser.json());

//Manejo de archivos estaticos
app.use('/static', express.static(path.join(__dirname, 'public')));

//View Engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//Routes
app.use('/products', productsRouter);
app.use('/api/products', productsApiRouter);

//Redirect
app.get('/', function(req, res) {
    res.redirect('/products');
});

//error handler
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHnadler);

//Server initialisation
const server = app.listen(8000, () => {
    console.log(`Listening http://localhost:${server.address().port}`);
});