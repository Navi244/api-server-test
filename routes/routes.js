const express = require('express');
const router = express.Router();
router.use(express.json());
const Joi = require('joi');
const logger = require('./logger');


router.use(logger);
router.use(function(req, res, next) {
    console.log('autenticando...');
    next();
});

const users = [
    {id: 1, nombre: 'Pedro'},
    {id: 2, nombre: 'Juan'},
    {id: 3, nombre: 'José'}
]

router.get('/', function (req, res) {
    res.send('hi!');
});

router.get('/json', function (req, res) {
    res.json({
        data: 'API Get Works!'
    })
});

//Con un solo parámetro
router.get('/users/:id', function (req, res) {
    res.send(req.params.id);
});
// con 2 parámetros
router.get('/users/:year/:day', function (req, res) {
    res.send(req.params);
});

//ejemplo de lo que le pongamos en query va a aparecer, es decir, /api/cycling/users/11/5?sexo=m
router.get('/users/:month/day/:day', function (req, res) {
    res.send(req.query);
});

router.post('/users', function (req, res) {
    const schemaNameUser = Joi.object({
        name: Joi.string()
            .required()
    });

    const {value, error} = schemaNameUser.validate({name: req.body.name});

    if(!error) {
        const user = {
            id: users.length + 1,
            nombre: value.name
        };
        users.push(user);
        res.send(users);
    } else {
        res.status(400).json({
            error: 'error on body'
        })
    }
});

//Buscar un elemento por el id
/**
 * Según el valor que venga en la url va a ser comparada con la constante users
 */
router.get('/company/:id', function (req, res) {
    let user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send('Usuario no existe');
    } else {
        res.send(user);
    }
    
});

module.exports = router;