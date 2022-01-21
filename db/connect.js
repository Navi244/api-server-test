const mongoose = require('mongoose');

const url = 'mongodb://localhost/test-task';

mongoose.connect(url)
    .then(success => console.log('Conectó exitosamente'))
    .catch(err => console.log(err));


const cursoShema = new mongoose.Schema({
    Tipo    : String,
    Marca   : String,
    Color   : String,
    Fecha   : { type: Date, default: Date.now }
});

const Curso = mongoose.model('Curso', cursoShema);

async function addData() {
    const curso = new Curso({
        Tipo: "Zapatillas",
        Marca: "Ozono",
        Color: "Azul"
    });
    const result = await curso.save();
    console.log(result);
};

//addData();

async function showData() {
    const curso = await Curso.find();
    console.log(curso);
}
//showData();

module.exports = mongoose;