// Configurar Express, el motor EJS, la carpeta views y /public.
const express = require('express')
const path = require('path');
const temasRoutes = require('./routes/temasRoutes');
console.log('temasRoutes typeof =>', typeof temasRoutes);

const app = express()
const port = 3000

app.set('view engine', 'ejs'); // set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));// Indica a Express dónde encontrar los archivos de plantilla
app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta 'public'
app.use(express.urlencoded({ extended: true }));
app.use('/temas', temasRoutes)

app.get('/prueba', (req, res) => {
    res.render('prueba', { title: 'hellooo'});
});
app.listen(port, () => {
    console.log("Servidor corriendo en puerto", `${port}`);
});

console.log()
