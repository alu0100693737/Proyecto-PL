"use strict";
const express = require('express');
const path = require('path');
const util = require('util');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//const expressLayouts = require('express-ejs-layouts');
const PEG = require('./public/js/pl0');
const semantic = require('./public/js/semantic');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/basededatos')

const app = express();
app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  response.render('index', { title: 'Proyecto' });
});

app.get('/grammar', (request, response) => {
  response.render('grammar', { title: 'Proyecto' });
});

app.get('/test', (request, response) => {
  response.render('test', { title: 'Proyecto' });
});

app.get('/arbol', (request, response) => {
    var tree;
    try {
        tree = PEG.parse(request.query.input);
        if (tree.errors)
            tree = tree.errors;

        semantic(tree);
        console.log(util.inspect(tree, {depth: null}));
    } catch (e) {
        console.log("ERROR: " + e);
        tree = "Syntax Error: " + e.message.substring(0, e.message.length - 1) + " in line " + e.location.start.line;
    }
    response.send({
        "tree": tree
    });
});

const Entrada = require('./models/db');

//Guardar maximo 4 entradas. Siempre se cambia la ultima
app.get('/mongo/', function(req, res) {
    Entrada.find({}, function(err, docs) {
        if (err)
            return err;
        if (docs.length >= 4) {
            Entrada.find({ name: docs[3].name }).remove().exec();
        }
    });
    let input = new Entrada({
        "name": req.query.name,
        "content": req.query.content
    });

    input.save(function(err) {
        if (err) {
            console.log(`Hubieron errores:\n${err}`);
            return err;
        }
        console.log(`Guardado: ${input}`);
    });
});

app.get('/find', function(req, res) {
    Entrada.find({}, function(err, docs) {
        if (err)
            return err;
        res.send(docs);
    });
});

//se devuelve el contenido
app.get('/findPorNombre', function(req, res) {
    Entrada.find({
        name: req.query.name
    }, function(err, docs) {
        res.send(docs);
    });
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});
