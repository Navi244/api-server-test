//Middleware: son funciones que pueden tratar el request antres de procesarlo en el get, post, etc
//Es importante mencionar que el req y res va navegando a travéz de cada Middleware
function log(req, res, next) {
    console.log('logging...');
    next();
};

module.exports = log;