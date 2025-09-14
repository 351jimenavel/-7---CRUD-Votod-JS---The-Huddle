const express = require('express');
const router = express.Router();
const temasModel = require('../models/temasModel');

// Ruta GET /temas que renderiza la lista de temas (título + votos).
// todos ya hacen referencia a /temas ya que en app.js esta app.use('/temas', temasRoutes)
router.get('/', (req, res) => {
    console.log('Esta es la página de inicio del router');
    // Pide al modelo los temas ordenados.
    const lista = temasModel.listarTemasOrdenados();
    // Renderiza temas/lista con esos datos.
    res.render('temas/lista', {temas: lista, error: null});
});

// Ruta GET /temas/nuevo con formulario para crear un tema.
router.get('/nuevo', (req, res) => {
    //Renderiza temas/form.
    res.render('temas/form', { error: null, valoresPrevios: {} });
    console.log('Esta es la página del form vacio');
    
})

// Ruta POST /temas que crea el tema (votos=0) y redirige a /temas.
router.post('/', (req, res) => {
    const { titulo } = req.body;     // datos del formulario
    // Llama a crearTema
    const resultado = temasModel.crearTema(titulo);

    if (resultado.ok){
        res.redirect('/temas') // Redirige a la lista si todo bien
    } else{
        // Si hay error, ese nvia la informacion de vuelta al frontend
        //res.render('temas/form', { error: resultado.error, valoresPrevios: { titulo: datos.titulo }});
        return res.status(400).render('temas/form', { error: resultado.error, valoresPrevios: { titulo } });
    }
})

router.post('/:id/votar', (req, res) => {
    const id = Number(req.params.id);
    const resultado = temasModel.votarTema(id);
    if (resultado.ok){
        //return res.redirect('/temas')
        return res.json({ ok: true, votos: resultado.votos });   // el modelo debe devolver el total actualizado en resultado.votos
    }
      // En error volvés a la lista con un mensaje simple
    //const lista = temasModel.listarTemasOrdenados();
    return res.status(404).json({ ok: false, error: resultado.error || 'Tema no encontrado' });
})

module.exports = router;

// Orden por votos definido en el Modelo (no en la vista).